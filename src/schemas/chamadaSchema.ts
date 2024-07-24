import * as yup from "yup";

export const chamadaSchema = yup.object().shape({
  atletaCheckbox: yup.array().of(
    yup.object().shape({
      atletaId: yup.number(),
      atletaNome: yup.string(),
      value: yup.boolean(),
    })
  ),
});
