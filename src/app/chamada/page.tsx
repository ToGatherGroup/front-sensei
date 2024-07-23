"use client";

import Button from "@/components/ui/button";
import FormContainer from "@/components/ui/formContainer";
import Loader from "@/components/ui/loader";
import Title from "@/components/ui/title";
import { useApiProvider } from "@/contexts";
import { chamadaSchema } from "@/schemas/chamadaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Atleta = {
  id: number;
  nome: string;
};

const Chamada = () => {
  const router = useRouter();
  const api = useApiProvider();

  const { handleSubmit, control, register } = useForm({
    mode: "onBlur",
    resolver: yupResolver(chamadaSchema),
  });

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "atletaCheckbox", // unique name for your Field Array
  });

  useEffect(() => {
    api
      .get("/atleta/lista", {
        showLoading: false,
      })
      ?.then(({ data }) => {
        const atletas: Array<Atleta> = data;
        atletas.forEach((atleta) => {
          append(
            {
              atletaNome: atleta.nome,
              atletaId: atleta.id,
              value: false,
            },
            { shouldFocus: false }
          );
        });
      });
  }, []);

  type FormData = Array<{
    atletaId: number;
    atletaNome: string;
    value: boolean;
  }>;
  function submit(data: any) {
    const formData: FormData = data.atletaCheckbox;
    const ids = formData
      .filter((atleta) => atleta.value == true)
      .map((atleta) => atleta.atletaId);

    console.log("ids:", ids);
    if (!ids) return;

    api.post("/atleta/chamada", ids)?.then(() => router.push("/"));
  }

  return (
    <FormContainer>
      <Title title="Lista de Chamada" iconSrc="/icons/person_24x24_wine.png" />
      <>
        {fields.length > 0 ? (
          fields?.map((atleta, index) => (
            <label
              htmlFor={`atletaCheckbox.${index}.value` as const}
              className="m-auto flex items-center justify-center w-80 my-2"
              key={atleta.id}
            >
              <input
                {...register(`atletaCheckbox.${index}.value` as const)}
                id={`atletaCheckbox.${index}.value` as const}
                type="checkbox"
                className="sr-only peer"
              />
              <span className="bg-gray-200 cursor-pointer inline-block w-full text-lg text-center capitalize peer-checked:text-white peer-checked:bg-winePatternLight hover:outline hover:outline-winePatternLight py-2 px-4 rounded">
                {atleta.atletaNome}
              </span>
            </label>
          ))
        ) : (
          <Loader />
        )}
      </>
      <Button
        text="Finalizar Chamada"
        type="submit"
        className="block mx-auto mt-12"
        onClick={handleSubmit(submit)}
      />
    </FormContainer>
  );
};

export default Chamada;
