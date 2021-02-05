import { createMuiTheme } from '@material-ui/core/styles';

import { colors } from './Colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
      main: colors.info,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
    MuiInputLabel: {
      shrink: true,
      disableRipple: true,
    },

    MuiInput: {
      disableUnderline: true,
    },
    MuiCheckbox: {
      disableRipple: true,
    },
    MuiRadio: {
      color: colors.info,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        width: '146px',
        height: '44px',
        borderRadius: '56px',
        fontWeight: '400',
        fontSize: '16px',
        textTransform: 'none',
        margin: '1px 5px',
      },
    },
    MuiTextField: {
      root: {
        marginBottom: '22px',
      },
    },
    MuiInput: {
      root: {
        height: '47px',
        border: '1px solid #C6C6C6',
        borderRadius: '5px',
        background: '#FFF',
        boxSizing: 'border-box',
        paddingLeft: '5px',
        paddingRight: '5px',
        fontSize: '18px',
        '&$focused': {
          border: `2px solid #42A678`,
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: '1.4rem',
        fontfamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 0,
      },
    },
    MuiRadio: {
      root: {
        color: colors.info,
      },
    },
  },
});
