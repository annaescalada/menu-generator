import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Typography, makeStyles, Fab, Chip, Button, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import TextInput from '../../components/shared/TextInput.js';
import EditableInput from '../../components/shared/EditableInput.js';


const useStyles = makeStyles((theme) => ({
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
}))

const MenuForm = ({ menu, setMenu, handleClick, error }) => {
    const classes = useStyles()


    return <Paper className={classes.container}>
        <TextInput
            label="Name"
            value={menu.name}
            onChange={(v) => setMenu(prev => ({ ...prev, name: v }))}
            required
            error={error && !menu.name}
        />
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>

    </Paper>
}

export default MenuForm

