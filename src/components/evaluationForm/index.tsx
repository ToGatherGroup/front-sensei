"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IMaskInput } from "react-imask";
import Button from "@/components/ui/button";
import { useApiProvider } from "@/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.css";
import { IEvaluationData, Time } from "@/types/Evaluation";
import { IEvaluationDataSchema } from "@/schemas/evaluationSchema";
import Link from "next/link";

type Props = {
  method: "POST" | "PUT";
  id: number | string;
};

const EvaluationForm = ({ id, method }: Props) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("data") || "";

  //exportar futuramente depois de pronto
  const evaluationUpdate = (data: any): any => {
    return {
      impulsaoVertical: data.impulsaoVertical,
      rmTerra: data.rmTerra,
      prancha: data.prancha,
      forcaIsometricaMaos: data.forcaIsometricaMaos,
      abdominais: data.abdominais,
      testeDeLungeJoelhoDireito: data.testeDeLungeJoelhoDireito,
      testeDeLungeJoelhoEsquerdo: data.testeDeLungeJoelhoEsquerdo,
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
  //exportar futuramente depois de pronto
  const evaluationToApiPost = (data: any): any => {
    return {
      data: data.data,
      impulsaoVertical: data.impulsaoVertical,
      rmTerra: data.rmTerra,
      prancha: data.prancha,
      forcaIsometricaMaos: data.forcaIsometricaMaos,
      abdominais: data.abdominais,
      testeDeLungeJoelhoDireito: data.testeDeLungeJoelhoDireito,
      testeDeLungeJoelhoEsquerdo: data.testeDeLungeJoelhoEsquerdo,
      flexoes: data.flexoes,
      burpees: data.burpees,
      cooper: data.cooper,
      altura: data.altura,
      peso: data.peso,
      avaliacaoModelId: {
        atletaModel: {
          id: id,
        },
        data: data.data,
      },
    };
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IEvaluationData>({
    resolver: yupResolver(IEvaluationDataSchema),
    context: { method },
    mode: "onBlur",
  });
  const [exercicios, setExercicios] = useState<IEvaluationData | null>(null);
  const { get, put, post } = useApiProvider();

  // conversão PT -> recebendo da api
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
  //conversão PT -> enviando back
  function minSecToPT(time: string | null): Time | null {
    if (!time) return null;
    const [minutes, seconds] = time.split(":").map(Number);
    // const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `PT${minutes}M${formattedSeconds}S` as Time;
  }
  // padrão -> bloquear caracteres Desktop
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
  // padrão -> bloquear caracteres Mobile
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
  };
  // valores até 12 desktop
  const handleKeyDownLounge = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value;

    // Permitir teclas de controle
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    } else {
      const newValue = value + e.key;
      const parsedValue = parseInt(newValue);

      // Verificar se o valor resultante está dentro do intervalo permitido
      if (
        parsedValue > 12 ||
        (value === "1" &&
          e.key !== "Backspace" &&
          e.key !== "ArrowLeft" &&
          e.key !== "ArrowRight" &&
          e.key !== "Delete" &&
          e.key !== "Tab" &&
          newValue.length > 2)
      ) {
        e.preventDefault();
      }
    }
  };
  // valores até 12 mobile
  const handleInputLounge = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    let value = input.value;

    // Remove caracteres não numéricos
    value = value.replace(/[^0-9]/g, "");

    // Limita o valor a 12
    if (value.length > 0 && parseInt(value) > 12) {
      value = value.slice(0, -1);
    }

    input.value = value;
  };
  //buscar dados para editar avaliação
  useEffect(() => {
    const fetchData = async () => {
      switch (method) {
        case "PUT":
          try {
            const response = await get(`avaliacao/${id}/${date}`);
            if (response && response.data && response.data.exercicios) {
              const exerciciosData = response.data.exercicios;
              const valuePrancha = (exerciciosData.prancha = parseDuration(
                exerciciosData.prancha
              ));
              const valueforcaIsometricaMaos =
                (exerciciosData.forcaIsometricaMaos = parseDuration(
                  exerciciosData.forcaIsometricaMaos
                ));
              console.log(exerciciosData);
              setExercicios(exerciciosData);
              setValue("peso", exerciciosData.peso);
              setValue("altura", exerciciosData.altura);
              setValue("prancha", valuePrancha);
              setValue("flexoes", exerciciosData.flexoes);
              setValue("abdominais", exerciciosData.abdominais);
              setValue("burpees", exerciciosData.burpees);
              setValue("cooper", exerciciosData.cooper);
              setValue("rmTerra", exerciciosData.rmTerra);
              setValue("forcaIsometricaMaos", valueforcaIsometricaMaos);
              setValue(
                "testeDeLungeJoelhoEsquerdo",
                exerciciosData.testeDeLungeJoelhoEsquerdo
              );
              setValue(
                "testeDeLungeJoelhoDireito",
                exerciciosData.testeDeLungeJoelhoDireito
              );
              setValue("impulsaoVertical", exerciciosData.impulsaoVertical);
            }
          } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
          }
          break;
      }
    };
    fetchData();
  }, []);

  // função para editar avaliação
  const updateData = async (data: IEvaluationData) => {
    try {
      const formattedData = {
        ...data,
        prancha: minSecToPT(data.prancha),
        forcaIsometricaMaos: minSecToPT(data.forcaIsometricaMaos),
      };

      const response = await put("avaliacao", evaluationUpdate(formattedData));
      if (response?.status !== 202) {
        throw new Error("Erro ao atualizar avaliação");
      }
      //console.log("Envio de Dados do Formulário:", formattedData);
      // console.log(id);
      // console.log(date);
      console.log(
        "Envio de Dados Formatado para API:",
        evaluationUpdate(formattedData)
      );
    } catch (err) {
      console.error("Erro ao submeter formulário:", err);
    }
  };

  //função para criar uma avaliação
  const postData = async (data: IEvaluationData) => {
    const formattedData = {
      ...data,
      prancha: minSecToPT(data.prancha),
      forcaIsometricaMaos: minSecToPT(data.forcaIsometricaMaos),
    };
    const response = await post(
      "avaliacao",
      evaluationToApiPost(formattedData)
    );
    if (response?.status !== 201) {
      throw new Error("Erro ao cadastrar avaliação");
    }
    //console.log(formattedData);
    console.log("Avaliação cadastrada com sucesso");
    reset();
    reset({
      prancha: "",
      forcaIsometricaMaos: "",
    });
    console.log(
      "Form POST submitted with data:",
      evaluationToApiPost(formattedData)
    );
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<IEvaluationData> = async (
    data: IEvaluationData
  ) => {
    switch (method) {
      case "PUT":
        // console.log("clicado Alterar");
        await updateData(data);
        router.push("/relatorioAvaliacao");

        break;
      case "POST":
        // console.log("clicado Cadastrar");
        await postData(data);
        break;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <form className="exercise-details" onSubmit={handleSubmit(onSubmit)}>
        {/* Data */}
        <div className="flex items-center justify-center gap-2 pb-5">
          <label
            htmlFor="nome"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data:
          </label>
          {method === "PUT" ? (
            <input
              type="date"
              id="data"
              className="w-32 flex rounded text-center"
              value={date}
              readOnly
            />
          ) : (
            <input
              type="date"
              id="data"
              className="w-36 flex rounded text-center"
              {...register("data")}
            />
          )}
        </div>
        {errors.data && (
          <span className="text-red-500 ml-2 flex items-center justify-left">
            {errors.data.message}
          </span>
        )}
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
              className="inline-block w-48 text-left text-base font-semibold pr-1"
            >
              Teste de Lunge (Joelho):
            </label>
            {/* Teste de Lunge Esquerdo */}
            <div className="flex w-36 gap-2">
              <input
                type="text"
                placeholder="cm"
                {...register("testeDeLungeJoelhoEsquerdo")}
                className="flex  w-14 rounded text-center "
                maxLength={2}
                onKeyDown={handleKeyDownLounge}
                onInput={handleInputLounge}
              />
              {/* Teste de Lunge Direito*/}
              <input
                type="text"
                placeholder="cm"
                {...register("testeDeLungeJoelhoDireito")}
                className="w-14 rounded text-center "
                maxLength={2}
                onKeyDown={handleKeyDownLounge}
                onInput={handleInputLounge}
              />
            </div>
          </div>
        </div>
        <div className="flex py-1">
          {errors.testeDeLungeJoelhoEsquerdo && (
            <span className="text-red-500 ml-2 flex items-center justify-left">
              {errors.testeDeLungeJoelhoEsquerdo.message}
            </span>
          )}
          {errors.testeDeLungeJoelhoDireito && (
            <span className="text-red-500 ml-2 flex items-center justify-left">
              {errors.testeDeLungeJoelhoDireito.message}
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            render={({ field: { ref, onChange, onBlur, value } }) => (
              <IMaskInput
                // {...field}
                inputRef={ref}
                value={value}
                onAccept={onChange}
                onBlur={onBlur}
                type="text" // iMask não suporta o tipo 'number'
                mask={["\\00{:}00", "00{:}00"]}
                placeholder="Min  :  Seg"
                pattern="\d*" // Habilita teclado numérico em dispositivos móveis
                inputMode="numeric" // Habilita teclado numérico em dispositivos móveis
                className="w-32 px-4 py-2 rounded text-center"
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
            render={({ field: { ref, onChange, onBlur, value } }) => (
              <IMaskInput
                // {...field}
                inputRef={ref}
                value={value}
                onAccept={onChange}
                onBlur={onBlur}
                type="text" // iMask não suporta o tipo 'number'
                mask={["\\00{:}00", "00{:}00"]}
                placeholder="Min  :  Seg"
                pattern="\d*" // Habilita teclado numérico em dispositivos móveis
                inputMode="numeric" // Habilita teclado numérico em dispositivos móveis
                className="w-32 px-4 py-2 rounded text-center"
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            onInput={handleInput}
          />
        </div>
        {errors.altura && (
          <span className="text-red-500 flex items-center pb-2 justify-left">
            {errors.altura.message}
          </span>
        )}
        {/* Botões */}
        <div className="flex justify-between items-center pb-10 mb-5 pt-7 ">
          <div className="mx-auto">
            {method === "PUT" ? (
              <Button type={"submit"} text={"Alterar"} />
            ) : (
              <Button type={"submit"} text={"Cadastrar"} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;
