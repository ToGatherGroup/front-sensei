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
  testeDeLungeDireito: number;
  testeDeLungeEsquerdo: number;
  impulsaoVertical: number;
}

const IExerciciosDataSchema = yup.object().shape({
  peso: yup
    .number()
    .positive()
    .min(1)
    .typeError("Valor obrigatório.")
    .required(),
  altura: yup
    .number()
    .integer()
    .positive()
    .min(1)
    .typeError("Valor obrigatório.")
    .required(),
  prancha: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      if (val.includes(":")) {
        const [min, sec] = val.split(":");
        return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
      }
      return val;
    })
    .test("time_check", "Tempo inserido é inválido.", function (timeInput) {
      if (!timeInput) {
        return this.createError({
          message: "Valor obrigatório.",
          path: this.path,
        });
      }

      const [minStr, secStr] = timeInput.split(":");

      if (minStr === undefined || secStr === undefined) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (minStr.length !== 2 || secStr.length !== 2) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      const min = Number(minStr);
      const sec = Number(secStr);

      // Check for NaN
      if (isNaN(min) || isNaN(sec)) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (min < 0 || min >= 60 || sec < 0 || sec >= 60) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .required("Valor obrigatório."),
  flexoes: yup
    .number()
    .positive()
    .integer()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  abdominais: yup
    .number()
    .positive()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  burpees: yup
    .number()
    .positive()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  cooper: yup
    .number()
    .positive()
    .max(9999)
    .typeError("Valor obrigatório.")
    .required(),
  rmTerra: yup.number().min(0).typeError("Valor obrigatório.").required(),
  forcaIsometricaMaos: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      if (val.includes(":")) {
        const [min, sec] = val.split(":");
        return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
      }
      return val;
    })
    .test("time_check", "Tempo inserido é inválido.", function (timeInput) {
      if (!timeInput) {
        return this.createError({
          message: "Valor obrigatório.",
          path: this.path,
        });
      }

      const [minStr, secStr] = timeInput.split(":");

      if (minStr === undefined || secStr === undefined) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (minStr.length !== 2 || secStr.length !== 2) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      const min = Number(minStr);
      const sec = Number(secStr);

      if (isNaN(min) || isNaN(sec)) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (min < 0 || min >= 60 || sec < 0 || sec >= 60) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .required("Valor obrigatório."),
  testeDeLungeDireito: yup
    .number()
    .min(0)
    .max(12, "12 valor máximo")
    .typeError("Valor obrigatório.")
    .required(),
  testeDeLungeEsquerdo: yup
    .number()
    .min(0)
    .max(12, "12 valor máximo")
    .typeError("Valor obrigatório.")
    .required(),
  impulsaoVertical: yup
    .number()
    .min(0, "Não são permitidos valores negativos.")
    .typeError("Valor obrigatório.")
    .required(),
});

