import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '1em',
        padding: '1em'
    },
    chip: {
        margin: '0.5em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    },
    button: {
        color: 'white',
        margin: '3em 1em 1em 1em',
        display: 'block',
        width: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'
    },
    menuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    day: {
        background: theme.palette.primary.extraLight,
        padding: '1em',
        margin: '1em',
        borderRadius: '15px',
        minWidth: '20%',
        maxWidth: '29%'
    },
    meal: {
        padding: '1em',
        margin: '1em',
        borderRadius: '15px',
        background: theme.palette.secondary.extraLight
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
    topButtons: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}))
