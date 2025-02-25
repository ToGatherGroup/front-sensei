"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@/components/modal';
import ModalDialog from '@/components/modalNovoGrupo';
import { useState } from 'react';


export default function SubscriptionDialog() {
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const confirmModal = async () => {
    //if (assessment && assessment?.length <= 0) await createAssessments();
    setModalVisible(false);
  };

  const cancelModal = () => {
    setModalVisible(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputText = formData.get('inputText') as string;

    // Lógica para requisição futura
    console.log('Dados submetidos:', inputText);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color='primary' endIcon={<img width={50} src="/icons/add_grupo.png" />} onClick={handleOpen}>
        Novo Grupo
      </Button>
      <div>
      {/* <Modal
          title=
           "Novo Grupo"
          
          // text='Nome do novo grupo'
          closeModalFunction={cancelModal}
          confirmButtonFunction={confirmModal}
          cancelButtonFunction={cancelModal}
          confirmButtonText={
"Criar Novo Grpo"
          }
        >
          <div className="flex items-center justify-center" style={{ paddingTop: '2rem' }}>
            <input
              type="text"
              name="inputText"
              placeholder="Novo Grupo"
            />
          </div>
          </Modal> */}
        <ModalDialog open={false} setOpen={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } }></ModalDialog>
      </div>
    </div>
  );
}