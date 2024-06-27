"use client";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import { ImcSchema, ImcSchemaType } from "@/schemas/exerciseSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";

import React, { useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormRow from "@/components/ui/formRow";

const Imc = () => {
  const { assessment, send } = useAssessmentsProvider();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ImcSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "imc", // unique name for your Field Array
  });

  useEffect(() => {
    assessment &&
      assessment.forEach((assessment) => {
        append(
          {
            atletaId: assessment.atletaId,
            atletaNome: assessment.atletaNome,
            peso: assessment.exercicios.peso ?? "",
            altura: assessment.exercicios.altura ?? "",
          },
          { shouldFocus: false }
        );
      });
  }, []);

  function sendExercise({ imc }: ImcSchemaType) {
    const result = imc?.map((atleta) => {
      return {
        atletaId: atleta.atletaId,
        resultado: {
          peso: atleta.peso,
          altura: atleta.altura,
        },
      };
    });

    send(result);
  }

  return (
    <Container>
      <Title title={"IMC"} />
      <Title title={"Peso e Altura"} captlize={false} />
      <div className="flex justify-center items-center gap-14 mt-8 mb-2 font-semibold sm:justify-end sm:mr-20 sm:gap-16">
        <p>Peso</p>
        <p>Altura</p>
      </div>
      <form>
        {fields?.map((field, index) => (
          <div key={field.id}>
            <FormRow
              className="first:mt-0"
              label={
                <label htmlFor={`imc.${index}` as const}>
                  {field.atletaNome}
                </label>
              }
              input={
                <div className="text-center">
                  <Controller
                    control={control}
                    name={`imc.${index}.peso` as const}
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <IMaskInput
                        type="text" // iMask doesn't supports 'number' type
                        mask={Number}
                        max={999}
                        inputRef={ref}
                        onAccept={onChange}
                        onBlur={onBlur}
                        placeholder="Kg"
                        defaultValue={field.peso ?? undefined}
                        pattern="\d*" // Enables numeric keyboard at mobile devices
                        inputMode="numeric" // Enables numeric keyboard at mobile devices
                        className={
                          errors.imc?.[index]?.peso?.message &&
                          "outline outline-1 outline-red-600 mb-5"
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`imc.${index}.altura` as const}
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <IMaskInput
                        type="text" // iMask doesn't supports 'number' type
                        mask={"000"}
                        inputRef={ref}
                        onAccept={onChange}
                        onBlur={onBlur}
                        placeholder="Cm"
                        defaultValue={field.altura ?? undefined}
                        pattern="\d*" // Enables numeric keyboard at mobile devices
                        inputMode="numeric" // Enables numeric keyboard at mobile devices
                        className={
                          errors.imc?.[index]?.altura?.message &&
                          "outline outline-1 outline-red-600 mb-5"
                        }
                      />
                    )}
                  />
                </div>
              }
            />
            <div className="mb-6 -mt-4 text-red-600 max-w-64 m-auto sm:mr-0 sm:ml-auto flex flex-col gap-2">
              <p>{errors.imc?.[index]?.peso?.message}</p>
              <p>{errors.imc?.[index]?.altura?.message}</p>
            </div>
          </div>
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

export default Imc;
