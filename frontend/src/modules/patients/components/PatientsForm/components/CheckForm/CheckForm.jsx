import React, { useState, useContext } from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, Fab, Paper, Button, Grid, Chip } from '@material-ui/core'
import BasicTable from '../../../../../../components/shared/BasicTable/BasicTable'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import TextInput from '../../../../../../components/shared/TextInput'
import DeleteIcon from '@material-ui/icons/Delete'

import { FeedbackContext } from '../../../../../../contexts/feedback';
import { useStyles } from './styles';
import { values, handleSave, idealWeightRange, rows, handleDelete } from './helpers';


const ChecksForm = ({ patient = {}, setPatient }) => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [check, setCheck] = useState({})


    return <Accordion className={classes.expand}>
        <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon />}
        >
            <AssessmentIcon className={classes.icon} />
            <Typography variant='body1'>Checks</Typography>

        </AccordionSummary>
        <AccordionDetails className={classes.content}>
            <Chip
                className={classes.chip}
                label={`Ìdeal weight range: ${idealWeightRange(patient).min}kg - ${idealWeightRange(patient).max}kg`} color='primary'
            />
            <BasicTable
                rows={rows(patient)}
                values={values(
                    patient,
                    <Fab size='small' color="secondary" onClick={() => handleDelete({ id: check._id, patient, setPatient, setMessage })}>
                        <DeleteIcon className={classes.deleteIcon} />
                    </Fab>)} />
            <Fab className={classes.add} size='medium' color="primary" aria-label="add" onClick={() => {
                setIsFormOpen(!isFormOpen); setCheck({ patient: patient._id })
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {isFormOpen && <Paper className={classes.container}>
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={3}>
                        <TextInput
                            label="Weight (Kg)"
                            value={check.weight}
                            onChange={(v) => setCheck(prev => ({ ...prev, weight: v }))}
                            required
                            type='number'
                            error={message && !check.weight}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextInput
                            label="FA"
                            value={check.FA}
                            onChange={(v) => setCheck(prev => ({ ...prev, FA: v }))}
                            required
                            type='number'
                            error={message && !check.FA}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextInput
                            label="PA (cm)"
                            value={check.PA}
                            onChange={(v) => setCheck(prev => ({ ...prev, PA: v }))}
                            type='number'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextInput
                            label="PC (cm)"
                            value={check.PC}
                            onChange={(v) => setCheck(prev => ({ ...prev, PC: v }))}
                            type='number'
                        />
                    </Grid>
                </Grid>
                <Button className={classes.button} onClick={handleSave({ check, patient, setPatient, setIsFormOpen, setMessage })} color="secondary" variant="contained">Save</Button>
            </Paper>}
        </AccordionDetails>

    </Accordion>
}

export default ChecksForm