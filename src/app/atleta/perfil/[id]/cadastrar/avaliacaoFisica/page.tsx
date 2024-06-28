"use client";
import FormTitle from "@/components/title/formTitle/index";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button";
import TimeInput from "@/components/timeInput";
import { useState } from "react";
import { useApiProvider } from "@/contexts";

type FormData = {
  date: string;
  rmEarth: number;
  verticalThrust: number;
  board: string;
  forceIsometricHands: string;
  abs: number;
  lungeTest: number;
  pushUps: number;
  burpees: number;
  cooper: number;
  height: number;
  weight: number;
  atletaModel: number | string;
};

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

interface IApiPostData {
  data: string;
  impulsaoVertical: number;
  rmTerra: number;
  prancha: string;
  forcaIsometricaMaos: string;
  abdominais: number;
  testeDeLunge: number;
  flexoes: number;
  burpees: number;
  cooper: number;
  altura: number;
  peso: number;
  avaliacaoModelId: {
    atletaModel: {
      id: number | string;
    };
    data: string;
  };
}

const avaliationToApiPost = (data: FormData): IApiPostData => {
  return {
    data: data.date,
    impulsaoVertical: data.verticalThrust,
    rmTerra: data.rmEarth,
    prancha: data.board,
    forcaIsometricaMaos: data.forceIsometricHands,
    abdominais: data.abs,
    testeDeLunge: data.lungeTest,
    flexoes: data.pushUps,
    burpees: data.burpees,
    cooper: data.cooper,
    altura: data.height,
    peso: data.weight,
    avaliacaoModelId: {
      atletaModel: {
        id: data.atletaModel,
      },
      data: data.date,
    },
  };
};

const PhysicalEvaluation = ({ params: { id } }: Props) => {
  const [boardMinutes, setBoardMinutes] = useState<number | string>("");
  const [boardSeconds, setBoardSeconds] = useState<number | string>("");
  const [forceIsometricHandsMinutes, setForceIsometricHandsMinutes] = useState<
    number | string
  >("");
  const [forceIsometricHandsSeconds, setForceIsometricHandsSeconds] = useState<
    number | string
  >("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { post } = useApiProvider();
  //const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted with data:", data); // Verificação
    try {
      const boardValue = `PT${boardMinutes}M${boardSeconds}S`;
      const forcaIsometricaMaosValue = `PT${forceIsometricHandsMinutes}M${forceIsometricHandsSeconds}S`;
      data.board = boardValue;
      data.forceIsometricHands = forcaIsometricaMaosValue;
      data.atletaModel = id;

      const response = await post("avaliacao", avaliationToApiPost(data));
      if (response?.status !== 201) {
        throw new Error("Erro ao cadastrar avaliação");
      }
      //setMessage("Avaliação cadastrada com sucesso!");
      console.log("Avaliação Cadastrada com sucesso");
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar avaliação:", error);
      //setMessage("Erro ao cadastrar avaliação. Por favor, tente novamente.");
    }
  };

  const handleTimeChangeBoard = (minutes: number, seconds: number) => {
    setBoardMinutes(minutes.toString());
    setBoardSeconds(seconds.toString());
  };

  const handleTimeChangeForceIsometricHands = (
    minutes: number,
    seconds: number
  ) => {
    setForceIsometricHandsMinutes(minutes.toString());
    setForceIsometricHandsSeconds(seconds.toString());
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="form-container">
          <div className="flex justify-center items-center mb-6">
            <FormTitle
              title="Cadastrar Avaliação"
              iconSrc="/icons/assessment.png"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Data */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="date"
                className="inline-block w-28 text-center text-base font-semibold ps-10"
              >
                Data
              </label>
              <input
                {...register("date", {
                  required: "Este campo é obrigatório",
                  validate: {
                    notInFuture: (value) => {
                      const today = new Date().toISOString().split("T")[0];
                      return value <= today || "A data não pode ser futura";
                    },
                  },
                })}
                type="date"
                className="bg-gray-200 w-42 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.date && (
                <p className="text-center text-red-500 ">
                  {errors.date.message}
                </p>
              )}
            </div>
            {/* RM Levantamento Terra */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="rmEarth"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                RM Levantamento Terra
              </label>
              <input
                {...register("rmEarth", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.rmEarth && (
                <p className="text-center text-red-500 ">
                  {errors.rmEarth.message}
                </p>
              )}
            </div>
            {/* Impulsão Vertical */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="verticalThrust"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Impulsão Vertical
              </label>
              <input
                {...register("verticalThrust", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.verticalThrust && (
                <p className="text-center text-red-500 ">
                  {errors.verticalThrust.message}
                </p>
              )}
            </div>
            {/* Prancha */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="board"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Prancha
              </label>
              <TimeInput onTimeChange={handleTimeChangeBoard} />
              {errors.board && (
                <p className="text-center text-red-500">
                  {errors.board.message}
                </p>
              )}
            </div>
            {/* Força de Preensão */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="forceIsometricHands"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Força de Preensão
              </label>
              <TimeInput onTimeChange={handleTimeChangeForceIsometricHands} />
              {errors.forceIsometricHands && (
                <p className="text-center text-red-500">
                  {errors.forceIsometricHands.message}
                </p>
              )}
            </div>
            {/* Abdominais */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="abs"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Abdominais
              </label>
              <input
                {...register("abs", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.abs && (
                <p className="text-center text-red-500 ">
                  {errors.abs.message}
                </p>
              )}
            </div>
            {/* Teste de Lunge */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="lungeTest"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Teste de Lunge
              </label>
              <input
                {...register("lungeTest", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.lungeTest && (
                <p className="text-center text-red-500 ">
                  {errors.lungeTest.message}
                </p>
              )}
            </div>
            {/* Flexões */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="pushUps"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Flexões
              </label>
              <input
                {...register("pushUps", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.pushUps && (
                <p className="text-center text-red-500 ">
                  {errors.pushUps.message}
                </p>
              )}
            </div>
            {/* Burpees */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="burpees"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Burpees
              </label>
              <input
                {...register("burpees", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.burpees && (
                <p className="text-center text-red-500">
                  {errors.burpees.message}
                </p>
              )}
            </div>
            {/* Teste de Cooper */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="cooper"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Teste de Cooper
              </label>
              <input
                {...register("cooper", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.cooper && (
                <p className="text-center text-red-500">
                  {errors.cooper.message}
                </p>
              )}
            </div>
            {/* Altura */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="height"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Altura
              </label>
              <input
                {...register("height", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.height && (
                <p className="text-center text-red-500">
                  {errors.height.message}
                </p>
              )}
            </div>
            {/* Peso */}
            <div className="flex mx-auto my-6 box-border items-center">
              <label
                htmlFor="weight"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Peso
              </label>
              <input
                {...register("weight", {
                  required: "Este campo é obrigatório",
                })}
                type="number"
                className="bg-gray-200 w-24 px-4 py-2 rounded"
              />
            </div>
            <div>
              {errors.weight && (
                <p className="text-center text-red-500 py-2 ">
                  {errors.weight.message}
                </p>
              )}
            </div>
            <Button type="submit" label="Cadastrar" />
          </form>
          {/* {message && <p className="text-center mt-4">{message}</p>} */}
        </div>
      </div>
    </>
  );
};

export default PhysicalEvaluation;
