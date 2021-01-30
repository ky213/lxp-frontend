import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from 'Components';

const AddEdit = props => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Title" type="text" fullWidth />
        </DialogContent>
        <DialogActions disableSpacing>
          <Button variant="contained" color="primary" onClick={props.handleClose}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEdit;

AddEdit.propsTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
