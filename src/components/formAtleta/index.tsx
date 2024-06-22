"use client";
import styles from "./formAtleta.module.css";
import Loading from "@/components/loading/index";
import FormTitle from "@/components/title/formTitle/index";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Atleta } from "@/types/TAtleta";
import { atletaCreateSchema } from "@/schemas/athleteSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAthleteProvider } from "@/contexts";
import Button from "../ui/button";
import ReactSwitch from "react-switch";

type Props = {
  atleta?: Atleta | null;
  method: 'POST' | 'PUT';
};

const FormAtleta = ({ atleta, method }: Props) => {
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);
  const { registerAthlete, updateAthlete } = useAthleteProvider();
  const [checked, setChecked] = useState<boolean>(atleta?.isAtivo ? atleta?.isAtivo : true);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  useEffect(() => {
    if (atleta?.foto && avatarBase64 == "") {
      setAvatarBase64(atleta.foto);
    }
  }, [atleta, setAvatarBase64]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: atleta?.id,
      nome: atleta?.nome ?? "",
      email: atleta?.email ?? "",
      nascimento: atleta?.nascimento ?? "",
      sexo: atleta?.sexo ?? "",
      peso: atleta?.peso ? atleta?.peso : 0,
      altura: atleta?.altura ? atleta?.altura : 0,
      faixa: atleta?.faixa,
      isAtivo: atleta?.isAtivo ? atleta?.isAtivo : true,
    },
    mode: "onBlur",
    resolver: yupResolver(atletaCreateSchema),  // Certifique-se de que o schema de validação está sendo aplicado corretamente
  });

  const onSubmit = (data: any) => {
    switch(method) {
      case 'PUT': 
        const preparedData = data;
       
        if(avatarBase64) {
          preparedData.foto = avatarBase64;
        } else {
          preparedData.foto = atleta?.foto;
        }

        preparedData.isAtivo = checked;

        updateAthlete(preparedData);
        
        break;
      default:
        file2Base64(data.foto[0])
        .then((avatarBase64) => {
          
          const preparedData = data;

          preparedData.foto = avatarBase64;

          preparedData.isAtivo = checked;
         
          registerAthlete(preparedData);
        })
        .catch((error) => {
          alert(
            "Houve um erro ao carregar a imagem de avatar. Tente usar uma outra imagem!"
          );
          console.log(error);
        });
    }

    reset();
    setAvatarBase64("");
  };

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadAvatar = (event: EventListener) => {
    setDisableSubmitBtn(true);
    setLoading(true);

    const avatarFile = getValues("foto")![0];
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
      {loading && <Loading />}
      <div className={styles.content}>
        <div className={styles.title}>
          <FormTitle
            title={atleta ? "Editar Atleta" : "Cadastrar Atleta"}
            iconSrc={"/icons/person_24x24_wine.png"}
          ></FormTitle>

          {/* {atleta ? <h1>Alterar Atleta</h1> : <h1>Cadastrar Atleta</h1>}
          <Image
            src="/icons/person_24x24.png"
            alt={atleta ? "Ícone de alteração" : "Ícone de cadastro"}
            width={24}
            height={24}
          /> */}
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
              {...register("foto", {
                onChange: (e) => {
                  uploadAvatar(e);
                },
              })}
              type="file"
              id="photo"
              accept="image/png"
            />
            {errors.foto && (
              <p className={styles.displayError}>{errors.foto.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="nome" className={styles.required}>
              Nome
            </label>
            <input
              {...register("nome")}
              type="text"
              id="nome"
              placeholder="Insira seu nome"
            />
            {errors.nome && (
              <p className={styles.displayError}>{errors.nome.message}</p>
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
            <label htmlFor="nascimento" className={styles.required}>
              Data de nascimento
            </label>
            <input
              {...register("nascimento")}
              type="date"
              id="nascimento"
            />
            {errors.nascimento && (
              <p className={styles.displayError}>{errors.nascimento.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="sexo" className={styles.required}>
              Sexo
            </label>
            <select
              {...register("sexo")}
              id="sexo"
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            {errors.sexo && (
              <p className={styles.displayError}>{errors.sexo.message}</p>
            )}
          </div>

          <div className={styles.weightHeight}>
            <div className={styles.inputRow}>
              <label htmlFor="peso" className={styles.required}>
                Peso (kg)
              </label>
              <input
                {...register("peso")}
                type="number"
                id="peso"
                placeholder={"0,0"}
                step={0.01}
              />
            </div>

            <div className={styles.inputRow}>
              <label htmlFor="altura" className={styles.required}>
                Altura (cm)
              </label>
              <input
                {...register("altura")}
                type="number"
                id="altura"
                placeholder={"0"}
                step={1}
              />
            </div>
          </div>

          {errors.peso && (
            <p
              className={`${styles.displayError} ${styles.displayErrorWidthHeight}`}
            >
              {errors.peso.message}
            </p>
          )}
          {errors.altura && (
            <p
              className={`${styles.displayError} ${styles.displayErrorWidthHeight}`}
            >
              {errors.altura.message}
            </p>
          )}

          <div className={styles.inputRow}>
            <label htmlFor="faixa" className={styles.required}>
              Faixa
            </label>
            <select
              {...register("faixa")}
              id="faixa"
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

          <div className={styles.isAtivo}>
            <label htmlFor="isAtivo" className={styles.required}>
              Atleta ativo
            </label>
            
            <ReactSwitch
              {...register("isAtivo")}
              onChange={handleChange}
              checked={checked}
              offColor="#888"
              onColor="#0f0"
              uncheckedIcon={false}
              checkedIcon={false}
              handleDiameter={20}
              height={20}
              width={40}
            />
           
            {errors.isAtivo && (
              <p className={styles.displayError}>{errors.isAtivo.message}</p>
            )}
          </div>

          <Button
            text={atleta ? "Alterar" : "Cadastrar"}
            type="submit"
            disabled={disableSubmitBtn}
            className="mt-12"
            isLoading={false}
          />
        </form>
      </div>
    </div>
  );
};

export default FormAtleta;
