import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Typography, makeStyles, Fab, Chip, Button, Paper } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import AddIcon from '@material-ui/icons/Add'
import { config } from './planConfig'

import PortionCard from './PortionCard';
import TextInput from '../../components/shared/TextInput';
import EditableInput from '../../components/shared/EditableInput';


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

const PlansForm = ({ plan, setPlan, handleClick, error }) => {
    const classes = useStyles()

    const { defaultMeals, defaultPlan, portionMacros } = config

    const [macros, setMacros] = useState({})

    const onDragEnd = value => {
        const { destination, source } = value

        if (!destination) return

        const newDistribution = _.cloneDeep(plan.distribution)

        const draggedItem = newDistribution[source.index]

        newDistribution.splice(source.index, 1)

        newDistribution.splice(destination.index, 0, draggedItem)

        setPlan({
            ...plan,
            distribution: newDistribution
        })
    }

    const handleChange = (v, key, index) => {
        const newDistribution = _.cloneDeep(plan.distribution)

        newDistribution[index] = {
            ...newDistribution[index],
            [key]: v
        }

        setPlan({
            ...plan,
            distribution: newDistribution
        })
    }

    const handleDelete = (index) => {
        const newDistribution = _.cloneDeep(plan.distribution)

        newDistribution.splice(index, 1)

        setPlan({
            ...plan,
            distribution: newDistribution
        })
    }

    const setMeal = (type, index) => {
        const newDistribution = _.cloneDeep(plan.distribution)

        newDistribution[index] = {
            ...newDistribution[index],
            ...defaultMeals[defaultPlan, type]
        }

        setPlan({
            ...plan,
            distribution: newDistribution
        })
    }

    const calculateMacros = () => {
        const totalPortions = plan.distribution ?.reduce((acc, meal) => {
            return {
                carbs: +acc.carbs + +meal.carbs,
                proteins: +acc.proteins + +meal.proteins,
                fats: +acc.fats + +meal.fats,
                dairy: +acc.dairy + +meal.dairy,
                omega3: +acc.omega3 + +meal.omega3,
                fruit: +acc.fruit + +meal.fruit,
                berries: +acc.berries + +meal.berries
            }
        }, {
                carbs: 0,
                proteins: 0,
                fats: 0,
                dairy: 0,
                omega3: 0,
                fruit: 0,
                berries: 0
            })

        const groups = Object.keys(totalPortions || {})

        const total = {
            carbs: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].carbs, 0),
            proteins: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].proteins, 0),
            fats: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].fat, 0)
        }

        return {
            ...total,
            kcal: (total.carbs * 4 + total.proteins * 4 + total.fats * 9)
        }
    }

    useEffect(() => {
        setMacros(calculateMacros())
    }, [plan.distribution])

    return <Paper className={classes.container}>
        <div style={{ padding: '1em' }}>
            <TextInput
                label="Name"
                value={plan.name}
                onChange={(v) => setPlan(prev => ({ ...prev, name: v }))}
                required
                error={error && !plan.name}
            />
            <div className={classes.chipContainer}>
                {[{
                    label: `Total Kcal: ${macros ?.kcal ?.toFixed(1)} kcal`,
                    color: 'primary'
                },
                {
                    label: `Carbs: ${macros.carbs}g (${((macros.carbs * 4 / macros.kcal) * 100).toFixed(2)}%)`
                },
                {
                    label: `Proteins: ${macros.proteins}g (${((macros.proteins * 4 / macros.kcal) * 100).toFixed(2)}%)`
                },
                {
                    label: `Fats: ${macros.fats}g (${((macros.fats * 9 / macros.kcal) * 100).toFixed(2)}%)`
                }].map(({ label, color }) => <Chip className={classes.chip} label={label} color={color ? color : 'secondary'} />)}
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
                            {plan.distribution ?.map((meal, index) => <PortionCard
                                key={meal._id}
                                classes={classes}
                                meal={meal}
                                index={index}
                                setMeal={setMeal}
                                handleChange={handleChange}
                                handleDelete={handleDelete}
                            />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Fab className={classes.add} size='medium' color="primary" aria-label="add" onClick={() => setPlan(prev => ({
                ...prev,
                distribution: [...prev.distribution, {}]
            }))}>
                <AddIcon />
            </Fab>
            <Typography variant='h6' align='center' color='primary'>Recomendaciones</Typography>
            <EditableInput
                value={plan.recommendations || ''}
                onChange={(v) => setPlan(prev => ({ ...prev, recommendations: v }))}
            />
            <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
        </div>
    </Paper>
}

export default PlansForm

