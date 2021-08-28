import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
        margin: '3em'
    },
    button: {
        color: 'white',
        margin: '1em'
    },
    text: {
        marginLeft: '1em',
        marginTop: '1em',
        color: theme.palette.secondary.dark
    }
}))