const Relatorio = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("data") || "";
  console.log(date);
  const nome = searchParams.get("nome");
  const id = searchParams.get("id");

  const assessmentUpdate = (data: IExerciciosData): any => {
    return {
      impulsaoVertical: data.impulsaoVertical,
      rmTerra: data.rmTerra,
      prancha: data.prancha,
      forcaIsometricaMaos: data.forcaIsometricaMaos,
      abdominais: data.abdominais,
      testeDeLungeJoelhoDireito: data.testeDeLungeDireito,
      testeDeLungeJoelhoEsquerdo: data.testeDeLungeEsquerdo,
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
    mode: "onBlur",
  });
  const [exercicios, setExercicios] = useState<IExerciciosData | null>(null);

  const { get, put } = useApiProvider();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const parseDuration = (duration: string) => {
    const matches = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    if (matches) {
      const minutes = matches[1] ? parseInt(matches[1], 10) : 0;
      const seconds = matches[2] ? parseInt(matches[2], 10) : 0;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return duration;
  };

  const convertToPTFormat = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return `PT${minutes}M${seconds}S`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
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
          setValue("testeDeLungeEsquerdo", exerciciosData.testeDeLungeEsquerdo);
          setValue("testeDeLungeDireito", exerciciosData.testeDeLungeDireito);
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

      const response = await put("avaliacao", assessmentUpdate(formattedData));
      if (response?.status !== 202) {
        throw new Error("Erro ao atualizar avaliação");
      }
      // console.log("Envio deDados do Formulário:", formattedData);
      // console.log(id);
      // console.log(date);
      console.log(
        "Envio deDados do Formatado para Api:",
        assessmentUpdate(formattedData)
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
            Atleta
          </label>
          <h3>{nome}</h3>
        </div>

        <div className="flex items-center justify-center gap-2">
          <form className="exercise-details" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center gap-2 pb-5">
              <label
                htmlFor="nome"
                className="inline-block w-14 text-center text-base font-semibold"
              >
                Data
              </label>
              <input type="date" id="data" value={date} readOnly />
            </div>
            {/* Teste de Lunge */}
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-8 justify-center">
                <span className="text-right w-16 font-semibold text-xs pt-1 pl-5">
                  esquerdo
                </span>
                <span className="text-left w-16 font-semibold text-xs pt-1 pl-1">
                  direito
                </span>
              </div>
              <div className="flex items-center ">
                <label
                  htmlFor=""
                  className="inline-block w-42 text-left text-base font-semibold pr-1"
                >
                  Teste de Lunge (Joelho):
                </label>
                {/* Teste de Lunge Esquerdo */}
                <div className="flex w-36 gap-2">
                  <input
                    type="text"
                    placeholder="cm"
                    {...register("testeDeLungeEsquerdo")}
                    className="flex  w-14 rounded text-center "
                    maxLength={2}
                    onKeyDown={handleKeyDown}
                  />

                  {/* Teste de Lunge Direito*/}
                  <input
                    type="text"
                    placeholder="cm"
                    {...register("testeDeLungeDireito")}
                    className="w-14 rounded text-center "
                    maxLength={2}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className="flex py-1">
              {errors.testeDeLungeEsquerdo && (
                <span className="text-red-500 ml-2 flex items-center justify-left">
                  {errors.testeDeLungeEsquerdo.message}
                </span>
              )}
              {errors.testeDeLungeDireito && (
                <span className="text-red-500 ml-2 flex items-center justify-left">
                  {errors.testeDeLungeDireito.message}
                </span>
              )}
            </div>
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
                {...register("rmTerra")}
                className=" w-32 px-4 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
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
                className="w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
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
                control={control}
                name="prancha"
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="00:00"
                    definitions={{
                      "#": /[0-9]/,
                    }}
                    onKeyDown={handleKeyDown}
                    unmask={true}
                    blocks={{
                      MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                      SS: { mask: IMask.MaskedRange, from: 0, to: 59 },
                    }}
                    placeholder="Min  :  Seg"
                    className=" w-32 px-4 py-2 rounded text-center"
                    minLength={4}
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
                    mask="00:00"
                    definitions={{
                      "#": /[0-9]/,
                    }}
                    onKeyDown={handleKeyDown}
                    unmask={true}
                    blocks={{
                      MM: { mask: IMask.MaskedRange, from: 0, to: 59 },
                      SS: { mask: IMask.MaskedRange, from: 0, to: 59 },
                    }}
                    placeholder="Min  :  Seg"
                    className=" w-32 px-4 py-2 rounded text-center"
                    minLength={4}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
              />
            </div>
            {errors.abdominais && (
              <span className="text-red-500 ml-2 flex items-center justify-left">
                {errors.abdominais.message}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={4}
                onKeyDown={handleKeyDown}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
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
                className=" w-32 px-4 py-2 rounded text-center"
                maxLength={3}
                onKeyDown={handleKeyDown}
              />
            </div>
            {errors.altura && (
              <span className="text-red-500 flex items-center pb-2 justify-left">
                {errors.altura.message}
              </span>
            )}
            {/* Botões */}
            <div className="flex justify-between items-center pb-10 mb-5 pt-7 ">
              <div>
                <Link href="/relatorioAvaliacao">
                  <Button text={"Voltar"} type={"button"} />
                </Link>
              </div>
              <div className="mr-4">
                <Button text={"Salvar"} type={"submit"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Relatorio;
