import React from 'react'
import { Divider, Typography, Button } from '@material-ui/core'
import AutocompleteInput from '../AutocompleteInput'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'

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