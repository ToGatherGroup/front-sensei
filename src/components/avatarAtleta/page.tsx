"use client";

import { Faixas } from "@/enums/faixas";

import styles from "./avatarAtleta.module.css";

type Props = {
  name: string;
  avatar: string;
  size: "small" | "big";
  faixa?: (typeof Faixas)[number];
};

const AvatarAtleta = ({ name, avatar, faixa, size }: Props) => {
  const faixasColor = {
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

  if (size === "big" && faixa) {
    return (
      <div
        className={styles.container}
        onClick={() => alert(`Você clicou no ${name}`)}
      >
        <div
          className={styles.avatarBgBig}
          style={{
            background: `${faixasColor[faixa].background}`,
            borderColor: `${faixasColor[faixa].backgroundBorder}`,
          }}
        ></div>
        <img
          className={styles.avatarBig}
          src={avatar}
          alt={`Avatar de ${name}`}
        />
        <div
          className={styles.nameContainerBig}
          style={{
            background: `${faixasColor[faixa].background}`,
            borderColor: `${faixasColor[faixa].nameBorder}`,
          }}
        >
          <p style={{ color: `${faixasColor[faixa].name}` }}>{name}</p>
        </div>
      </div>
    );
  } else if (size === "small") {
    return (
      <div
        className={styles.container}
        onClick={() => alert(`Você clicou no ${name}`)}
      >
        <div className={styles.avatarBg}></div>
        <img className={styles.avatar} src={avatar} alt={`Avatar de ${name}`} />
        <div className={styles.nameContainer}>
          <p>{name}</p>
        </div>
      </div>
    );
  }
};

export default AvatarAtleta;
