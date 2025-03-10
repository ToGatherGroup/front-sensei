"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGroupProvider } from '@/contexts/groups/groups';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grupo } from '@/types/Grupo';
import Switch from '@mui/material/Switch';

interface ModalNewGroupProps {
    putMethod?: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onGroupChange?: () => void;
    group?: Grupo | null;
}

// Schema de validação para o formulário do modal
const groupSchema = yup.object().shape({
    nome: yup.string().required('Nome do grupo é obrigatório')
});



export default function ModalNewGroup({ open, setOpen, onGroupChange, putMethod, group }: ModalNewGroupProps) {

    const { postGroup, putGroup } = useGroupProvider();
    const [name, setName] = useState<string>('');

    // Configuração do react-hook-form
    const {
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(groupSchema)
    });

    const [checked, setChecked] = useState(false);

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleCreateGroup = async () => {
        if (name) {
            postGroup(name).then(() => {
                onGroupChange && onGroupChange(); // Callback opcional para o pai saber que um grupo foi criado
            })
        }
        handleClose();
    };

    const handleEditGroup = async () => {
        if (group) {
            putGroup(group?.id, {
                nome: name,
                isAtivo: checked
            }).then(() => {
                onGroupChange && onGroupChange(); // Callback opcional para o pai saber que um grupo foi criado
            })
        }
    }

        useEffect(() => {
            if (group && putMethod) {
                // Preencher o formulário com os dados do grupo selecionado
                setName(group.nome)
                // outros campos do formulário...
            }
        }, [group, putMethod, reset]);

        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{putMethod ? `Editar` : 'Criar'} Grupo</DialogTitle>
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
                            fullWidth
                            margin="dense"
                            id="inputField"
                            name="inputText"
                            label="Nome do grupo"
                            placeholder='Digite o nome do grupo'
                            variant="outlined"
                            value={name ? name : ''}
                            onChange={(e) => setName(e.target.value.trim?.())}
                        />
                    </DialogContent>
                    <div className='flex justify-center items-center'>
                        <Switch defaultChecked checked={checked}
                            onChange={handleToggle} className='self-center' />
                        <label className='self-center'>{`${checked ? 'Ativo' : 'Inativo'}`}</label>

                    </div>
                    <DialogActions sx={{ justifyContent: 'space-around' }}>
                        <Button onClick={handleClose} disableElevation>Cancelar</Button>
                        <Button onClick={putMethod ? handleEditGroup : handleCreateGroup} variant='outlined' sx={(theme) => (
                            {
                                '& .MuiButton-outlinedPrimary': {
                                    color: theme.palette.primary.main,
                                    borderWidth: 12,
                                },
                                '& .MuiButton-colorPrimary': {
                                    color: theme.palette.secondary.main,
                                    borderWidth: 2,
                                },
                                '& .MuiButtonBase-root': {
                                    color: theme.palette.primary.main,
                                    borderWidth: 12,
                                },
                            }
                        )} disableElevation>{`${putMethod ? `Editar` : 'Criar'}`}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }