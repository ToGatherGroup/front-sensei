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
    .positive()
    .min(1)
    .typeError("Valor obrigatório.")
    .required(),
  altura: yup
    .number()
    .integer()
    .positive()
    .min(1)
    .typeError("Valor obrigatório.")
    .required(),
  prancha: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      if (val.includes(":")) {
        const [min, sec] = val.split(":");
        return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
      }
      return val;
    })
    .test("time_check", "Tempo inserido é inválido.", function (timeInput) {
      if (!timeInput) {
        return this.createError({
          message: "Valor obrigatório.",
          path: this.path,
        });
      }

      const [minStr, secStr] = timeInput.split(":");

      if (minStr === undefined || secStr === undefined) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (minStr.length !== 2 || secStr.length !== 2) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      const min = Number(minStr);
      const sec = Number(secStr);

      // Check for NaN
      if (isNaN(min) || isNaN(sec)) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (min < 0 || min >= 60 || sec < 0 || sec >= 60) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .required("Valor obrigatório."),
  flexoes: yup
    .number()
    .positive()
    .integer()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  abdominais: yup
    .number()
    .positive()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  burpees: yup
    .number()
    .positive()
    .max(999)
    .typeError("Valor obrigatório.")
    .required(),
  cooper: yup
    .number()
    .positive()
    .max(9999)
    .typeError("Valor obrigatório.")
    .required(),
  rmTerra: yup.number().min(0).typeError("Valor obrigatório.").required(),
  forcaIsometricaMaos: yup
    .string()
    .transform((_, val) => {
      if (val === "") return null;
      if (val.includes(":")) {
        const [min, sec] = val.split(":");
        return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
      }
      return val;
    })
    .test("time_check", "Tempo inserido é inválido.", function (timeInput) {
      if (!timeInput) {
        return this.createError({
          message: "Valor obrigatório.",
          path: this.path,
        });
      }

      const [minStr, secStr] = timeInput.split(":");

      if (minStr === undefined || secStr === undefined) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (minStr.length !== 2 || secStr.length !== 2) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      const min = Number(minStr);
      const sec = Number(secStr);

      if (isNaN(min) || isNaN(sec)) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      if (min < 0 || min >= 60 || sec < 0 || sec >= 60) {
        return this.createError({
          message: "Tempo inserido é inválido.",
          path: this.path,
        });
      }

      return true;
    })
    .required("Valor obrigatório."),
  testeDeLungeDireito: yup
    .number()
    .min(0)
    .max(12, "12 valor máximo")
    .typeError("Valor obrigatório.")
    .required(),
  testeDeLungeEsquerdo: yup
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
