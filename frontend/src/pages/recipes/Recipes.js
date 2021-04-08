import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Paper, Fab, Typography, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import sharedService from '../../services/shared';
import ingredientsService from '../../services/ingredients';
import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';
import recipesService from '../../services/recipes';
import RecipesForm from './RecipesForm';

const useStyles = makeStyles((theme) => ({
    search: {
        margin: '2em'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2em'
    },
    delete: {
        marginLeft: '1em'
    },
    deleteIcon: {
        color: 'white'
    }
}))

const Recipes = () => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)

    const [enums, setEnums] = useState()
    const [allIngredients, setAllIngredients] = useState(false)
    const [allRecipes, setAllRecipes] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [recipe, setRecipe] = useState({})

    const getRecipes = async () => {
        try {
            const { data: { recipes: retrievedRecipes } } = await recipesService.getAllRecipes()
            setAllRecipes(retrievedRecipes)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    const getData = async () => {
        try {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            getRecipes()

            const { data: { ingredients: retrievedIngredients } } = await ingredientsService.getAllIngredients()
            setAllIngredients(retrievedIngredients)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('recipe==>', recipe)

    const handleSave = async () => {
        try {
            await recipesService.create(recipe)
            setRecipe({})
            setIsFormOpen(false)
            getRecipes()

            setMessage('Recipe created')
        } catch (e) {
            setMessage('Error creating recipe')
        }
    }

    const handleEdit = async () => {
        try {
            await recipesService.edit(recipe._id, recipe)
            setRecipe({})
            setIsFormOpen(false)
            getRecipes()

            setMessage('Recipe updated')
        } catch (e) {
            setMessage('Error editing recipe')
        }
    }

    const handleDelete = async () => {
        try {
            await recipesService.delete(recipe._id)
            setRecipe({})
            setIsFormOpen(false)
            getRecipes()

            setMessage('Recipe deleted')
        } catch (e) {
            setMessage('Error deleting recipe')
        }
    }

    return allIngredients && allRecipes ? <>
        <div className={classes.search}>
            <AutocompleteInput
                label='Buscar receta'
                onChange={(v) => { setRecipe(v || {}); setIsFormOpen(Boolean(v)) }}
                getOptionLabel={option => `${option.name}`}
                options={allRecipes}
                variant='outlined'
            />
        </div>
        <div className={classes.container}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setRecipe({});
                setIsFormOpen(!isFormOpen);
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {recipe._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>}
        </div>
        {isFormOpen && <RecipesForm
            recipe={recipe}
            setRecipe={setRecipe}
            handleClick={recipe._id ? handleEdit : handleSave}
            error={message}
            allRecipes={allRecipes}
            allIngredients={allIngredients}
            enums={enums}
        />}
    </> : <Loading />
}

export default Recipes