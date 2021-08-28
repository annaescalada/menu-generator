import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        margin: '1em'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'

    },
    subContainer: {
        justifyContent: 'center',
        display: 'flex',
        padding: '1em',
        flexWrap: 'wrap'
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
    },
    ingredientContainer: {
        display: 'flex',
        borderRadius: '10px',
        flexDirection: 'column',
        margin: '1em',
        padding: '2em',
        background: theme.palette.primary.extraMegaLight,
        color: theme.palette.primary.main,
    },
    filter: {
        margin: '0.8em',
        padding: '1.5em',
        width: '3em',
        background: theme.palette.primary.extraMegaLight,
        "&:hover": {
            background: theme.palette.primary.extraLight,
        }
    },
    active: {
        background: theme.palette.primary.extraLight,
    },
    required: {
        borderBottom: `${theme.palette.primary.light} 5px solid`,
    },
    input: {
        background: theme.palette.primary.extraLight,
        borderRadius: '20px',
        padding: '0em',
        margin: '0.5em'
    },
    chip: {
        margin: '0.2em',
        color: 'white',
        padding: '0.5em'
    },
    img: {
        height: '3em',
        marginTop: '0em'
    },
}))