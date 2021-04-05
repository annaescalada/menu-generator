import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './components/App'
import AuthProvider from './contexts/auth'
import Login from './pages/Login'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Ingredients from './pages/ingredients/Ingredients'
import theme from './theme';
import FeedbackProvider from './contexts/feedback';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <FeedbackProvider>
                <ThemeProvider theme={theme}>
                    <App>
                        <PrivateRoute path='/ingredients' component={Ingredients} />
                        <PublicRoute path='/' component={Login} />
                    </App>
                </ThemeProvider>
            </FeedbackProvider>
        </AuthProvider>
    </BrowserRouter>, document.querySelector('#root'))
