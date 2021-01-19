import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#42A678',
    },
    secondary: {
      main: '#FFF',
    },
  },
  props: {
    MuiInputLabel: {
      shrink: true,
    },

    MuiInput: {
      disableUnderline: true,
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
      },
    },
    MuiInput: {
      root: {
        height: '47px',
        border: '1px solid #C6C6C6',
        borderRadius: '5px',
        background: '#FFF',
        boxSizing: 'border-box',
        padding: '5px',
        '&$focused': {
          border: `2px solid #42A678`,
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: '1.5rem',
        fontfamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 0,
      },
    },
  },
});
