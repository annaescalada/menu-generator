import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Paper, Fab, Typography, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import IngredientsForm from './IngredientsForm'
import ingredientsService from '../../services/ingredients';
import sharedService from '../../services/shared';
import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';

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

const Ingredients = () => {
  const classes = useStyles()

  const ingredientDefault = {
    name: '',
    portion: 0
  }

  const { message, setMessage } = useContext(FeedbackContext)

  const [enums, setEnums] = useState()
  const [allIngredients, setAllIngredients] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [ingredient, setIngredient] = useState(ingredientDefault)

  const getData = async () => {
    try {
      const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
      setEnums(retrievedEnums)

      const { data: { ingredients: retrievedIngredients} } = await ingredientsService.getAllIngredients()
      setAllIngredients(retrievedIngredients)
    } catch (e) {
      console.log(e ?.response ?.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log('ingredient==>', ingredient)

  const handleSave = async () => {
    try {
      await ingredientsService.create(ingredient)
      setIngredient()
      setIsFormOpen(false)
      getData()

      setMessage('Ingredient created')
    } catch (e) {
      setMessage('Error creating ingredient')
    }
  }

  const handleEdit = async () => {
    try {
      await ingredientsService.edit(ingredient._id, ingredient)
      setIngredient(ingredientDefault)
      setIsFormOpen(false)
      getData()

      setMessage('Ingredient updated')
    } catch (e) {
      setMessage('Error editing ingredient')
    }
  }

  const handleDelete = async () => {
    try {
      await ingredientsService.delete(ingredient._id)
      setIngredient(ingredientDefault)
      setIsFormOpen(false)
      getData()

      setMessage('Ingredient deleted')
    } catch (e) {
      setMessage('Error deleting ingredient')
    }
  }

  return allIngredients ? <>
    <div className={classes.search}>
      <AutocompleteInput
        label='Buscar ingrediente'
        onChange={(v) => { setIngredient(v || {}); setIsFormOpen(Boolean(v)) }}
        getOptionLabel={option => `${option.name}`}
        options={allIngredients}
        variant='outlined'
      />
    </div>
    <div className={classes.container}>
      <Fab color="primary" aria-label="add" onClick={() => {
        setIngredient(ingredientDefault);
        setIsFormOpen(!isFormOpen);
      }}>
        {isFormOpen
          ? <Close />
          : <AddIcon />}
      </Fab>
      {ingredient._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
        <DeleteIcon className={classes.deleteIcon} />
      </Fab>}
    </div>
    {isFormOpen && <IngredientsForm
      ingredient={ingredient}
      setIngredient={setIngredient}
      handleClick={ingredient._id ? handleEdit : handleSave}
      error={message}
      allIngredients={allIngredients}
      enums={enums}
    />}
  </> : <Loading />
}

export default Ingredients