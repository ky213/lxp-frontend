import React from 'react';
import { connect } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { IconButton, CloseIcon } from 'Components';

const Snack = ({ success, error }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log('Snacking', success, error);
  if (success || error)
    enqueueSnackbar(success ? 'Success' : error, {
      variant: success ? 'success' : 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      action: key => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <CloseIcon />
        </IconButton>
      ),
    });
  return null;
};

const Provider = ({ success, error, children }) => {
  return (
    <SnackbarProvider style={{ zIndex: 999999999999999999999999999 }}>
      <Snack success={success} error={error} />
      {children}
    </SnackbarProvider>
  );
};

const mapStateToProps = state => ({
  success: state.global.success,
  error: state.global.error,
});

export default connect(mapStateToProps)(Provider);
