"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import { coreSchema, CoreSchemaType } from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import minSecToPT from "@/functions/minSecToPT";
import ptToMinSec from "@/functions/ptToMinSec";
import FormRow from "@/components/ui/formRow";

const Core = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(coreSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "coreTime", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            value: ptToMinSec(assessment.exercicios.prancha) ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ coreTime }: CoreSchemaType) {
    const result = coreTime?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          prancha: minSecToPT(atleta.value),
        },
      };
    });

    send(result);
  }

  return (
    <Container>
      <Title title={"Core"} />
      <Title title={"Prancha Isométrica"} />
      <form className="mt-12">
        {fields?.map((field, index) => (
          <FormRow
            key={field.id}
            errorMessage={errors.coreTime?.[index]?.value?.message}
            label={
              <label htmlFor={`coreTime.${index}.value` as const}>
                {field.atletaNome}
              </label>
            }
            input={
              <Controller
                control={control}
                name={`coreTime.${index}.value` as const}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <IMaskInput
                    type="text" // iMask doesn't supports 'number' type
                    mask={["\\00{:}00", "00{:}00"]}
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

export default Core;
