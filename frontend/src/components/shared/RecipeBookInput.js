import React from 'react'
import { Divider, Typography, Button } from '@material-ui/core';
import AutocompleteInput from './AutocompleteInput';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '2em'
    },
    divider: {
        margin: '3em'
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
}))

const RecipeBookInput = ({ selectedRecipes, setSelectedRecipes, options }) => {
    const classes = useStyles()

    return <>
        <Divider className={classes.divider} />
        <div className={classes.container}>
            <Typography align='center' variant='h5' color='primary'>Recipe Book</Typography>
            <AutocompleteInput
                value={selectedRecipes || []}
                onChange={(v) => setSelectedRecipes(v)}
                multiple
                getOptionLabel={option => `${option.name}`}
                options={options}
            />
            <Link className={classes.link} to={`/recipe-book`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Listado de recetas</Button>
            </Link>
        </div>
    </>
}

export default RecipeBookInput