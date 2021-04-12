import React, { useState } from 'react'
import _ from 'lodash'
import { Typography, Paper, makeStyles, Fab, Grid, Chip } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TextInput from '../../components/shared/TextInput'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import RestaurantIcon from '@material-ui/icons/Restaurant';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: '1em',
        padding: '0.8em'
    },
    icon: {
        color: 'white'
    },
    chipContainer: {
        display: 'flex',
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
}))

const PortionDistribution = ({ patient, setPatient, handleClick }) => {
    const classes = useStyles()

    const onDragEnd = value => {
        const { destination, source, draggableId } = value

        if (!destination) return

        const copyOfPortionDistribution = _.cloneDeep(patient.portionDistribution)

        const draggedMeal = copyOfPortionDistribution[source.index]

        copyOfPortionDistribution.splice(source.index, 1)

        copyOfPortionDistribution.splice(destination.index, 0, draggedMeal)

        setPatient({
            ...patient,
            portionDistribution: copyOfPortionDistribution
        })
    }

    const handleChange = (v, key, index) => {
        const copyOfPortionDistribution = _.cloneDeep(patient.portionDistribution)

        copyOfPortionDistribution[index] = {
            ...copyOfPortionDistribution[index],
            [key]: v
        }

        setPatient({
            ...patient,
            portionDistribution: copyOfPortionDistribution
        })
    }

    const handleDelete = (index) => {
        const copyOfPortionDistribution = _.cloneDeep(patient.portionDistribution)

        copyOfPortionDistribution.splice(index, 1)

        setPatient({
            ...patient,
            portionDistribution: copyOfPortionDistribution
        })
    }

    const setMeal = (type, index) => {
        const copyOfPortionDistribution = _.cloneDeep(patient.portionDistribution)

        const groups = {
            breakfast: {
                carbs: 1,
                proteins: 0,
                veggies: 0,
                fats: 1,
                dairy: 1,
                omega3: 1,
                fruit: 2,
                berries: 1,
            },
            lunch: {
                carbs: 1,
                proteins: 0,
                veggies: 0,
                fats: 1,
                dairy: 1,
                omega3: 1,
                fruit: 2,
                berries: 1,
            },
            snack: {
                carbs: 1,
                proteins: 0,
                veggies: 0,
                fats: 1,
                dairy: 0,
                omega3: 0,
                fruit: 1,
                berries: 0,
            }
        }

        copyOfPortionDistribution[index] = {
            ...copyOfPortionDistribution[index],
            ...groups[type]
        }

        setPatient({
            ...patient,
            portionDistribution: copyOfPortionDistribution
        })

    }

    return <div style={{ padding: '1em' }}>
        <Typography variant='h6' align='center' color='primary'>Reparticiones de raciones</Typography>
        <div className={classes.chipContainer}>
            <Chip className={classes.chip} label='Total Kcal:' color='primary' />
            <Chip className={classes.chip} label='Carbs:' color='secondary' />
            <Chip className={classes.chip} label='Proteins:' color='secondary' />
            <Chip className={classes.chip} label='Fats:' color='secondary' />
        </div>
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId='reparticionRacionesId'>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {patient.portionDistribution ?.map((meal, index) => <Draggable
                            draggableId={meal._id}
                            index={index}
                        >
                            {(provided) => (
                                <Paper
                                    className={classes.container}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Grid container>
                                        <Grid item xs={6}><TextInput value={meal.name} onChange={(v) => handleChange(v, 'name', index)} /></Grid>
                                        <Grid item xs={5}><TextInput value={meal.time} onChange={(v) => handleChange(v, 'time', index)} /></Grid>
                                        <Grid item xs={1}><Fab color="secondary" size='medium' onClick={() => handleDelete(index)}>
                                            <DeleteIcon className={classes.icon} />
                                        </Fab></Grid>
                                    </Grid>
                                    <Grid spacing={2} alignItems='center' container>
                                        {['carbs', 'proteins', 'veggies', 'fats', 'omega3', 'fruit', 'berries', 'dairy'].map(key => <Grid item xs={1}>
                                            <TextInput type='number' label={key} value={meal[key] || 0} onChange={(v) => handleChange(v, key, index)} />
                                        </Grid>)}
                                        <Grid item><Fab variant='extended' size='small' color="primary" onClick={() => setMeal('breakfast', index)}>Desayuno</Fab></Grid>
                                        <Grid item><Fab variant='extended' size='small' color="primary" onClick={() => setMeal('lunch', index)}>Comida</Fab></Grid>
                                        <Grid item><Fab variant='extended' size='small' color="primary" onClick={() => setMeal('snack', index)}>Snack</Fab></Grid>
                                    </Grid>
                                </Paper>
                            )}
                        </Draggable>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <Fab className={classes.add} size='medium' color="primary" aria-label="add" onClick={() => setPatient(prev => ({
            ...prev,
            portionDistribution: [...prev.portionDistribution, {}]
        }))}>
            <AddIcon />
        </Fab>
    </div>

}

export default PortionDistribution