"use client";

import styles from "./formAtleta.module.css";
import Image from "next/image";
import Loading from "@/components/loading/index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TAtleta } from "@/types/TAtleta";
import { atletaToApiPost } from "@/api/middleware/atleta";
import axios from "axios";
import { atletaCreateSchema } from "@/schemas/athleteSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useApiProvider } from "@/contexts";

type Props = {
  atleta?: TAtleta;
};

const api = axios.create({
  baseURL: "https://sensei.squareweb.app/atleta",
});

const FormAtleta = ({ atleta }: Props) => {
  const { post } = useApiProvider();
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);
  const [athlete, setAthlete] = useState<TAtleta[]>([]);

  const router = useRouter();

  //Carrega o Avatar
  if (atleta?.photo && avatarBase64 === "") {
    setAvatarBase64(atleta.photo);
  }

  const {
    register,
    getValues,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(atletaCreateSchema),
  });

  const onSubmit = (data: any) => {
    file2Base64(data.photo[0])
      .then((avatarBase64) => {
        console.log("Submeter a API aqui:");
        data.avatarBase64 = avatarBase64;
        //alert(`Objeto gerado com sucesso!\n\n${JSON.stringify(data)}`);
        const atletaData = atletaToApiPost(data);
        console.log(data);
        console.log(atletaData);
        console.log(JSON.stringify(atletaData));
        submitForm(data);
      })
      .catch((error) => {
        alert(
          "Houve um erro ao carregar a imagem de avatar. Tente usar uma outra imagem!"
        );
        console.log(error);
      });
    reset();
    //router.push("/atleta/perfil/0");
  };

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

  const uploadAvatar = (event: EventListener) => {
    console.log("Realizando upload...");
    console.log(getValues("photo"));
    setDisableSubmitBtn(true);
    setLoading(true);

    const avatarFile = getValues("photo")![0];
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

  const submitForm = async (data: TAtleta) => {
    try {
      const response = await api.post("", atletaToApiPost(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 201) {
        throw new Error("Erro ao cadastrar atleta");
      }
      console.log("Atleta cadastrado com sucesso!");
      setAthlete([...athlete, data]);
    } catch (error) {
      console.error("Erro ao cadastrar atleta:", error);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
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
            <label htmlFor="photo">
              <p>Foto do atleta</p>
              <img
                src={avatarBase64 ? avatarBase64 : "/formAtleta/avatar.png"}
                alt="Foto do atleta"
              ></img>
            </label>
            <input
              {...register("photo", {
                onChange: (e) => {
                  uploadAvatar(e);
                },
              })}
              type="file"
              id="photo"
              accept="image/png"
            />
            {errors.photo && (
              <p className={styles.displayError}>{errors.photo.message}</p>
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
            <label htmlFor="belt" className={styles.required}>
              Faixa
            </label>
            <select
              {...register("belt")}
              id="belt"
              defaultValue={atleta ? atleta.belt : ""}
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
            {errors.belt && (
              <p className={styles.displayError}>{errors.belt.message}</p>
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
