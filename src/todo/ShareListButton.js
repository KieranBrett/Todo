import React, { useState } from 'react';

import EmailForm from './EmailForm';

// MUI
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

function ShareListButton(props) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(null);
  };

  return <><Button onClick={() => { setOpen(!open) }} color="primary" size="small" variant="contained">
    Share
  </Button>

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Share List
      </DialogTitle>

      <DialogContent>
        <EmailForm list_id={props.list_id} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Exit
        </Button>

      </DialogActions>
    </Dialog>
  </>
}

export default ShareListButton