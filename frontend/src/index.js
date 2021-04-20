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
import Recipes from './pages/recipes/Recipes';
import Menus from './pages/menus/Menus';
import Patients from './pages/patients/Patients';

import GruposAlimentosRaciones from './pages/patients/GruposAlimentosRaciones';
import Plans from './pages/plans/Plans';
import MenuBase from './pages/plans/MenuBase';
import RecipeBook from './pages/recipes/RecipeBook';
import MenuGrid from './pages/menus/MenuGrid';
import GroceryList from './pages/menus/GroceryList';
import MealPrep from './pages/menus/MealPrep';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <FeedbackProvider>
                <ThemeProvider theme={theme}>
                    <App>
                        <PrivateRoute path='/meal-prep' component={MealPrep} />
                        <PrivateRoute path='/grocery-list' component={GroceryList} />
                        <PrivateRoute path='/menu-grid' component={MenuGrid} />
                        <PrivateRoute path='/recipe-book' component={RecipeBook} />
                        <PrivateRoute path='/menu-base' component={MenuBase} />
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
