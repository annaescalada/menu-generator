import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        primary: {
            extraMegaLight: '#33ab9f14', 
            extraLight: '#33ab9f61', 
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
        },
        secondary: {
            extraLight: '#fff4f8',
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#000',
        },
    }
})
export default theme