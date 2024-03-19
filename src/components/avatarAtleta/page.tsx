"use client";

import { Faixas } from "@/enums/faixas";

import styles from "./avatarAtleta.module.css";

type Props = {
  name: string;
  avatar: string;
  faixa: (typeof Faixas)[number];
};
const AvatarAtleta = ({ name, avatar, faixa }: Props) => {
  return (
    <div
      className={styles.container}
      onClick={() => alert(`Você clicou no ${name}`)}
    >
      <div className={styles.avatarBg}></div>
      <img className={styles.avatar} src={avatar} alt={`Avatar de ${name}`} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};
export default AvatarAtleta;
