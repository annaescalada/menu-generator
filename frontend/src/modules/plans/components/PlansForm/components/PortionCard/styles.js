import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        margin: '1em',
        padding: '1.5em',
        backgroundColor: theme.palette.primary.extraMegaLight,
        borderRadius: '20px',
    },
    icon: {
        color: 'white'
    },
    img: {
        height: '3em',
        marginLeft: '1.5em'
    },
    lowOpacity: {
        opacity: '20%'
    }
}))