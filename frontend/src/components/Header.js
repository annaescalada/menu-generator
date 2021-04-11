import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router"

import MenuIcon from '@material-ui/icons/Menu'

import { AuthContext } from '../contexts/auth';
import authService from '../services/auth';
import { unauthorize } from '../services/api';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    button: {
        color: 'white',
        margin: theme.spacing(4)
    }
}))


const Header = (props) => {
    const path = props.history.location.pathname

    const isHidden = ['/grupos-alimentos-raciones'].some(route => path.includes(route))
    // const isHidden = false

    const classes = useStyles()

    const { isLoggedIn, logOut } = useContext(AuthContext)

    const [openMenu, setOpenMenu] = useState(false)

    const handleLogout = async () => {
        try {
            await authService.logout()
            logOut()
            unauthorize()
            setOpenMenu(false)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    return isHidden ? null : <AppBar position="static">
        <Toolbar className={classes.header}>
            {isLoggedIn && <>
                <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/patients'>Pacientes</Link></MenuItem>
                <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/ingredients'>Ingredientes</Link></MenuItem>
                <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/recipes'>Recetas</Link></MenuItem>
                <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/menus'>Menus</Link></MenuItem>
                <Button className={classes.button} color="secondary" variant="contained" onClick={handleLogout}>Log out</Button>
            </>}
        </Toolbar>
    </AppBar>
}

export default withRouter(Header)