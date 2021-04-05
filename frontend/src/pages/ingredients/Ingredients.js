import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Paper, Fab, Typography, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import IngredientsForm from './IngredientsForm'
import ingredientsService from '../../services/ingredients';
import AutocompleteInput from '../../components/shared/AutocompleteInput';
import Feedback from '../../components/Feedback';
import { FeedbackContext } from '../../contexts/feedback';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2em',
    padding: '2em'

  },
  button: {
    color: 'white',
    margin: '1em'
  }
}))

const Ingredients = () => {
  const classes = useStyles()

  const { message, setMessage } = useContext(FeedbackContext)

  const [allIngredients, setAllIngredients] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [ingredient, setIngredient] = useState({})

  const getData = async () => {
    try {
      const { data } = await ingredientsService.getAllIngredients()
      setAllIngredients(data.ingredients)
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
      setMessage('Ingredient created')
      setIsFormOpen(false)
      setIngredient({})
      getData()
    } catch (e) {
      setMessage('Error creating ingredient')
    }
  }

  const handleEdit = async () => {
    try {
      await ingredientsService.edit(ingredient._id, ingredient)
      setMessage('Ingredient updated')
      setIsFormOpen(false)
      setIngredient({})
      getData()
    } catch (e) {
      setMessage('Error editing ingredient')
    }
  }

  const handleDelete = async () => {
    try {
      await ingredientsService.delete(ingredient._id)
      setMessage('Ingredient deleted')
      setIsFormOpen(false)
      setIngredient({})
      getData()
    } catch (e) {
      setMessage('Error deleting ingredient')
    }
  }

  return allIngredients ? <>
    <AutocompleteInput
      onChange={(v) => { setIngredient(v || {}); setIsFormOpen(Boolean(v)) }}
      required={true}
      getOptionLabel={option => `${option.name}`}
      options={allIngredients}
    />
    {}
    <Paper className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Fab color="primary" aria-label="add" onClick={() => {
          setIngredient({});
          setIsFormOpen(!isFormOpen);
        }}>
          {isFormOpen
            ? <Close />
            : <AddIcon />}
        </Fab>
        {ingredient._id && <Fab style={{ marginLeft: '1em' }} color="secondary" onClick={handleDelete}>
          <DeleteIcon style={{ color: 'white', }} />
        </Fab>}
      </div>
      {
        isFormOpen && <IngredientsForm
          ingredient={ingredient}
          setIngredient={setIngredient}
          handleClick={ingredient._id ? handleEdit : handleSave}
          error={message}
          allIngredients={allIngredients}
        />
      }
    </Paper >
  </> : <p>Cargando...</p>
}

export default Ingredients