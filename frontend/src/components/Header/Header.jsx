import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, AppBar, Toolbar, MenuItem } from '@material-ui/core';
import { withRouter } from "react-router"

import authService from '../../services/auth'
import { AuthContext } from '../../contexts/auth'
import { unauthorize } from '../../services/api' 
import { useStyles } from './styles'

const Header = (props) => {
    const path = props.history.location.pathname

    const isHidden = ['/grupos-alimentos-raciones', 'menu-base', 'recipe-book', 'menu-grid', 'grocery-list', 'meal-prep'].some(route => path.includes(route))

    const classes = useStyles()

    const { isLoggedIn, logOut } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            await authService.logout()
            logOut()
            unauthorize()
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    return isHidden ? null : <AppBar position="static">
        <Toolbar className={classes.header}>
            {isLoggedIn && <>
                <MenuItem><NavLink activeClassName={classes.active} className={classes.link} to='/patients'>Pacientes</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName={classes.active} className={classes.link} to='/plans'>Plans</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName={classes.active} className={classes.link} to='/ingredients'>Ingredientes</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName={classes.active} className={classes.link} to='/recipes'>Recetas</NavLink></MenuItem>
                <MenuItem><NavLink activeClassName={classes.active} className={classes.link} to='/menus'>Menus</NavLink></MenuItem>
                <Button className={classes.button} color="secondary" variant="contained" onClick={handleLogout}>Log out</Button>
            </>}
        </Toolbar>
    </AppBar>
}

export default withRouter(Header)