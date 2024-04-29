import * as yup from "yup";

//configuração de upload de arquivo
const MAX_FILE_SIZE = 2 * 1000 * 1000; //MB to KB
const validFileExtensions: string[] = ["image/png"];

export const atletaCreateSchema = yup.object().shape({
  photo: yup
    .mixed<FileList>()
    .test(
      "is-valid-size",
      `Arquivo muito grande. Peso máximo: ${MAX_FILE_SIZE / 1000 / 1000} MB`,
      (value) => {
        console.log(value);
        console.log(value && value[0]);
        console.log("Max_File_Size: " + MAX_FILE_SIZE);
        if (value && value.length <= 0) return true;
        return value && value[0].size <= MAX_FILE_SIZE;
      }
    )
    .test("is-valid-format", "Formato inválido. Use .PNG", (value) => {
      if (value && value.length <= 0) return true;
      return value && validFileExtensions.includes(value[0].type);
    }),
  name: yup.string().required("Este campo é obrigatório."),
  email: yup.string().optional().email("Insira um e-mail válido"),
  birthdate: yup
    .date()
    .min(new Date(1900, 0, 1), "Essa pessoa não é tão velha assim.")
    .max(new Date(), "Insira uma data válida.")
    .typeError("Insira uma data válida."),
  sex: yup
    .string()
    .oneOf(["male", "female", "other"] as const, "Selecione o sexo.")
    .required("Este campo é obrigatório.")
    .typeError("Selecione o sexo."),
  weight: yup
    .string()
    .matches(/\d+\.{0,1}\d{1,3}$/gm, "Insira um peso válido.")
    .required("Este campo é obrigatório.")
    .typeError("Insira o peso em quilogramas."),
  height: yup
    .number()
    .integer("Insira a altura em centímetros.")
    .required("Este campo é obrigatório.")
    .typeError("Insira a altura em centímetros."),
  belt: yup
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
});
