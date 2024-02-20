"use client";

import styles from "./formAtleta.module.css";
import Image from "next/image";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IMaskInput } from "react-imask";

interface Atleta {
  name: string;
  email?: string;
  birthdate: Date;
  sex: "male" | "female" | "other";
  weight: number | string;
  height: number;
  faixa:
    | "branca"
    | "cinza"
    | "azulClaro"
    | "azulEscuro"
    | "amarela"
    | "laranja"
    | "verde"
    | "roxa"
    | "marrom"
    | "preta"
    | "coral"
    | "vermelha";
}

const atletaSchema = yup.object().shape({
  name: yup.string().nonNullable().required("Este campo é obrigatório."),
  email: yup.string().email("Insira um e-mail válido"),
  birthdate: yup
    .date()
    .min(new Date(1900, 0, 1), "Você não é tão velho.")
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
});

const FormAtleta = () => {
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(atletaSchema),
  });
  const onSubmit = (data: any) => {
    alert(`Objeto gerado com sucesso!\n\n${JSON.stringify(data)}`);
    console.log(data);
    reset();
  };

  /*   // Data for validation test
  const data: Atleta = {
    name: "Bruno Amado",
    email: "bru-a@hotmail.com",
    birthdate: new Date(1995, 1, 2),
    sex: "male",
    weight: "10.50",
    height: 172,
    faixa: "azulClaro",
  };

  // Perform validation test
  atletaSchema
    .validate(data)
    .then((valid) => {
      console.log(valid);
      console.log(
        `Mês: ${valid.birthdate ? valid.birthdate.getMonth() : "null"}`
      );
    })
    .catch((error) => {
      console.log(error);
      console.log(`Mês: ${error.birthdate.getMonth()}`);
    }); */

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Cadastrar atleta</h1>
          <Image
            src="/icons/person_24x24.png"
            alt="Ícone de cadastro"
            width={24}
            height={24}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputRow}>
            <label htmlFor="name" className={styles.required}>
              Nome
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Insira seu nome"
            />
            {errors.name && (
              <p className={styles.displayError}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="email">E-mail</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
            />
            {errors.email && (
              <p className={styles.displayError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="birthdate" className={styles.required}>
              Data de nascimento
            </label>
            <input {...register("birthdate")} type="date" id="birthdate" />
            {errors.birthdate && (
              <p className={styles.displayError}>{errors.birthdate.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="sex" className={styles.required}>
              Sexo
            </label>
            <select {...register("sex")} id="sex" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            {errors.sex && (
              <p className={styles.displayError}>{errors.sex.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="weight" className={styles.required}>
              Peso (kg)
            </label>
            <input
              type="number"
              {...register("weight")}
              id="weight"
              placeholder={"0,0"}
              step={0.01}
            />
            {errors.weight && (
              <p className={styles.displayError}>{errors.weight.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="height" className={styles.required}>
              Altura (cm)
            </label>
            <input
              type="number"
              {...register("height")}
              id="height"
              placeholder={"0"}
              step={0.5}
            />
            {errors.height && (
              <p className={styles.displayError}>{errors.height.message}</p>
            )}
          </div>

          {/*           <div className={styles.inputRow}>
            <label htmlFor="category">Categoria</label>
            <select name="category" id="category" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="branca">Sub 9</option>
              <option value="cinza">Sub 11</option>
              <option value="azulClaro">Sub 13</option>
              <option value="azulEscuro">Sub 15</option>
              <option value="amarela">Sub 18</option>
              <option value="laranja">Adulto</option>
            </select>
          </div> */}

          <div className={styles.inputRow}>
            <label htmlFor="faixa" className={styles.required}>
              Faixa
            </label>
            <select {...register("faixa")} id="faixa" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="branca">Branca</option>
              <option value="cinza">Cinza</option>
              <option value="azulClaro">Azul claro</option>
              <option value="azulEscuro">Azul escuro</option>
              <option value="amarela">Amarela</option>
              <option value="laranja">Laranja</option>
              <option value="verde">Verde</option>
              <option value="roxa">Roxa</option>
              <option value="marrom">Marrom</option>
              <option value="preta">Preta</option>
              <option value="coral">Coral</option>
              <option value="vermelha">Vermelha</option>
            </select>
            {errors.faixa && (
              <p className={styles.displayError}>{errors.faixa.message}</p>
            )}
          </div>

          <input type="submit" value="Cadastrar" className="btnSubmit" />
        </form>
      </div>
    </div>
  );
};

export default FormAtleta;
