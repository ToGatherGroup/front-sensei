"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form"; // Importar Controller do react-hook-form
import { IMaskInput } from "react-imask"; // Importar IMaskInput do react-imask
import FormTitle from "@/components/title/formTitle";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useApiProvider } from "@/contexts";

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

const Relatorio = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const nome = searchParams.get("nome");
  const id = searchParams.get("id");

  const { register, handleSubmit, setValue, control } =
    useForm<IExerciciosData>();
  const [exercicios, setExercicios] = useState<IExerciciosData | null>(null);

  const { get } = useApiProvider();

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

  const onSubmit = (data: IExerciciosData) => {
    console.log("Dados do Formulário:", data);
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
                className="bg-gray-200 w-24 px-4 rounded"
                {...register("rmTerra")}
              />
            </div>
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
                {...register("impulsaoVertical")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                    mask="00:00"
                    placeholder="MM:SS"
                    className="bg-gray-200 w-24 px-4 py-2 rounded"
                  />
                )}
              />
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
                    mask="00:00"
                    placeholder="MM:SS"
                    className="bg-gray-200 w-24 px-4 py-2 rounded"
                  />
                )}
              />
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
                {...register("abdominais")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("testeDeLunge")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("flexoes")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("burpees")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("cooper")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("peso")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
                {...register("altura")}
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
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
