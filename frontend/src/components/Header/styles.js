import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.dark
    },
    active: {
        color: 'white',
    },
    button: {
        color: 'white',
        margin: theme.spacing(4)
    }
}))