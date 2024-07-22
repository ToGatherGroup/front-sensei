"use client";
import Button from "@/components/ui/button";
import FormContainer from "@/components/ui/formContainer";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import {
  forcaMaximaSchema,
  forcaMaximaSchemaType,
} from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormRow from "@/components/ui/formRow";

const ForcaMaxima = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(forcaMaximaSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "terraKg", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            value: assessment.exercicios.rmTerra ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ terraKg }: forcaMaximaSchemaType) {
    const result = terraKg?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          rmTerra: atleta.value,
        },
      };
    });

    send(result);
  }

  return (
    <FormContainer>
      <Title title={"Força Máxima"} />
      <Title title={"1RM Terra"} />
      <form className="mt-12">
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.terraKg?.[index]?.value?.message}
            label={
              <label htmlFor={`terraKg.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`terraKg.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    mask={"000"}
                    inputRef={ref}
                    onAccept={onChange}
                    onBlur={onBlur}
                    placeholder="Kg"
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

export default ForcaMaxima;
