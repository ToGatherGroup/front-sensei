import * as yup from "yup";

const timeValidation = yup.string()
  .transform((_, val) => {
    if (val === "") return null;
    return val;
  })
  .test("time_check", "Tempo inserido é inválido.", (timeInput) => {
    if (timeInput == null) return true;

    let error = false;
    const [minStr, secStr] = timeInput.split(":");
    try {
      const min = Number(minStr);
      const sec = Number(secStr);
      if (isNaN(min) || isNaN(sec)) error = true;

      if (min < 0 || min >= 60) error = true;
      if (sec >= 60) error = true;

    } catch (e) {
      return false;
    }
    return !error;
  })
  .nullable()
  .typeError("Verifique se inseriu corretamente o tempo");

const numberValidation = yup.number()
  .transform((_, val) => {
    if (val === "" || val === undefined) return null;
    return Number(val);
  })
  .test("number_check", "Valor inserido é inválido.", (nInput) => {
    if (nInput == null) return true;

    try {
      if (isNaN(nInput)) throw new Error();
      if (nInput <= 0) return false;
    } catch (e) {
      return false;
    }
    return true;
  })
  .min(1, "Valor não pode ser igual ou menor a zero.")
  .nullable()
  .typeError("Verifique se inseriu corretamente o valor");

export const formSchema = yup.object().shape({
  date: yup.date()
    .required("Este campo é obrigatório")
    .max(new Date(), "A data não pode ser futura"),
  rmEarth: numberValidation.required("Este campo é obrigatório"),
  verticalThrust: numberValidation.required("Este campo é obrigatório"),
  board: timeValidation.required("Este campo é obrigatório"),
  forceIsometricHands: timeValidation.required("Este campo é obrigatório"),
  abs: numberValidation.required("Este campo é obrigatório"),
  lungeTest: numberValidation.required("Este campo é obrigatório"),
  pushUps: numberValidation.required("Este campo é obrigatório"),
  burpees: numberValidation.required("Este campo é obrigatório"),
  cooper: numberValidation.required("Este campo é obrigatório"),
  height: numberValidation.required("Este campo é obrigatório"),
  weight: numberValidation.required("Este campo é obrigatório"),
  atletaModel: yup.number().required("Este campo é obrigatório"),
});

export type FormData = yup.InferType<typeof formSchema>;

export interface IApiPostData {
  data: string;
  impulsaoVertical: number;
  rmTerra: number;
  prancha: string;
  forcaIsometricaMaos: string;
  abdominais: number;
  testeDeLunge: number;
  flexoes: number;
  burpees: number;
  cooper: number;
  altura: number;
  peso: number;
  avaliacaoModelId: {
    atletaModel: {
      id: number | string;
    };
    data: string;
  };
}
