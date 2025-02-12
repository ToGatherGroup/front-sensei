"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalDialog() {
    const [open, setOpen] = React.useState(false);

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
            <Dialog open={true} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
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
                        />
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'space-around' }}>
                        <Button onClick={handleClose} disableElevation  sx={{ color: 'red' }}>Cancelar</Button>
                        <Button type="submit" variant='contained' disableElevation>Criar Grupo</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}