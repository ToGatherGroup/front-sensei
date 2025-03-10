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
import { Grupo } from '@/types/Grupo';
import Switch from '@mui/material/Switch';

interface ModalGroupProps {
    putMethod?: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onGroupChange?: () => void;
    group?: Grupo | null;
}

export default function ModalGroup({ open, setOpen, onGroupChange, putMethod, group }: ModalGroupProps) {
    const { postGroup, putGroup } = useGroupProvider();
    const [name, setName] = useState<string>('');
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const validateInput = (input: string): boolean => {
        // Regex para identificar caracteres comuns (letras, números e alguns símbolos básicos)
        const commonCharRegex = /[a-zA-Z0-9 \-_.,!?()]/;

        if (!input || input.trim() === '') {
            setErrorMessage('Nome do grupo é obrigatório');
            return false;
        }

        if (input.length < 3) {
            setErrorMessage('O nome deve ter pelo menos 3 caracteres');
            return false;
        }

        if (!commonCharRegex.test(input)) {
            setErrorMessage('O nome deve conter pelo menos um caractere comum');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const handleClose = () => {
        setName('');
        setErrorMessage('');
        setOpen(false);
    };

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleCreateGroup = async () => {
        if (validateInput(name)) {
            postGroup(name).then(() => {
                onGroupChange && onGroupChange();
                handleClose();
            }).catch(error => {
                setErrorMessage('Erro ao criar grupo. Tente novamente.');
            });
        }
    };

    const handleEditGroup = async () => {
        if (validateInput(name) && group) {
            putGroup(group.id, {
                nome: name,
                isAtivo: checked
            }).then(() => {
                onGroupChange && onGroupChange();
                handleClose();
            }).catch(error => {
                setErrorMessage('Erro ao editar grupo. Tente novamente.');
            });
        }
    };

    useEffect(() => {
        if (group && putMethod) {
            // Preencher o formulário com os dados do grupo selecionado
            setName(group.nome);
            setChecked(group.isAtivo || false);
        }
    }, [group, putMethod]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{putMethod ? 'Editar' : 'Criar'} Grupo</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={(theme) => ({
                            '& .MuiInputLabel-root': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: 12,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.secondary.main,
                                borderWidth: 2,
                            },
                        })}
                        fullWidth
                        margin="dense"
                        id="inputField"
                        name="inputText"
                        label="Nome do grupo"
                        placeholder='Digite o nome do grupo'
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errorMessage}
                        helperText={errorMessage}
                    />
                </DialogContent>
                <div className='flex justify-center items-center mb-4'>
                    <Switch
                        checked={checked}
                        onChange={handleToggle}
                        className='self-center'
                    />
                    <label className='self-center'>{`${checked ? 'Ativo' : 'Inativo'}`}</label>
                </div>
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button onClick={handleClose} disableElevation>Cancelar</Button>
                    <Button
                        onClick={putMethod ? handleEditGroup : handleCreateGroup}
                        variant="contained"
                        sx={{
                            bgcolor: (theme) => theme.palette.primary.main + " !important",
                            color: (theme) => theme.palette.primary.contrastText + " !important",
                            "&:hover": {
                                bgcolor: (theme) => theme.palette.primary.dark + " !important",
                            }
                        }}
                        disableElevation
                    >
                        {putMethod ? 'Salvar' : 'Criar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}