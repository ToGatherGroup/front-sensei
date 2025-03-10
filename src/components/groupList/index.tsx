"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Grupo } from "@/types/Grupo"; // Importando o tipo Grupo
import { GruposMock } from "@/mock/grupos"; // Importando a lista mockada
import Image from "next/image";
import styles from "./groupList.module.css";
import FormTitle from "@/components/title/formTitle";
import Button from '@mui/material/Button';

import { useGroupProvider } from "@/contexts/groups/groups";

import ModalNewGroup from "@/components/modalNovoGrupo";

const GrupoList = () => {

  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<Grupo | null>(null);

  const {
    groupList,
    getGroups
  } = useGroupProvider();

  useEffect(() => {
    getGroups();
  }, []);

    const handleGroupCreated = () => {
    getGroups();
  };

  return (
    <div className={`${styles.grupoList} max-w-[150px]`}>
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle
            title="Grupos"
            className={`bg-container rounded p-2`}
            iconSrc="/icons/grupos.png"
          />
        </div>
      {Array.isArray(groupList) && groupList.length > 0 ? (
      groupList.map((grupo) => (
        <div key={grupo.id} className={styles.grupoItem}>
          <span className={styles.grupoNome}>{grupo.nome}</span>
          <div className={styles.grupoIcones}>
            <Image
              className="inline m-auto hover:cursor-pointer"
              src="/icons/editar_perfil_48x48.png"
              alt="Ícone do formulário"
              onClick={() => {setCurrentGroup(grupo); setOpenGroupModal(true)}}
              width={24}
              height={24}
            />
            <Image
              className="inline m-auto hover:cursor-pointer"
              src="/icons/grupos.png"
              alt="Ícone do formulário"
              width={28}
              height={24}
            />
            <div className="">
              <Image
                className="inline m-auto hover:cursor-pointer"
                src="/icons/delete.png"
                alt="Ícone do formulário"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center p-4">
        <p>Nenhum grupo disponível</p>
      </div>
    )}
      <ModalNewGroup
              open={openGroupModal}
              group={currentGroup}
              putMethod={true}
              setOpen={setOpenGroupModal}
              onGroupChange={handleGroupCreated} // Aqui pode ser possível atualizar a lista de grupos
            />
    </div>
  );
};

export default GrupoList;