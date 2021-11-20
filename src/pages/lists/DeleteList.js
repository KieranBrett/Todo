import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { doc, setDoc, addDoc, deleteDoc, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from '@firebase/auth';

export default function DeleteList(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const db = getFirestore();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        deleteDoc(doc(db, 'lists', props.list_id))

        setOpen(false);
    };

    const _handleChange = (event) => {
        setName(event.target.value);
    }

    return (
        <>
            <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete list</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your list will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
