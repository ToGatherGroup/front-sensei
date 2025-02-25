"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGroupProvider } from '@/contexts/groups/groups';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ModalNewGroupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onGroupCreated?: () => void;
}

// Schema de validação para o formulário do modal
const groupSchema = yup.object().shape({
    nome: yup.string().required('Nome do grupo é obrigatório')
});

export default function ModalNewGroup({ open, setOpen, onGroupCreated }: ModalNewGroupProps) {

    const { postGroup } = useGroupProvider();
    const [name, setName] = useState<string>('');

    // Configuração do react-hook-form
    const {
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(groupSchema)
    });

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const handleCreateGroup = async () => {
        if (name) {
            postGroup(name).then(() => {
                onGroupCreated && onGroupCreated(); // Callback opcional para o pai saber que um grupo foi criado
            })
        }
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar novo grupo</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={(theme) => (
                            {
                                '& .MuiInputLabel-root': {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 12,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.secondary.main,
                                    borderWidth: 2,
                                },
                            }
                        )}
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="inputField"
                        name="inputText"
                        label="Nome do novo grupo"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value.trim?.())}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button onClick={handleClose} disableElevation sx={{ color: 'red' }}>Cancelar</Button>
                    <Button onClick={handleCreateGroup} variant='contained' sx={{ color: 'red' }} disableElevation>Criar Grupo</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}