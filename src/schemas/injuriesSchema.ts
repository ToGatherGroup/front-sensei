import dayjs, { Dayjs } from "dayjs";
import * as yup from "yup";
dayjs.extend(require("dayjs/plugin/customParseFormat"));

export const injuriesSchema = yup.object().shape({
  data: yup
      .mixed<Dayjs>()
      .transform((_, val: string) => dayjs(val, "DD/MM/YYYY", true))
      .test("date_check", function (date) {
        if (!dayjs.isDayjs(date) || !date?.isValid())
          return this.createError({
            message: "A data inserida não é valida",
            path: this.path,
          });

        if (date?.isAfter(dayjs()))
          return this.createError({
            message:
              "A data de cadastro não pode ser uma data que ainda não chegou.",
              path: this.path,
          });

        return true;
      })
      .required("Obrigatório inserir a data da lesão")
      .typeError("Insira uma data válida"),
  regiao: yup.string().transform((_, val) => {
    if (val === '') return null;
    return val;
  }).required("Selecione a região no boneco."),
  descricao: yup.string().min(5, "Descrição muito curta.").required("Este campo é obrigatório."),
});

export type injuriesSchemaType = typeof injuriesSchema.__outputType;