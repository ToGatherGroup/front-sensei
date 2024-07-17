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
    .typeError("Valor obrigatório.")
    .positive("O peso deve ser um número positivo.")
    .min(1, "O peso mínimo é 1 kg.")
    .required("Este campo é obrigatório."),
  altura: yup
    .number()
    .typeError("Valor obrigatório.")
    .integer("A altura deve ser um número inteiro.")
    .positive("A altura deve ser um número positivo.")
    .min(1, "A altura mínima é 1 cm.")
    .required("Este campo é obrigatório."),
  prancha: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      return val;
    })
    .test("time_check", function (timeInput: any) {
      if (timeInput === null) return true;

      let error = false;
      const [minStr, segStr] = timeInput.split(":");

      try {
        const min = Number(minStr);
        const seg = Number(segStr);

        if (isNaN(min) || isNaN(seg)) error = true;
        if (min < 0 || min > 15) error = true;
        if (seg < 0 || seg >= 60) error = true;
      } catch (e) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (error) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .nullable()

    .required("Valor obrigatório."),
  flexoes: yup
    .number()
    .typeError("Valor obrigatório.")
    .positive("As flexões devem ser um número positivo.")
    .integer("As flexões devem ser um número inteiro.")
    .max(999, "Máximo 3 dígitos.")
    .required("O número de flexões é obrigatório."),
  abdominais: yup
    .number()
    .required("O número de abdominais é obrigatório.")
    .typeError("Valor obrigatório.")
    .positive("Os abdominais deve ser um número positivo.")
    .max(999, "Maximo 3 digitos."),
  burpees: yup
    .number()
    .required("O número de burpees é obrigatório.")
    .positive("Os burpees devem ser um número positivo.")
    .typeError("Valor obrigatório.")
    .max(999, "Maximo 3 digitos."),
  cooper: yup
    .number()
    .required("")
    .min(0, "Não são permitidos valores negativos.")
    .typeError("Valor obrigatório.")
    .max(9999, "Maximo 4 digitos."),
  rmTerra: yup
    .number()
    .typeError("Valor obrigatório.")
    .required("O RM no terra é obrigatório.")
    .min(0, "Não são permitidos valores negativos."),
  forcaIsometricaMaos: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      return val;
    })
    .test("time_check", function (timeInput: any) {
      if (timeInput === null) return true;

      let error = false;
      const [minStr, segStr] = timeInput.split(":");

      try {
        const min = Number(minStr);
        const seg = Number(segStr);

        if (isNaN(min) || isNaN(seg)) error = true;
        if (min < 0 || min > 15) error = true;
        if (seg < 0 || seg >= 60) error = true;
      } catch (e) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (error) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .nullable()
    .required("Valor obrigatório."),
  testeDeLunge: yup
    .number()
    .required("O teste de lunge é obrigatório.")
    .typeError("Valor obrigatório.")
    .min(0, "Não são permitidos valores negativos.")
    .max(12, "Maximo 12 movimentos."),
  impulsaoVertical: yup
    .number()
    .typeError("Valor obrigatório.")
    .required("A impulsão vertical é obrigatória.")
    .min(0, "Não são permitidos valores negativos."),
});

