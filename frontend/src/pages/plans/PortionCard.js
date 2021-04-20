import React from 'react'
import { Grid, Paper, Button, Fab } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import DeleteIcon from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle';
import TextInput from '../../components/shared/TextInput';
import { makeStyles } from '@material-ui/styles'
import EditableInput from '../../components/shared/EditableInput';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '1em',
        padding: '1.5em',
        backgroundColor: theme.palette.primary.extraMegaLight,
        borderRadius: '20px',
    },
    icon: {
        color: 'white'
    },
    img: {
        height: '3em',
        marginLeft: '1.5em'
    },
    lowOpacity: {
        opacity: '20%'
    }
}))

const PortionCard = ({ meal, setMeal, index, handleChange, handleDelete }) => {
    const classes = useStyles()

    console.log(meal)

    return <Draggable
        draggableId={meal._id}
        index={index}
    >
        {(provided) => <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <Paper
                className={classes.container}
            >
                <Grid container>
                    <Grid item xs={1}> <DragHandleIcon /></Grid>
                    <Grid item xs={7}><TextInput value={meal.name} onChange={(v) => handleChange(v, 'name', index)} /></Grid>
                    <Grid item xs={3}><TextInput value={meal.time} onChange={(v) => handleChange(v, 'time', index)} /></Grid>
                    <Grid item xs={1}><Fab color="secondary" size='medium' onClick={() => handleDelete(index)}>
                        <DeleteIcon className={classes.icon} />
                    </Fab></Grid>
                </Grid>
                <Grid spacing={3} alignItems='center' justify='center' container>
                    {[{ key: 'carbs', icon: 'cereales' },
                    { key: 'proteins', icon: 'legumbres' },
                    { key: 'cruciferous', icon: 'crucíferas' },
                    { key: 'otherVeggies', icon: 'otras_verduras' },
                    { key: 'greens', icon: 'hortalizas' },
                    { key: 'fats', icon: 'frutos_secos_y_oleaginosos' },
                    { key: 'omega3', icon: 'omega_3' },
                    { key: 'fruit', icon: 'frutas' },
                    { key: 'berries', icon: 'frutos_rojos' },
                    { key: 'dairy', icon: 'lácteos' }].map(group => <Grid item xs={1}>
                        <TextInput className={(!meal[group.key] || meal[group.key] === '0') && classes.lowOpacity} type='number' label={<img className={classes.img} src={`/images/Food-icons/${group.icon}.png`} alt="icon meal" />} value={meal[group.key] || 0} onChange={(v) => handleChange(v, group.key, index)} />
                    </Grid>)}
                </Grid>
                <Grid justify='center' spacing={5}container>
                    <Grid xs={12} item>
                        <EditableInput
                            value={meal.text || ''}
                            onChange={(v) => handleChange(v, 'text', index)}
                        />
                    </Grid>
                </Grid>
                <Grid spacing={2} justify='center' alignItems='center' container>
                    <Grid item><Button variant='outlined' size='small' color="primary" onClick={() => setMeal('breakfast', index)}>Desayuno</Button></Grid>
                    <Grid item><Button variant='outlined' size='small' color="primary" onClick={() => setMeal('lunch', index)}>Comida / Cena</Button></Grid>
                    <Grid item><Button variant='outlined' size='small' color="primary" onClick={() => setMeal('snack', index)}>Snack</Button></Grid>
                    <Grid item><Button variant='outlined' size='small' color="primary" onClick={() => setMeal('miniSnack', index)}>Mini Snack</Button></Grid>
                </Grid>
            </Paper>
        </div>}
    </Draggable>
}

export default PortionCard