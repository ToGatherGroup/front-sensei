"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import {
  resistenciaAaerobicaSchema,
  resistenciaAaerobicaSchemaType,
} from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormRow from "@/components/ui/formRow";

const ResistenciaAerobica = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(resistenciaAaerobicaSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "cooper", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            value: assessment.exercicios.cooper ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ cooper }: resistenciaAaerobicaSchemaType) {
    const result = cooper?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          cooper: atleta.value,
        },
      };
    });

    send(result);
  }

  return (
    <Container>
      <Title title={"Resistência Aeróbica"} />
      <Title title={"Teste de Cooper"} />
      <form className="mt-12">
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.cooper?.[index]?.value?.message}
            label={
              <label htmlFor={`cooper.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`cooper.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    mask={"0000"}
                    inputRef={ref}
                    onAccept={onChange}
                    onBlur={onBlur}
                    placeholder="Metros"
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
    </Container>
  );
};

export default ResistenciaAerobica;
