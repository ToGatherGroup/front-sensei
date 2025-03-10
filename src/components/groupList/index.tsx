"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Grupo } from "@/types/Grupo";
import styles from "./groupList.module.css";
import FormTitle from "@/components/title/formTitle";
import { useGroupProvider } from "@/contexts/groups/groups";
import ModalGroup from "@/components/modalGrupo";
import FormContainer from "@/components/ui/formContainer";
import MuiButton from "@mui/material/Button";

const GrupoList = () => {
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<Grupo | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'ativos' | 'inativos'>('todos');
  
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
  
  const getGruposFiltrados = () => {
    if (!Array.isArray(groupList)) return [];
    
    switch (filtroStatus) {
      case 'ativos':
        return groupList.filter(grupo => grupo.isAtivo);
      case 'inativos':
        return groupList.filter(grupo => !grupo.isAtivo);
      default:
        return groupList;
    }
  };

  const gruposFiltrados = getGruposFiltrados();

  return (
    <FormContainer>
      <div className="flex flex-col justify-items-center w-full">
        <div className="w-full mb-6 flex flex-col md:flex-row md:items-center">
          <div className="w-full flex justify-center mb-4 md:mb-0 md:absolute md:left-0 md:right-0">
            <FormTitle
              title="Grupos"
              className={`rounded p-2 z-10`}
              iconSrc="/icons/grupos.png"
            />
          </div>
          
          <div className="w-full flex justify-center md:justify-end">
            <MuiButton
              color="inherit"
              variant="contained"
              sx={(theme) => ({
                margin: 0,
                maxWidth: '50%',
                bgcolor: 'theme.palette.primary.main',
                color: 'theme.palette.primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
                '& .MuiButton-root ': {
                  borderWidth: 24,
                },
                '& .MuiButton-color:hover': {
                  color: 'red',
                  borderWidth: 24,
                },
                '& .MuiButtonBase-root': {
                  borderWidth: 2,
                },
              })}
              endIcon={<img width={50} src="/icons/add_grupo.png" />}
              onClick={() => setOpenGroupModal(true)}
            >
              Novo Grupo
            </MuiButton>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-4 mt-6">
          <button 
            className={`px-4 py-2 rounded-md border transition-colors ${
              filtroStatus === 'todos' 
                ? 'bg-wine-500 text-white border-wine-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setFiltroStatus('todos')}
          >
            Todos
          </button>
          <button 
            className={`px-4 py-2 rounded-md border transition-colors ${
              filtroStatus === 'ativos' 
                ? 'bg-wine-500 text-white border-wine-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setFiltroStatus('ativos')}
          >
            Ativos
          </button>
          <button 
            className={`px-4 py-2 rounded-md border transition-colors ${
              filtroStatus === 'inativos' 
                ? 'bg-wine-500 text-white border-wine-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setFiltroStatus('inativos')}
          >
            Inativos
          </button>
        </div>

        <div className="w-full">
          {gruposFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gruposFiltrados.map((grupo) => (
                <div
                  key={grupo.id}
                  className={`${styles.grupoItem} text-center cursor-pointer hover:bg-gray-100 hover:shadow-md hover:scale-105 transform transition-all duration-200 p-4 border rounded-md
                    ${!grupo.isAtivo ? 'opacity-60 border-dashed border-gray-400' : ''}`}
                  onClick={() => {setCurrentGroup(grupo); setOpenGroupModal(true)}}
                >
                  <span className={styles.grupoNome}>{grupo.nome}</span>
                  {!grupo.isAtivo && (
                    <div className="text-xs mt-1 text-gray-500">(Inativo)</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-md">
              <p>Nenhum grupo {filtroStatus !== 'todos' ? filtroStatus : ''} disponível</p>
            </div>
          )}
        </div>
        
        <ModalGroup
          open={openGroupModal}
          group={currentGroup}
          putMethod={currentGroup !== null}
          setOpen={setOpenGroupModal}
          onGroupChange={handleGroupCreated}
        />
      </div>
    </FormContainer>
  );
};

export default GrupoList;