"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import {
  forcaIsometricaSchema,
  forcaIsometricaSchemaType,
} from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormRow from "@/components/ui/formRow";
import minSecToPT from "@/functions/minSecToPT";
import ptToMinSec from "@/functions/ptToMinSec";

const ForcaIsometrica = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(forcaIsometricaSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "forcaIsometricaMaos", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            value: ptToMinSec(assessment.exercicios.forcaIsometricaMaos) ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ forcaIsometricaMaos }: forcaIsometricaSchemaType) {
    const result = forcaIsometricaMaos?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          forcaIsometricaMaos: minSecToPT(atleta.value),
        },
      };
    });

    send(result);
  }

  return (
    <Container>
      <Title title={"Força Isométrica"} />
      <Title title={"Força de prensão manual com quimono"} />
      <form className="mt-12">
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.forcaIsometricaMaos?.[index]?.value?.message}
            label={
              <label htmlFor={`forcaIsometricaMaos.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`forcaIsometricaMaos.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    type="text" // iMask doesn't supports 'number' type
                    mask={"00:00"}
                    inputRef={ref}
                    onAccept={onChange}
                    onBlur={onBlur}
                    placeholder="Min  :  Seg"
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

export default ForcaIsometrica;
