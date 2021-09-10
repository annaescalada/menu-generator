import React from 'react'
import _ from 'lodash'
import { Typography, Button, Paper, Fab } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import AddIcon from '@material-ui/icons/Add'

import PortionCard from './components/PortionCard/PortionCard'
import TextInput from '../../../../components/shared/TextInput'
import EditableInput from '../../../../components/shared/EditableInput'
import { useStyles } from './styles'
import { onDragEnd, handleChange, handleDelete, setMeal } from './helpers';
import PlansChips from './components/PlansChips/PlansChips';


const PlansForm = ({ plan, setPlan, handleClick, enums, error }) => {
    const classes = useStyles()

    console.log(plan)

    return <Paper className={classes.container}>
        <div className={classes.titleContainer}>
            <TextInput
                label="Name"
                value={plan.name}
                onChange={(v) => setPlan(prev => ({ ...prev, name: v }))}
                required
                error={error && !plan.name}
            />
            <PlansChips plan={plan} />
            <DragDropContext
                onDragEnd={(value) => onDragEnd(value, plan, setPlan)}
            >
                <Droppable droppableId='reparticionRacionesId'>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {plan.distribution ?.map((meal, index) => (
                                <PortionCard
                                    key={meal._id}
                                    classes={classes}
                                    meal={meal}
                                    index={index}
                                    enums={enums}
                                    setMeal={setMeal(plan, setPlan)}
                                    handleChange={handleChange(plan, setPlan)}
                                    handleDelete={handleDelete(plan, setPlan)}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Fab
                className={classes.add}
                size='medium'
                color="primary"
                aria-label="add"
                onClick={() => setPlan(prev => ({
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

