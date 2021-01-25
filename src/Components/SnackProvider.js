import React from 'react';
import { connect } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { IconButton, CloseIcon } from 'Components';

const Snack = ({ success, error }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log('Snacking##############');
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
    <SnackbarProvider>
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
