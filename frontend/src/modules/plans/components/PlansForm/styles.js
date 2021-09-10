import { makeStyles } from "@material-ui/core"

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
    titleContainer: {
        padding: '1em'
    }
}))