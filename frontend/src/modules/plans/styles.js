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
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        margin: '2em'
    },
}))