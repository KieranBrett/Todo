import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';

import firebase from "@firebase/app"

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button color="secondary" size="small" variant="contained" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Delete List
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        WARNING: This can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        props.db.collection('lists').doc(props.list_id).collection('todo').get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                doc.ref.delete();
                            });
                        });

                        props.db.collection("lists").doc(props.list_id).delete()
                        handleClose();
                    }} color="secondary" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteButton
