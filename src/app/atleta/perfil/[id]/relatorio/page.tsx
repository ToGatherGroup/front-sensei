"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { IMask, IMaskInput } from "react-imask";
import FormTitle from "@/components/title/formTitle";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useApiProvider } from "@/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Interface para os dados específicos dos exercícios
interface IExerciciosData {
  peso: number;
  altura: number;
  prancha: string;
  flexoes: number;
  abdominais: number;
  burpees: number;
  cooper: number;
  rmTerra: number;
  forcaIsometricaMaos: string;
  testeDeLunge: number;
  impulsaoVertical: number;
}

const IExerciciosDataSchema = yup.object().shape({
  peso: yup
    .number()
    .typeError("Insira o peso em quilogramas.")
    .positive("O peso deve ser um número positivo.")
    .min(10, "O peso mínimo é 10.")
    .required("Este campo é obrigatório."),
  altura: yup
    .number()
    .typeError("Insira a altura em centímetros.")
    .integer("A altura deve ser um número inteiro.")
    .positive("A altura deve ser um número positivo.")
    .min(110, "A altura mínima é 110 cm.")
    .required("Este campo é obrigatório."),
  prancha: yup
    .string()

    .required("A prancha é obrigatória."),
  flexoes: yup
    .number()
    .required("O número de flexões é obrigatório.")
    .positive("As flexões devem ser um número positivo.")
    .max(999, "Maximo 3 digitos."),
  abdominais: yup
    .number()
    .required("O número de abdominais é obrigatório.")
    .positive("Os abdominais deve ser um número positivo.")
    .max(999, "Maximo 3 digitos."),
  burpees: yup
    .number()
    .required("O número de burpees é obrigatório.")
    .positive("O burpees deve ser um número positivo.")
    .max(999, "Maximo 3 digitos."),
  cooper: yup
    .number()
    .required("A distância de cooper é obrigatória.")
    .positive("O cooper deve ser um número positivo.")
    .max(9999, "Maximo 4 digitos."),
  rmTerra: yup
    .number()
    .required("O RM no terra é obrigatório.")
    .positive("O RM Terra ser um número positivo."),
  forcaIsometricaMaos: yup.string().required("A prancha é obrigatória."),
  testeDeLunge: yup
    .number()
    .required("O teste de lunge é obrigatório.")
    .positive("O teste de lunge deve ser positivo.")
    .max(12, "Maximo 12 movimentos."),
  impulsaoVertical: yup
    .number()
    .required("A impulsão vertical é obrigatória.")
    .positive("A impulsão Vertical deve ser um número positivo."),
});

