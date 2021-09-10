import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './components/App'

import AuthProvider from './contexts/auth'
import FeedbackProvider from './contexts/feedback'

import theme from './styles/theme'

import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login/Login'
import Ingredients from './modules/ingredients/Ingredients'
import Recipes from './modules/recipes/Recipes'
import Menus from './modules/menus/Menus'
import Patients from './modules/patients/Patients'

import GruposAlimentosRaciones from './modules/patients/components/GruposAimentosRaciones/GruposAlimentosRaciones'
import Plans from './modules/plans/Plans'
import PlanBase from './modules/plans/components/PlanBase/PlanBase'
import RecipeBook from './modules/recipes/components/RecipeBook/RecipeBook'
import MenuGrid from './modules/menus/components/MenuGrid'
import ListaCompra from './modules/menus/components/ListaCompra'
import MealPrep from './modules/menus/components/MealPrep'

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <FeedbackProvider>
                <ThemeProvider theme={theme}>
                    <App>
                        <PrivateRoute path='/meal-prep' component={MealPrep} />
                        <PrivateRoute path='/grocery-list' component={ListaCompra} />
                        <PrivateRoute path='/menu-grid' component={MenuGrid} />
                        <PrivateRoute path='/recipe-book' component={RecipeBook} />
                        <PrivateRoute path='/menu-base' component={PlanBase} />
                        <PrivateRoute path='/grupos-alimentos-raciones' component={GruposAlimentosRaciones} />
                        <PrivateRoute path='/menus' component={Menus} />
                        <PrivateRoute path='/recipes' component={Recipes} />
                        <PrivateRoute path='/ingredients' component={Ingredients} />
                        <PrivateRoute path='/plans' component={Plans} />
                        <PrivateRoute path='/patients' component={Patients} />
                        <PublicRoute exact path='/' component={Login} />
                    </App>
                </ThemeProvider>
            </FeedbackProvider>
        </AuthProvider>
    </BrowserRouter>, document.querySelector('#root'))
