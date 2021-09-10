import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        margin: '3em 1em 1em 1em',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'

    },
    chip: {
        margin: '0.2em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    divider: {
        margin: '3em 0'
    }
}))