import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        margin: '2em'
    },
    divider: {
        margin: '3em'
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
}))