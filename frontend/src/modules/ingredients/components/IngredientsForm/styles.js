import { makeStyles } from '@material-ui/core'

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
    isComplex: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
}))