const Relatorio = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const nome = searchParams.get("nome");
  const id = searchParams.get("id");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IExerciciosData>({
    resolver: yupResolver(IExerciciosDataSchema),
  });
  const [exercicios, setExercicios] = useState<IExerciciosData | null>(null);

  const { get, put } = useApiProvider();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const parseDuration = (duration: string) => {
    const matches = duration.match(/PT(\d+)M(\d+)S/);
    if (matches) {
      const minutes = parseInt(matches[1], 10);
      const seconds = parseInt(matches[2], 10);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return duration;
  };

  const convertToPTFormat = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return `PT${minutes}M${seconds}S`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`avaliacao/${id}/${data}`);
        if (response && response.data && response.data.exercicios) {
          const exerciciosData = response.data.exercicios;
          exerciciosData.prancha = parseDuration(exerciciosData.prancha);
          exerciciosData.forcaIsometricaMaos = parseDuration(
            exerciciosData.forcaIsometricaMaos
          );
          console.log(exerciciosData);
          setExercicios(exerciciosData);
          setValue("peso", exerciciosData.peso);
          setValue("altura", exerciciosData.altura);
          setValue("prancha", exerciciosData.prancha);
          setValue("flexoes", exerciciosData.flexoes);
          setValue("abdominais", exerciciosData.abdominais);
          setValue("burpees", exerciciosData.burpees);
          setValue("cooper", exerciciosData.cooper);
          setValue("rmTerra", exerciciosData.rmTerra);
          setValue("forcaIsometricaMaos", exerciciosData.forcaIsometricaMaos);
          setValue("testeDeLunge", exerciciosData.testeDeLunge);
          setValue("impulsaoVertical", exerciciosData.impulsaoVertical);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: IExerciciosData) => {
    try {
      const formattedData = {
        ...data,
        prancha: convertToPTFormat(data.prancha),
        forcaIsometricaMaos: convertToPTFormat(data.forcaIsometricaMaos),
      };
      console.log("Dados do Formulário:", formattedData);
    } catch (err) {
      console.error("Erro ao submeter formulário:", err);
    }
  };

  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <div className="flex-col">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle title="Relatório do Atleta" iconSrc="/icons/report.png" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="data"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data
          </label>
          <h3>{data && formatDate(data)}</h3>
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="nome"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Atleta
          </label>
          <h3>{nome}</h3>
        </div>

        <div className="flex items-center justify-center gap-2">
          <form className="exercise-details" onSubmit={handleSubmit(onSubmit)}>
            {/* levantamento Terra */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="rmTerra"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                RM Levantamento Terra:
              </label>
              <input
                type="number"
                placeholder="kg"
                className="bg-gray-200 w-24 px-4 rounded"
                {...register("rmTerra")}
              />
              {errors.rmTerra && (
                <span className="text-red-500 ml-2">
                  {errors.rmTerra.message}
                </span>
              )}
            </div>
            {errors.rmTerra && (
              <span className="text-red-500 ml-2">
                {errors.rmTerra.message}
              </span>
            )}
            {/* Impulsão Vertical */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="impulsaoVertical"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Impulsão Vertical:
              </label>
              <input
                type="number"
                placeholder="cm"
                {...register("impulsaoVertical")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.impulsaoVertical && (
              <span className="text-red-500 ml-2">
                {errors.impulsaoVertical.message}
              </span>
            )}
            {/* Prancha */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="prancha"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Prancha:
              </label>
              <Controller
                name="prancha"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask={["\\00{:}00", "00{:}00"]}
                    placeholder="MM:SS"
                    blocks={{
                      MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                      SS: { mask: IMask.MaskedRange, from: 0, to: 59 },
                    }}
                    className="bg-gray-200 w-24 px-4 py-2 rounded"
                  />
                )}
              />
              {errors.prancha && (
                <span className="text-red-500 ml-2">
                  {errors.prancha.message}
                </span>
              )}
            </div>
            {/* Força de Preensão */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="forcaIsometricaMaos"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Força de Preensão:
              </label>
              <Controller
                name="forcaIsometricaMaos"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask={["\\00{:}00", "00{:}00"]}
                    placeholder="MM:SS"
                    blocks={{
                      MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                      SS: { mask: IMask.MaskedRange, from: 0, to: 59 },
                    }}
                    className="bg-gray-200 w-24 px-4 py-2 rounded"
                  />
                )}
              />
              {errors.forcaIsometricaMaos && (
                <span className="text-red-500 ml-2">
                  {errors.forcaIsometricaMaos.message}
                </span>
              )}
            </div>
            {/* Abdominais */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="abdominais"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Abdominais:
              </label>
              <input
                type="number"
                placeholder="repetições"
                {...register("abdominais")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.abdominais && (
              <span className="text-red-500 ml-2">
                {errors.abdominais.message}
              </span>
            )}
            {/* Teste de Lunge */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="testeDeLunge"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Teste de Lunge:
              </label>
              <input
                type="number"
                placeholder="cm"
                {...register("testeDeLunge")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.testeDeLunge && (
              <span className="text-red-500 ml-2">
                {errors.testeDeLunge.message}
              </span>
            )}
            {/* Flexões */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="flexoes"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Flexões:
              </label>
              <input
                type="number"
                placeholder="repetições"
                {...register("flexoes")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.flexoes && (
              <span className="text-red-500 ml-2">
                {errors.flexoes.message}
              </span>
            )}
            {/* Burpees */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="burpees"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Burpees:
              </label>
              <input
                type="number"
                placeholder="repetições"
                {...register("burpees")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.burpees && (
              <span className="text-red-500 ml-2">
                {errors.burpees.message}
              </span>
            )}
            {/* Teste de Cooper */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="cooper"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Teste de Cooper:
              </label>
              <input
                type="number"
                placeholder="metros"
                {...register("cooper")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.cooper && (
              <span className="text-red-500 ml-2">{errors.cooper.message}</span>
            )}
            {/* Peso */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="peso"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Peso:
              </label>
              <input
                type="number"
                placeholder="kg"
                {...register("peso")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.peso && (
              <span className="text-red-500 ml-2">{errors.peso.message}</span>
            )}
            {/* Altura */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="altura"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Altura:
              </label>
              <input
                type="number"
                placeholder="cm"
                {...register("altura")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            {errors.altura && (
              <span className="text-red-500 ml-2">{errors.altura.message}</span>
            )}
            <div className="flex justify-between items-center pb-10 ">
              <Link href="/relatorioAvaliacao">
                <Button text={"Voltar"} type={"button"} />
              </Link>

              <Button text={"Salvar"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Relatorio;
