"use client";
import Button from "@/components/ui/button";
import FormContainer from "@/components/ui/formContainer";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import {
  mobilidadeTornozeloSchema,
  mobilidadeTornozeloSchemaType,
} from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";

const MobilidadeTornozelo = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(mobilidadeTornozeloSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "testeDeLunge", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            esquerdo: assessment.exercicios.testeDeLungeEsquerdo ?? "",
            direito: assessment.exercicios.testeDeLungeDireito ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ testeDeLunge }: mobilidadeTornozeloSchemaType) {
    const result = testeDeLunge?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          testeDeLungeEsquerdo: atleta.esquerdo,
          testeDeLungeDireito: atleta.direito,
        },
      };
    });

    send(result);
  }

  return (
    <FormContainer>
      <Title title={"Mobilidade do Tornozelo"} />
      <Title title={"Lunge"} />
      <form className="mt-12">
        <div className="ml-auto w-fit -mr-2 sm:mr-1 flex sm:gap-6">
          <span className="text-winePatternLight text-sm sm:text-base font-semibold inline-block max-w-[70px] sm:max-w-20 text-center">
            Joelho Esquerdo
          </span>
          <span className="text-winePatternLight text-sm sm:text-base font-semibold inline-block max-w-[70px] sm:max-w-20 text-center">
            Joelho Direito
          </span>
        </div>
        {fields?.map((field, index) => (
          <div key={field.atletaId} className="flex flex-col">
            <div className="flex my-6">
              <label
                htmlFor={`testeDeLunge.${index}.esquerdo` as const}
                className="w-full text-center"
              >
                {field.atletaNome}
              </label>
              <div className="ml-auto flex gap-4">
                <Controller
                  control={control}
                  name={`testeDeLunge.${index}.esquerdo` as const}
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <IMaskInput
                      className="w-12 sm:w-20"
                      mask={Number}
                      min={0}
                      max={12}
                      scale={0}
                      inputRef={ref}
                      onAccept={onChange}
                      onBlur={onBlur}
                      placeholder="Cm"
                      defaultValue={field.esquerdo ?? undefined}
                      pattern="\d*" // Enables numeric keyboard at mobile devices
                      inputMode="numeric" // Enables numeric keyboard at mobile devices
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`testeDeLunge.${index}.direito` as const}
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <IMaskInput
                      className="w-12 sm:w-20"
                      mask={Number}
                      min={0}
                      max={12}
                      scale={0}
                      inputRef={ref}
                      onAccept={onChange}
                      onBlur={onBlur}
                      placeholder="Cm"
                      defaultValue={field.direito ?? undefined}
                      pattern="\d*" // Enables numeric keyboard at mobile devices
                      inputMode="numeric" // Enables numeric keyboard at mobile devices
                    />
                  )}
                />
              </div>
            </div>

            {errors.testeDeLunge?.[index]?.esquerdo && (
              <p className="ml-auto text-sm text-red-600 -mt-6">
                {errors.testeDeLunge?.[index]?.esquerdo?.message}
              </p>
            )}
            {errors.testeDeLunge?.[index]?.direito && (
              <p className="ml-auto text-sm text-red-600 -mt-6">
                {errors.testeDeLunge?.[index]?.direito?.message}
              </p>
            )}
          </div>
        ))}

        <Button
          text="Salvar informações"
          type="button"
          onClick={handleSubmit((data) => sendExercise(data))}
          className="block m-auto mt-20 mb-10"
        />
      </form>
    </FormContainer>
  );
};

export default MobilidadeTornozelo;
