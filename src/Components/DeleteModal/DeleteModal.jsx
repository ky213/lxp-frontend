import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { colors } from 'Themes/Colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import sheild from 'Assets/Images/shield.svg';

const DeleteModal = props => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <img src={sheild} alt="alert_shield" style={{ display: 'block', margin: 'auto' }} />
      </DialogContent>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => props.onClose('ok')}
          variant="contained"
          size="large"
          style={{ backgroundColor: colors.error, color: 'white' }}
        >
          Delete
        </Button>
        <Button onClick={() => props.onClose('cancel')} variant="contained" color="primary" size="large" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
};
