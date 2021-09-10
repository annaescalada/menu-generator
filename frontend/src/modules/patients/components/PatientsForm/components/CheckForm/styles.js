import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    expand: {
        marginTop: '2em',
        width: '100%'
    },
    panel: {
        padding: '1em',
        border: 'none'

    },
    icon: {
        marginRight: '0.2em',
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    add: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    button: {
        color: 'white',
        margin: '1em'
    },
    deleteIcon: {
        color: 'white'
    },
    chip: {
        margin: '1em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    },
}))