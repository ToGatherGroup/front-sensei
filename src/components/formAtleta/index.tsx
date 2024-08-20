"use client";
import styles from "./formAtleta.module.css";
import FormTitle from "@/components/title/formTitle/index";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Atleta } from "@/types/TAtleta";
import { atletaCreateSchema } from "@/schemas/athleteSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAthleteProvider } from "@/contexts";
import Button from "../ui/button";
import Loader from "../ui/loader";
import ImageCropper from "@/components/imageCropper/imageCropper";
import { Area } from "react-easy-crop";

type Props = {
  atleta?: Atleta | null;
  method: "POST" | "PUT";
};

const FormAtleta = ({ atleta, method }: Props) => {
  const switchStyles =
    ".switch { position: relative; display: inline-block; width: 160px; height: 34px;}.switch input { display: none;}.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #3C3C3C; -webkit-transition: .4s; transition: .4s; border-radius: 34px;}.slider:before { position: absolute; content: ''; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; border-radius: 50%;}input:checked + .slider { background-color: green;}input:focus + .slider { box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before { -webkit-transform: translateX(26px); -ms-transform: translateX(26px); transform: translateX(125px);}/*------ ADDED CSS ---------*/.slider:after { content: 'Atleta inativo'; color: white; display: block; position: absolute; width: 120px; transform: translate(-50%,-50%); top: 50%; left: 60%; right: 0; font-size: 16px; font-family: Verdana, sans-serif; transition: .4s;}input:checked + .slider:after { content: 'Atleta ativo'; top: 50%; right: 60%; left: 50%; transition: .4s;}";
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [originalAvatarBase64, setOriginalAvatarBase64] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);
  const { registerAthlete, updateAthlete } = useAthleteProvider();
  const [openCropper, setOpenCropper] = useState<boolean>(false); // Estado para controlar a abertura do cropper
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  useEffect(() => {
    if (atleta?.foto && avatarBase64 == "") {
      setAvatarBase64(atleta.foto);
      setOriginalAvatarBase64(atleta.foto);
    }
  }, [atleta, setAvatarBase64]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: atleta?.id,
      nome: atleta?.nome ?? "",
      email: atleta?.email ?? "",
      nascimento: atleta?.nascimento ?? "",
      sexo: atleta?.sexo ?? "",
      faixa: atleta?.faixa,
      isAtivo: !!atleta?.isAtivo,
    },
    mode: "onBlur",
    resolver: yupResolver(atletaCreateSchema), // Certifique-se de que o schema de validação está sendo aplicado corretamente
  });

  const onSubmit = async (data: any) => {
    try {
      switch (method) {
        case "PUT":
          console.log("Método PUT acionado");
          const preparedDataPut = {
            ...data,
            foto: croppedImage || atleta?.foto,
            isAtivo: getValues("isAtivo"),
          };
          console.log("Dados preparados para PUT:", preparedDataPut);
          updateAthlete(preparedDataPut);
          break;

        default:
          console.log("Método POST acionado");
          let finalAvatarBase64 = croppedImage;

          if (!finalAvatarBase64 && data.foto && data.foto[0]) {
            console.log("Arquivo de imagem encontrado:", data.foto[0]);
            finalAvatarBase64 = await file2Base64(data.foto[0]);
            console.log("Imagem convertida para Base64:", finalAvatarBase64);
          }

          const preparedDataPost = {
            ...data,
            foto: finalAvatarBase64,
          };

          if (finalAvatarBase64) {
            console.log("Dados preparados para POST:", preparedDataPost);
            registerAthlete(preparedDataPost);
          } else {
            alert("Por favor, selecione uma imagem para o avatar.");
            console.log("Nenhuma imagem foi selecionada.");
          }
      }
    } catch (error) {
      alert(
        "Houve um erro ao carregar a imagem de avatar. Tente usar uma outra imagem!"
      );
      console.error("Erro ao carregar a imagem:", error);
    }
  };

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  //Função modificada para abrir o cropper
  const uploadAvatar = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarBase64(reader.result as string);
      setOpenCropper(true); // Abrir o cropper após carregar a imagem
    };
    reader.readAsDataURL(file);
  };

  const cropImage = (
    imageSrc: string,
    croppedArea: Area,
    setImageAfterCrop: (croppedImage: string) => void
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    const context = canvas.getContext("2d");

    if (context) {
      const imageObj = new window.Image();
      imageObj.src = imageSrc;
      imageObj.onload = () => {
        context.drawImage(
          imageObj,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height
        );

        const croppedImage = canvas.toDataURL("image/png");
        setImageAfterCrop(croppedImage);
      };
    }
  };

  // Funções para lidar com o recorte
  const handleCropDone = (croppedArea: Area) => {
    cropImage(avatarBase64, croppedArea, (croppedImage) => {
      setCroppedImage(croppedImage);
      setAvatarBase64(croppedImage);
    });
    setOpenCropper(false);
  };

  const handleCropCancel = () => {
    setAvatarBase64(originalAvatarBase64);
    setOpenCropper(false);
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>
        <div className={styles.title}>
          <FormTitle
            title={atleta ? "Editar Atleta" : "Cadastrar Atleta"}
            iconSrc={"/icons/person_24x24_wine.png"}
          ></FormTitle>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {!openCropper && (
            <div className={`${styles.inputRow} ${styles.avatar}`}>
              <label htmlFor="photo">
                <p>Foto do atleta</p>
                <img
                  src={croppedImage || avatarBase64 || "/formAtleta/avatar.png"}
                  alt="Foto do atleta"
                />
                <input
                  {...register("foto", {
                    onChange: (e) => {
                      uploadAvatar(e);
                    },
                  })}
                  className="hidden"
                  type="file"
                  id="photo"
                  accept="image/png"
                />
                {errors.foto && (
                  <p className={styles.displayError}>{errors.foto.message}</p>
                )}
              </label>
            </div>
          )}

          {openCropper && (
            <ImageCropper
              imageSrc={avatarBase64}
              onCropDone={handleCropDone}
              onCropCancel={handleCropCancel}
              aspectRatio={3 / 3}
            />
          )}

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
            <input {...register("nascimento")} type="date" id="nascimento" />
            {errors.nascimento && (
              <p className={styles.displayError}>{errors.nascimento.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="sexo" className={styles.required}>
              Sexo
            </label>
            <select {...register("sexo")} id="sexo">
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            {errors.sexo && (
              <p className={styles.displayError}>{errors.sexo.message}</p>
            )}
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="faixa" className={styles.required}>
              Faixa
            </label>
            <select {...register("faixa")} id="faixa">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="branca">Branca</option>
              <option value="cinza">Cinza</option>
              <option value="azulClaro">Azul clara</option>
              <option value="azulEscuro">Azul escura</option>
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

          {method === "PUT" && (
            <div className={styles.isAtivo}>
              <style>{switchStyles}</style>
              <label className="switch">
                <input type="checkbox" {...register("isAtivo")} />
                <span className="slider"></span>
              </label>

              {errors.isAtivo && (
                <p className={styles.displayError}>{errors.isAtivo.message}</p>
              )}
            </div>
          )}

          <Button
            text={atleta ? "Alterar" : "Cadastrar"}
            type="submit"
            disabled={disableSubmitBtn || loading}
            className="mt-12"
            isLoading={false}
          />
        </form>
      </div>
    </div>
  );
};

export default FormAtleta;
