"use client";

import Injuries from "@/components/injuries";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useApiProvider } from "@/contexts";
import { bodyPartToOutput } from "@/enums/lesoes";
import { injuriesSchema, injuriesSchemaType } from "@/schemas/injuriesSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMask, IMaskInput } from "react-imask";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};
const CadastroLesao = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [dummyPosition, setDummyPosition] = useState<"front" | "back">("front");
  const [selectedBodyPart, SetSelectedBodyPart] = useState("");

  const api = useApiProvider();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: "",
      regiao: "",
      descricao: "",
    },
    mode: "onBlur",
    resolver: yupResolver(injuriesSchema), // Certifique-se de que o schema de validação está sendo aplicado corretamente
  });

  function rotateDummy() {
    setDummyPosition((oldPosition) => {
      return oldPosition === "front" ? "back" : "front";
    });
  }

  function handleBodyPartClick(bodyPartName: string) {
    SetSelectedBodyPart((oldValue) =>
      bodyPartName === oldValue ? "" : bodyPartName
    );
    setValue(
      "regiao",
      bodyPartToOutput(bodyPartName) === getValues().regiao
        ? ""
        : bodyPartToOutput(bodyPartName) || "",
      { shouldValidate: true }
    );
  }

  function submit(data: injuriesSchemaType) {
    const preparedData = {
      data: data.data.format("YYYY-MM-DD"),
      descricao: data.descricao,
      regiaoLesao: selectedBodyPart,
      atletaModel: {
        id: id,
      },
    };

    api.post("/lesao", preparedData)?.then(() => {
      router.push(`/atleta/perfil/${id}`);
    });
  }

  return (
    <>
      <div className="relative flex items-center justify-center h-fit w-fit m-auto">
        <div className="bg-gray-200 rounded absolute z-10 top-0 right-0">
          <Image
            alt="Botão de rotacionar boneco"
            src={"/icons/axis_z_rotate_counterclockwise_icon.png"}
            width={50}
            height={50}
            onClick={() => rotateDummy()}
            className="cursor-pointer"
          />
        </div>
        <Injuries
          injuries={[selectedBodyPart]}
          type={dummyPosition}
          width={"300px"}
          height={"500px"}
          viewBoxValue={
            dummyPosition === "front"
              ? "2300 4800 14600 21000"
              : "2300 4000 16500 21000"
          }
          onClick={(clickedBodyPart) => handleBodyPartClick(clickedBodyPart)}
        />
      </div>
      <Container className="flex flex-col items-center">
        <Title title="Cadastrar Lesão" iconSrc="/icons/injuries_24x24.png" />

        <form className="mt-8 flex flex-col gap-4 sm:items-start justify-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
            <label
              htmlFor="regiao"
              className="text-center sm:text-left inline sm:!w-24 sm:inline-block"
            >
              Região
            </label>
            <input
              type="text"
              placeholder="Selecione no boneco"
              className="p-2 text-white bg-winePattern placeholder:bg-winePattern"
              {...register("regiao")}
              disabled={true}
            />
          </div>
          {errors.regiao?.message && (
            <p className="m-auto text-red-600 mb-4 text-sm sm:text-base">
              {errors.regiao?.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
            <label
              className="text-center sm:text-left inline sm:!w-24 sm:inline-block"
              htmlFor="data"
            >
              Data
            </label>
            <Controller
              control={control}
              name={"data"}
              render={({ field: { onChange, onBlur, ref } }) => (
                <IMaskInput
                  className="w-32 p-2"
                  type="text" // iMask doesn't supports 'number' type
                  mask={"`dd{/}`mm{/}`YYYY"}
                  min={new Date(1970, 0, 1)}
                  max={new Date()}
                  blocks={{
                    dd: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 31,
                    },
                    mm: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 12,
                    },
                    YYYY: {
                      mask: IMask.MaskedRange,
                      from: 1900,
                      to: dayjs().year(),
                    },
                  }}
                  inputRef={ref}
                  onAccept={onChange}
                  onBlur={onBlur}
                  placeholder="01/01/2024"
                  defaultValue={""}
                  inputMode="numeric" // Enables numeric keyboard at mobile devices
                />
              )}
            />
          </div>
          {errors.data?.message && (
            <p className="m-auto text-red-600 mb-4 text-sm sm:text-base">
              {errors.data?.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
            <label
              htmlFor=""
              className="text-center sm:text-left inline sm:!w-24 sm:inline-block"
            >
              Descrição
            </label>
            <input
              type="text"
              placeholder="Ligamento rompido"
              className="p-2"
              {...register("descricao")}
            />
          </div>
          {errors.descricao?.message && (
            <p className="m-auto text-red-600 mb-4 text-sm sm:text-base">
              {errors.descricao?.message}
            </p>
          )}

          <Button
            onClick={handleSubmit((data) => submit(data))}
            text="Cadastrar"
            type="button"
            className="block m-auto mt-10"
          />
        </form>
      </Container>
    </>
  );
};
export default CadastroLesao;
