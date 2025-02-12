import React from "react";
import { Grupo } from "@/types/Grupo"; // Importando o tipo Grupo
import { GruposMock } from "@/mock/grupos"; // Importando a lista mockada
import Image from "next/image";
import styles from "./groupList.module.css";
import FormTitle from "@/components/title/formTitle";
import Button from '@mui/material/Button';

const GrupoList = () => {
  return (
    <div className={styles.grupoList}>
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle
            title="Grupos"
            iconSrc="/icons/grupos.png"
          />
        </div>
      {GruposMock.map((grupo) => (
        <div key={grupo.id} className={styles.grupoItem}>
          <span className={styles.grupoNome}>{grupo.nome}</span>
          <div className={styles.grupoIcones} >
      <Image
        className="inline m-auto"
        src="/icons/editar_perfil_48x48.png"
        alt="Ícone do formulário"
        width={24}
        height={24}
      />
          </div>
        </div>
      ))}




    </div>
  );
};

export default GrupoList;