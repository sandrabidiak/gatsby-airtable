import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    props: {
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
        },
        MuiToolbar: {
            variant: 'dense',
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#EEEEEE',
        },
        secondary: {
            main: '#801313',
        },
        background: {
            default: '#151515',
        },

    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    backgroundColor: '#000000'
                },
                body: {
                    backgroundColor: '#000000'
                }
            }
        }, 
        MuiDivider: {
            root: {
                backgroundColor: '#7c7c7c'
            }
        }   
    },
    typography: {
        fontSize: 14,
        fontFamily: 'Libre Franklin, sans-serif'
    },
})

export default theme