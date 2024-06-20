import * as yup from "yup";

//configuração de upload de arquivo
const MAX_FILE_SIZE = 2 * 1000 * 1000; //MB to KB
const validFileExtensions: string[] = ["image/png"];

export const atletaCreateSchema = yup.object().shape({
  foto: yup
    .mixed<FileList>()
    .test(
      "is-valid-size",
      `Arquivo muito grande. Peso máximo: ${MAX_FILE_SIZE / 1000 / 1000} MB`,
      (value) => {
        if (value && value.length <= 0) return true;
        return value && value[0].size <= MAX_FILE_SIZE;
      }
    )
    .test("is-valid-format", "Formato inválido. Use .PNG", (value) => {
      if (value && value.length <= 0) return true;
      return value && validFileExtensions.includes(value[0].type);
    }),
    id: yup.number().optional(),
  nome: yup.string().required("Este campo é obrigatório."),
  email: yup.string().optional().email("Insira um e-mail válido"),
  nascimento: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida, use o formato YYYY-MM-DD')
    .typeError('Insira uma data válida'),
  sexo: yup
    .string()
    .oneOf(["M", "F", "O", ""] as const, "Selecione o sexo.")
    .required("Este campo é obrigatório.")
    .typeError("Selecione o sexo."),
  peso: yup
    .number()
    .required("Este campo é obrigatório.")
    .typeError("Insira o peso em quilogramas."),
  altura: yup
    .number()
    .integer("Insira a altura em centímetros.")
    .required("Este campo é obrigatório.")
    .typeError("Insira a altura em centímetros."),
  faixa: yup
    .string()
    .oneOf(
      [
        "branca",
        "cinza",
        "azulClaro",
        "azulEscuro",
        "amarela",
        "laranja",
        "verde",
        "roxa",
        "marrom",
        "preta",
        "coral",
        "vermelha",
      ],
      "Selecione uma faixa."
    )
    .required("Este campo é obrigatório.")
    .typeError("Selecione a faixa."),


    isAtivo: yup.number().required().default(1)

  // isAtivo: yup.lazy((value) =>
  //   typeof value !== 'boolean'
  //     ? yup.boolean().transform((_, val) => {
  //       console.log('val', !!val);
  //       return !!val
  //     }).required('Required field').default(true)
  //     : yup.number().transform((val, rawValue) => console.log("val number:", val, "rawValue number:", rawValue))
  // ),
});