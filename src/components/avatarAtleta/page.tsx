"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Faixas } from "@/enums/faixas";

import styles from "./avatarAtleta.module.css";

type Props = {
  id: string;
  name?: string;
  photo?: string;
  size: "small" | "big";
  belt?: (typeof Faixas)[number];
  className?: string | undefined;
};

const AvatarAtleta = ({ id, name, photo, belt, size, className }: Props) => {
  const router = useRouter();

  const beltsColor = {
    branca: {
      background: "#fff",
      backgroundBorder: "#000",
      name: "#000",
      nameBorder: "#ccc",
    },
    cinza: {
      background: "#808080",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#4d4d4d",
    },
    azulClaro: {
      background: "#add8e6",
      backgroundBorder: "#fff",
      name: "#000",
      nameBorder: "#3ca1c3",
    },
    azulEscuro: {
      background: "#00008b",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#000033",
    },
    amarela: {
      background: "#ffff00",
      backgroundBorder: "#fff",
      name: "#000",
      nameBorder: "#999900",
    },
    laranja: {
      background: "#ffa500",
      backgroundBorder: "#fff",
      name: "#000",
      nameBorder: "#996300",
    },
    verde: {
      background: "#008000",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#003300",
    },
    roxa: {
      background: "#a020f0",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#5c0a8f",
    },
    marrom: {
      background: "#964b00",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#331a00",
    },
    preta: {
      background: "#000",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#333333",
    },
    coral: {
      background:
        "linear-gradient(to right, #ff0000 0, #ff0000 30%, #fff 31%, #fff 69%, #ff0000 70%)",
      backgroundBorder: "#fff",
      name: "#000",
      nameBorder: "#990000",
    },
    vermelha: {
      background: "#ff0000",
      backgroundBorder: "#fff",
      name: "#fff",
      nameBorder: "#990000",
    },
  };

  if (size === "big") {
    if (belt) {
      return (
        <div
          className={styles.container}
          onClick={() => alert(`Você clicou no ${name}`)}
          // Posteriormente atribuir ação para avatar
          //onClick={onClickHandler ? onClickHandler : () => alert(`Você clicou no ${name}`)}
        >
          <div
            className={styles.photoBgBig}
            style={{
              background: `${beltsColor[belt].background}`,
              borderColor: `${beltsColor[belt].backgroundBorder}`,
            }}
          ></div>
          {photo && (
            <img
              className={styles.photoBig}
              src={photo}
              alt={`Foto de ${name}`}
            />
          )}
          <div
            className={styles.nameContainerBig}
            style={{
              background: `${beltsColor[belt].background}`,
              borderColor: `${beltsColor[belt].nameBorder}`,
            }}
          >
            <p style={{ color: `${beltsColor[belt].name}` }}>{name}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${styles.container} ${className}`}>
          <div className={styles.photoBgBig}></div>
          <img
            className={styles.photoBig}
            src={photo}
            alt={`Foto de ${name}`}
          />
          <div className={styles.nameContainerBig}>
            <p>{name}</p>
          </div>
        </div>
      );
    }
  } else if (size === "small") {
    return (
      <div
        className={styles.container}
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`/atleta/perfil/${id}`)}
      >
        <div className={styles.photoBg}></div>
        <img className={styles.photo} src={photo} alt={`Foto de ${name}`} />
        <div className={styles.nameContainer}>
          <p>{name}</p>
        </div>
      </div>
    );
  }
};

export default AvatarAtleta;
