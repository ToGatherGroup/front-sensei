"use client";

import styles from "./formAtleta.module.css";
import Image from "next/image";

import Loading from "@/components/loading/index";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Config for file upload
const MAX_FILE_SIZE = 2 * 1000 * 1000; //MB to KB
const validFileExtensions: string[] = ["image/png"];

const atletaSchema = yup.object().shape({
  avatar: yup
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

type Atleta = {
  avatar: string;
  name: string;
  email?: string;
  birthdate: Date;
  sex: string;
  weight: number | string;
  height: number;
  faixa: string;
};

type Props = {
  atleta?: Atleta;
};

const FormAtleta = ({ atleta }: Props) => {
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);

  //Load avatar if it exists
  if (atleta?.avatar && avatarBase64 === "") {
    setAvatarBase64(atleta.avatar);
  }

  const {
    register,
    getValues,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(atletaSchema),
  });
  const onSubmit = (data: any) => {
    file2Base64(data.avatar[0])
      .then((avatarBase64) => {
        console.log("Submeter a API aqui:");
        data.avatarBase64 = avatarBase64;
        alert(`Objeto gerado com sucesso!\n\n${JSON.stringify(data)}`);
        console.log(data);
      })
      .catch((error) => {
        alert(
          "Houve um erro ao carregar a imagem de avatar. Tente usar uma outra imagem!"
        );
        console.log(error);
      });
    reset();
  };

  /* // Data for validation test
  const data: Atleta = {
    name: "Bruno Amado",
    email: "2225973@hotmail.com",
    birthdate: new Date(1990, 0, 0),
    sex: "male",
    weight: "10.50",
    height: 172,
    faixa: "azulClaro",
  };

  // Perform validation test
  atletaSchema
    .validate(data)
    .then((valid) => {
      console.log("Validou: " + valid);
    })
    .catch((error) => {
      console.log("Não validou: " + error);
    }); */

  //  Treatment for date before fill input (from GET)
  function twoDigits(n: number) {
    if (n < 10) {
      return `0${n}`;
    }
    return n.toString();
  }

  function dateForInput(date: Date) {
    const year = date.getFullYear();
    const month = twoDigits(date.getMonth() + 1); // Yeah... This shit.. Need to be increased by 1, since the index starts on zero. (0 = January)
    const day = twoDigits(date.getDate());
    const dateFormat = `${year}-${month}-${day}`;
    return dateFormat;
  }

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  /*   const fileToBase64 = (file: File) => {
    let reader = new FileReader();

    reader.onloadstart = () => console.log("Carregando imagem...");
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatar(base64);
    };

    reader.readAsDataURL(file);
  }; */

  const uploadAvatar = (event: EventListener) => {
    console.log("Realizando upload...");
    console.log(getValues("avatar"));
    setDisableSubmitBtn(true);
    setLoading(true);

    const avatarFile = getValues("avatar")![0];
    file2Base64(avatarFile)
      .then((avatarBase64) => {
        setAvatarBase64(avatarBase64);
        console.log(avatarBase64);
      })
      .finally(() => {
        setDisableSubmitBtn(false);
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Loading enable={loading} />
      <div className={styles.content}>
        <div className={styles.title}>
          {atleta ? <h1>Alterar Atleta</h1> : <h1>Cadastrar Atleta</h1>}
          <Image
            src="/icons/person_24x24.png"
            alt={atleta ? "Ícone de alteração" : "Ícone de cadastro"}
            width={24}
            height={24}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.inputRow} ${styles.avatar}`}>
            <label htmlFor="avatar">
              <p>Foto do atleta</p>
              <img
                src={avatarBase64 ? avatarBase64 : "/formAtleta/avatar.png"}
                alt="Foto do atleta"
              ></img>
            </label>
            <input
              {...register("avatar", {
                onChange: (e) => {
                  uploadAvatar(e);
                },
              })}
              type="file"
              id="avatar"
              accept="image/png"
            />
            {errors.avatar && (
              <p className={styles.displayError}>{errors.avatar.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="name" className={styles.required}>
              Nome
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Insira seu nome"
              value={atleta && atleta.name}
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
              value={atleta && atleta.email}
            />
            {errors.email && (
              <p className={styles.displayError}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="birthdate" className={styles.required}>
              Data de nascimento
            </label>
            <input
              {...register("birthdate")}
              type="date"
              id="birthdate"
              value={atleta && dateForInput(atleta.birthdate)}
            />
            {errors.birthdate && (
              <p className={styles.displayError}>{errors.birthdate.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="sex" className={styles.required}>
              Sexo
            </label>
            <select
              {...register("sex")}
              id="sex"
              defaultValue={atleta ? atleta.sex : ""}
            >
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

          <div className={styles.weightHeight}>
            <div className={styles.inputRow}>
              <label htmlFor="weight" className={styles.required}>
                Peso (kg)
              </label>
              <input
                {...register("weight")}
                type="number"
                id="weight"
                placeholder={"0,0"}
                step={0.01}
                value={atleta && atleta.weight}
              />
            </div>

            <div className={styles.inputRow}>
              <label htmlFor="height" className={styles.required}>
                Altura (cm)
              </label>
              <input
                {...register("height")}
                type="number"
                id="height"
                placeholder={"0"}
                step={1}
                value={atleta && atleta.height}
              />
            </div>
          </div>

          {errors.weight && (
            <p
              className={`${styles.displayError} ${styles.displayErrorWidthHeight}`}
            >
              {errors.weight.message}
            </p>
          )}
          {errors.height && (
            <p
              className={`${styles.displayError} ${styles.displayErrorWidthHeight}`}
            >
              {errors.height.message}
            </p>
          )}

          <div className={styles.inputRow}>
            <label htmlFor="faixa" className={styles.required}>
              Faixa
            </label>
            <select
              {...register("faixa")}
              id="faixa"
              defaultValue={atleta ? atleta.faixa : ""}
            >
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

          <input
            type="submit"
            value={atleta ? "Alterar" : "Cadastrar"}
            className="btnSubmit"
            disabled={disableSubmitBtn}
          />
        </form>
      </div>
    </div>
  );
};

export default FormAtleta;
