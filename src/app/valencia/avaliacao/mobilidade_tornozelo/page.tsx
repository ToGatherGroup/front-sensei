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
import FormRow from "@/components/ui/formRow";

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
            value: assessment.exercicios.testeDeLunge ?? "",
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
          testeDeLunge: atleta.value,
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
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.testeDeLunge?.[index]?.value?.message}
            label={
              <label htmlFor={`testeDeLunge.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`testeDeLunge.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    mask={Number}
                    min={0}
                    max={12}
                    scale={0}
                    inputRef={ref}
                    onAccept={onChange}
                    onBlur={onBlur}
                    placeholder="Cm"
                    defaultValue={field.value ?? undefined}
                    pattern="\d*" // Enables numeric keyboard at mobile devices
                    inputMode="numeric" // Enables numeric keyboard at mobile devices
                  />
                )}
              />
            }
          />
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
