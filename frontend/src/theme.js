import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        primary: {
            extraLight: '#33ab9f47', 
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#000',
        },
    }
})
export default theme