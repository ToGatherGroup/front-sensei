import * as yup from "yup";

// Função para verificar se a data não é futura
const isNotFutureDate = (value: string | number | Date | undefined) => {
  if (!value) return true;
  const today = new Date();
  const inputDate = new Date(value);
  return inputDate <= today;
};
// Padrão
export const IEvaluationDataSchema = yup.object().shape({
  data: yup
    .string()
    .test("is-required-when-post", "Valor obrigatório.", function (value) {
      const { method }: any = this.options.context;
      return method === "PUT" || (!!value && value.trim() !== "");
    })
    .test(
      "is-not-future-date",
      "A data não pode ser no futuro.",
      function (value) {
        return isNotFutureDate(value);
      }
    )
    .typeError("Valor obrigatório"),
  peso: yup
    .number()

    .min(1, "Valor obrigatório.")
    .typeError("Valor obrigatório.")
    .required(),
  altura: yup
    .number()
    .integer()

    .min(1, "Valor obrigatório.")
    .typeError("Valor obrigatório.")
    .required(),
  prancha: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      return val;
    })
    .matches(/^\d{2}:\d{2}$/, "Tempo inserido é inválido.")
    .test("time_check", function (timeInput) {
      if (timeInput == null) return true;

      let error = false;

      const [minStr, segStr] = timeInput.split(":");
      try {
        const min = Number(minStr);
        const seg = Number(segStr);
        if (isNaN(min) || isNaN(seg)) error = true;

        if (min < 0 || min >= 60) error = true;

        if (seg < 0 || seg >= 60) error = true;
      } catch (e) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (error)
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });

      return true;
    })
    .nullable()
    .required("Valor obrigatório.")
    .typeError("Verifique se inseriu corretamente o tempo"),
  flexoes: yup
    .number()

    .integer()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  abdominais: yup
    .number()

    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  burpees: yup
    .number()

    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  cooper: yup
    .number()

    .max(9999)
    .typeError("Valor obrigatório.")
    .required(),
  rmTerra: yup.number().min(0).typeError("Valor obrigatório.").required(),
  forcaIsometricaMaos: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      return val;
    })
    .matches(/^\d{2}:\d{2}$/, "Tempo inserido é inválido.")
    .test("time_check", function (timeInput) {
      if (timeInput == null) return true;

      let error = false;

      const [minStr, segStr] = timeInput.split(":");
      try {
        const min = Number(minStr);
        const seg = Number(segStr);
        if (isNaN(min) || isNaN(seg)) error = true;

        if (min < 0 || min >= 60) error = true;

        if (seg < 0 || seg >= 60) error = true;
      } catch (e) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (error)
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });

      return true;
    })
    .nullable()
    .required("Valor obrigatório.")
    .typeError("Verifique se inseriu corretamente o tempo"),
  testeDeLungeJoelhoDireito: yup
    .number()
    .min(0)
    .max(12, "12 valor máximo")
    .typeError("Valor obrigatório.")
    .required(),
  testeDeLungeJoelhoEsquerdo: yup
    .number()
    .min(0)
    .max(12, "12 valor máximo")
    .typeError("Valor obrigatório.")
    .required(),
  impulsaoVertical: yup
    .number()
    .min(0, "Não são permitidos valores negativos.")
    .typeError("Valor obrigatório.")
    .required(),
});