const Relatorio = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("data");
  const nome = searchParams.get("nome");
  const id = searchParams.get("id");

  const avaliationUpdate = (data: any): any => {
    return {
      impulsaoVertical: data.impulsaoVertical,
      rmTerra: data.rmTerra,
      prancha: data.prancha,
      forcaIsometricaMaos: data.forcaIsometricaMaos,
      abdominais: data.abdominais,
      testeDeLunge: data.testeDeLunge,
      flexoes: data.flexoes,
      burpees: data.burpees,
      cooper: data.cooper,
      altura: data.altura,
      peso: data.peso,
      avaliacaoModelId: {
        atletaModel: {
          id: id,
        },
        data: date,
      },
    };
  };

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
        const response = await get(`avaliacao/${id}/${date}`);
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
      console.log("Envio deDados do Formulário:", formattedData);
      console.log(id);
      console.log(date);
      console.log(
        "Envio deDados do Formatado para Api:",
        avaliationUpdate(formattedData)
      );
    } catch (err) {
      console.error("Erro ao submeter formulário:", err);
    }
  };

  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <div className="flex-col">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle title="Editar Avaliação" iconSrc="/icons/report.png" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="data"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data
          </label>
          <h3>{date && formatDate(date)}</h3>
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
                className="inline-block w-48 text-left text-base font-semibold"
              >
                RM Levantamento Terra:
              </label>
              <input
                type="text"
                placeholder="kg"
                className=" w-32 px-4 rounded"
                {...register("rmTerra")}
              />
            </div>
            {errors.rmTerra && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.rmTerra.message}
              </span>
            )}
            {/* Impulsão Vertical */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="impulsaoVertical"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Impulsão Vertical:
              </label>
              <input
                type="text"
                placeholder="cm"
                {...register("impulsaoVertical")}
                className="bg-gray-200 w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.impulsaoVertical && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.impulsaoVertical.message}
              </span>
            )}

            {/* Prancha */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="prancha"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Prancha:
              </label>
              <Controller
                name="prancha"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    type="text"
                    {...field}
                    mask={["\\00{:}00", "00{:}00"]}
                    placeholder="Min  :  Seg"
                    className=" w-32 px-4 py-2 rounded"
                    pattern="\d*"
                    inputMode="numeric"
                  />
                )}
              />
            </div>
            {errors.prancha && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.prancha.message}
              </span>
            )}
            {/* Força de Preensão */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="forcaIsometricaMaos"
                className="inline-block w-48 text-left text-base font-semibold"
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
                    placeholder="Min  :  Seg"
                    blocks={{
                      MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                      SS: { mask: IMask.MaskedRange, from: 0, to: 59 },
                    }}
                    className=" w-32 px-4 py-2 rounded"
                  />
                )}
              />
            </div>
            {errors.forcaIsometricaMaos && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.forcaIsometricaMaos.message}
              </span>
            )}
            {/* Abdominais */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="abdominais"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Abdominais:
              </label>
              <input
                type="text"
                placeholder="repetições"
                {...register("abdominais")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.abdominais && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.abdominais.message}
              </span>
            )}
            {/* Teste de Lunge */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="testeDeLunge"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Teste de Lunge:
              </label>
              <input
                type="text"
                placeholder="cm"
                {...register("testeDeLunge")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.testeDeLunge && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.testeDeLunge.message}
              </span>
            )}
            {/* Flexões */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="flexoes"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Flexões:
              </label>
              <input
                type="text"
                placeholder="repetições"
                {...register("flexoes")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.flexoes && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.flexoes.message}
              </span>
            )}
            {/* Burpees */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="burpees"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Burpees:
              </label>
              <input
                type="text"
                placeholder="repetições"
                {...register("burpees")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.burpees && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.burpees.message}
              </span>
            )}
            {/* Teste de Cooper */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="cooper"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Teste de Cooper:
              </label>
              <input
                type="text"
                placeholder="metros"
                {...register("cooper")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.cooper && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.cooper.message}
              </span>
            )}
            {/* Peso */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="peso"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Peso:
              </label>
              <input
                type="text"
                placeholder="kg"
                {...register("peso")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.peso && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.peso.message}
              </span>
            )}
            {/* Altura */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="altura"
                className="inline-block w-48 text-left text-base font-semibold"
              >
                Altura:
              </label>
              <input
                type="text"
                placeholder="cm"
                {...register("altura")}
                className=" w-32 px-4 py-2 rounded"
              />
            </div>
            {errors.altura && (
              <span className="text-red-500 flex items-center pb-2 justify-left">
                {errors.altura.message}
              </span>
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
