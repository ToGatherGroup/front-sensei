"use client";
import FormTitle from "@/components/title/formTitle/index";
import Button from "@/components/button";
import { useEffect } from "react";
import { useApiProvider } from "@/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { formSchema, FormData, IApiPostData } from "@/schemas/formSchema";
import { IMaskInput } from "react-imask";
import Container from "@/components/ui/container";
import FormRow from "@/components/ui/formRow";

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

const avaliationToApiPost = (data: FormData): IApiPostData => {
  return {
    data: data.date.toISOString(),
    impulsaoVertical: data.verticalThrust,
    rmTerra: data.rmEarth,
    prancha: data.board,
    forcaIsometricaMaos: data.forceIsometricHands,
    abdominais: data.abs,
    testeDeLunge: data.lungeTest,
    flexoes: data.pushUps,
    burpees: data.burpees,
    cooper: data.cooper,
    altura: data.height,
    peso: data.weight,
    avaliacaoModelId: {
      atletaModel: {
        id: data.atletaModel,
      },
      data: data.date.toISOString(),
    },
  };
};

const PhysicalEvaluation = ({ params: { id } }: Props) => {
  const { post } = useApiProvider();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data); // Verificação
    try {
      data.atletaModel = Number(id);

      const response = await post("avaliacao", avaliationToApiPost(data));
      if (response?.status !== 201) {
        throw new Error("Erro ao cadastrar avaliação");
      }
      console.log("Avaliação Cadastrada com sucesso");
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar avaliação:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return (
    <Container >
      <FormTitle className="mx-auto" title="Cadastrar Avaliação" iconSrc="/icons/assessment.png" inlineImage={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex-col ">
        <FormRow
          label={<label>Data</label>}
          input={
            <input
              {...register("date")}
              type="date"
              className="bg-gray-200 w-42 px-4 py-2 rounded"
            />
          }
          errorMessage={errors.date?.message as string}
        />
        <FormRow
          label={<label>RM Levantamento Terra</label>}
          input={
            <Controller
              control={control}
              name="rmEarth"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  radix="."
                  inputMode="decimal"
                  placeholder="Kg"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.rmEarth?.message as string}
        />
        <FormRow
          label={<label>Impulsão Vertical</label>}
          input={
            <Controller
              control={control}
              name="verticalThrust"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  min={0}
                  max={999}
                  placeholder="Cm"
                  pattern="\d*" // Enables numeric keyboard at mobile devices
                  inputMode="numeric" // Enables numeric keyboard at mobile devices
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.verticalThrust?.message as string}
        />
        <FormRow
          label={<label>Prancha</label>}
          input={
            <Controller
              control={control}
              name="board"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  type="text" // iMask doesn't supports 'number' type
                  mask={["\\00{:}00", "00{:}00"]}
                  placeholder="Min  :  Seg"
                  inputMode="numeric" // Enables numeric keyboard at mobile devices
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
        />
        <FormRow
          label={<label>Força de Preensão</label>}
          input={
            <Controller
              control={control}
              name="forceIsometricHands"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  type="text" // iMask doesn't supports 'number' type
                  mask={["\\00{:}00", "00{:}00"]}
                  placeholder="Min  :  Seg"
                  inputMode="numeric" // Enables numeric keyboard at mobile devices
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.forceIsometricHands?.message as string}
        />
        <FormRow
          label={<label>Abdominais</label>}
          input={
            <Controller
              control={control}
              name="abs"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  radix="."
                  inputMode="decimal"
                  placeholder="Repetições"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.abs?.message as string}
        />
        <FormRow
          label={<label>Teste de Lunge</label>}
          input={
            <Controller
              control={control}
              name="lungeTest"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  inputMode="numeric"
                  placeholder="Kg"
                  pattern="\d*"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.lungeTest?.message as string}
        />
        <FormRow
          label={<label>Flexões</label>}
          input={
            <Controller
              control={control}
              name="pushUps"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  inputMode="numeric"
                  placeholder="Repetições"
                  pattern="\d*"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.pushUps?.message as string}
        />
        <FormRow
          label={<label>Burpees</label>}
          input={
            <Controller
              control={control}
              name="burpees"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  inputMode="numeric"
                  placeholder="Repetições"
                  pattern="\d*"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.burpees?.message as string}
        />
        <FormRow
          label={<label>Teste de Cooper</label>}
          input={
            <Controller
              control={control}
              name="cooper"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="0000"
                  inputMode="decimal"
                  placeholder="Metros"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.cooper?.message as string}
        />
        <FormRow
          label={<label>Altura</label>}
          input={
            <Controller
              control={control}
              name="height"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  inputMode="decimal"
                  placeholder="Cm"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.height?.message as string}
        />
        <FormRow
          label={<label>Peso</label>}
          input={
            <Controller
              control={control}
              name="weight"
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000"
                  inputMode="decimal"
                  placeholder="Kg"
                  className="bg-gray-200 w-24 px-4 py-2 rounded"
                  value={field.value ? String(field.value) : ""}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      field.onChange(event.target.value);
                    }
                  }}
                />
              )}
            />
          }
          errorMessage={errors.weight?.message as string}
        />
        <button type="submit" className="block m-auto mt-20 mb-10">
          Cadastrar
        </button>
      </form>
    </Container>
  );
};

export default PhysicalEvaluation;