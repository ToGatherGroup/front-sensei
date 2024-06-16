"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import {
  abdominalSchema,
  AbdominalSchemaType,
} from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormRow from "@/components/ui/formRow";

const Abdominal = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(abdominalSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "abdominais", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            value: assessment.exercicios.abdominais ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ abdominais }: AbdominalSchemaType) {
    const result = abdominais?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          abdominais: atleta.value,
        },
      };
    });

    send(result);
  }

  return (
    <Container>
      <Title title={"Resistência Muscular Localizada"} />
      <Title title={"Abdominal"} />
      <form className="mt-12">
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.abdominais?.[index]?.value?.message}
            label={
              <label htmlFor={`abdominais.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`abdominais.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    mask={"000"}
                    inputRef={ref}
                    onAccept={onChange}
                    onBlur={onBlur}
                    placeholder="Repetições"
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

export default Abdominal;
