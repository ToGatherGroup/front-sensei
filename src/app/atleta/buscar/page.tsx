"use client";

import { useState } from "react";

import { Atletas } from "@/mock/atletas";

import FormTitle from "@/components/Title/formTitle";
import AvatarAtleta from "@/components/avatarAtleta/page";

import styles from "./selecionar.module.css";

const atletaPerPage = 8;

const AtletaSelecionar = () => {
  const [pages, setPages] = useState(0);

  type Atleta = {
    name: string;
    avatar: string;
    faixa?: string;
  };

  const calculatePag = (atletaArray: Atleta[]) => {
    let pagesNumber = Math.floor(atletaArray.length / atletaPerPage);
    if (atletaArray.length % atletaPerPage > 0) {
      pagesNumber += 1;
    }
    setPages(pagesNumber);
  };

  // Test:
  if (pages == 0) {
    calculatePag(Atletas);
  }

  return (
    <div className={styles.container}>
      <div className={`form-container ${styles.content}`}>
        <FormTitle
          title="Buscar atleta"
          iconSrc="/icons/person_24x24.png"
          className={styles.title}
        />
        <input
          name="atletaName"
          type="text"
          placeholder="Insira o nome do atleta"
          autoComplete="off"
        />

        <ul className={styles.listAtletas}>
          {Atletas.map((atleta, i) => (
            <li key={i}>
              <AvatarAtleta
                name={atleta.name}
                avatar={atleta.avatar}
                faixa="branca"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AtletaSelecionar;
