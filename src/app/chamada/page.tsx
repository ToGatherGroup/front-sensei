"use client";

import Button from "@/components/ui/button";
import FormContainer from "@/components/ui/formContainer";
import Loader from "@/components/ui/loader";
import Title from "@/components/ui/title";
import { useApiProvider } from "@/contexts";
import { chamadaSchema } from "@/schemas/chamadaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
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
  const [fetched, setFetched] = useState(false);

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
          /* MOCK.forEach((atleta) => { */
          append(
            {
              atletaNome: atleta.nome,
              atletaId: atleta.id,
              value: false,
            },
            { shouldFocus: false }
          );
        });
      })
      .finally(() => setFetched(true));
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

    if (!ids) return;

    api.post("/atleta/chamada", ids)?.then(() => router.push("/"));
  }

  return (
    <FormContainer>
      <Title title="Lista de Chamada" iconSrc="/icons/chamada_24x24.png" />
      <h2 className="text-center -mt-10 mb-12 text-lg font-bold text-winePatternLight">
        {dayjs().format("DD/MM/YYYY")}
      </h2>
      <>
        {!fetched ? (
          <Loader />
        ) : fields.length <= 0 ? (
          <p className="text-center">A chamada de hoje já foi realizada.</p>
        ) : (
          fields?.map((atleta, index) => (
            <label
              htmlFor={`atletaCheckbox.${index}.value` as const}
              className="m-auto flex items-center justify-center max-w-80 my-2"
              key={atleta.id}
            >
              <input
                {...register(`atletaCheckbox.${index}.value` as const)}
                id={`atletaCheckbox.${index}.value` as const}
                type="checkbox"
                className="sr-only peer"
              />
              <span className="bg-gray-200 cursor-pointer inline-block w-full text-lg text-center capitalize peer-checked:text-white peer-checked:bg-winePatternLight sm:hover:outline sm:hover:outline-winePatternLight py-2 px-4 rounded">
                {atleta.atletaNome}
              </span>
            </label>
          ))
        )}

        {fetched && fields.length > 0 && (
          <Button
            text="Finalizar Chamada"
            type="submit"
            className="block mx-auto mt-12"
            onClick={handleSubmit(submit)}
          />
        )}
      </>
    </FormContainer>
  );
};

export default Chamada;
