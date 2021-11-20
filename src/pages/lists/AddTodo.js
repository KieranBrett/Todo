import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { doc, setDoc, addDoc, updateDoc, arrayUnion, getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from '@firebase/auth';

export default function AddTodo(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const db = getFirestore();
    const auth = getAuth();
    const colRef = collection(db, "lists");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        updateDoc(doc(db, 'lists', props.list_id), {
            todo: arrayUnion(name)
        })

        setName('')
        setOpen(false);
    };

    const _handleChange = (event) => {
        setName(event.target.value);
    }

    return (
        <>
            <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                <AddCircleIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your new Todo.
                    </DialogContentText>
                    <TextField
                        onChange={_handleChange}
                        value={name}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Todo"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
