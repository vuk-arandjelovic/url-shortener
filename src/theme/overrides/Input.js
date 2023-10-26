import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled,
            },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
          '&:after': {
            borderBottomColor: theme.palette.text.primary,
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { background: 'filled' },
          style: {
            '.MuiInputBase-formControl': {
              background: theme.palette.common.white,
            },
          },
        },
        {
          props: { background: 'filled-dark' },
          style: {
            '.MuiInputBase-formControl': {
              background: theme.palette.grey['800'],
              color: theme.palette.grey['100'],
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: `${theme.palette.grey['500']}`,
              },
              '&:not(.Mui-disabled):hover': {
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: `${theme.palette.grey['100']}`,
                },
              },
              '&.Mui-error': {
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: `${theme.palette.error.main} !important`,
                },
                '&.Mui-focused': {
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: `${theme.palette.error.main} !important`,
                  },
                },
              },
              '&.Mui-disabled': {
                borderColor: `${theme.palette.grey['100']} !important`,
                '&.Mui-focused': {
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: `${theme.palette.grey['100']} !important`,
                  },
                },
              },
              '&.Mui-focused': {
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: `${theme.palette.grey['100']}`,
                },
              },
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before, :after': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.text.primary,
            },
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
