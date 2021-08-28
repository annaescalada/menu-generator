import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    search: {
        margin: '2em'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2em'
    },
    delete: {
        marginLeft: '1em'
    },
    deleteIcon: {
        color: 'white'
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    }
}))