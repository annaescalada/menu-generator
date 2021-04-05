import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'

import { AuthContext } from '../contexts/auth';
import authService from '../services/auth';
import { unauthorize } from '../services/api';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    button: {
        color: 'white',
        margin: theme.spacing(4)
    }
}))


const Header = (props) => {
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
            console.log(e?.response?.data)
        }
    }

    return <AppBar position="static">
        <Toolbar>
            {isLoggedIn && <>
                <IconButton onClick={() => setOpenMenu(true)}>
                    <MenuIcon style={{ color: 'white'}} />
                </IconButton>
                <Typography variant="h6">VOWLS (menu generator)</Typography>
                <Menu
                    open={openMenu}
                    onClose={() => setOpenMenu(false)}
                >
                    <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/ingredients'>Ingredients</Link></MenuItem>
                    <MenuItem onClick={() => setOpenMenu(false)}><Link className={classes.link} to='/menus'>Menus</Link></MenuItem>
                    <Button className={classes.button} color="secondary" variant="contained" onClick={handleLogout}>Log out</Button>
                </Menu>
            </>}
        </Toolbar>
    </AppBar>
}

export default Header