import React, { useState, useContext } from 'react'
import { makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Fab, Paper, Button, Grid } from '@material-ui/core'
import BasicTable from '../../components/shared/BasicTable'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import TextInput from '../../components/shared/TextInput';
import patientService from '../../services/patient'
import DeleteIcon from '@material-ui/icons/Delete'

import moment from 'moment'
import { FeedbackContext } from '../../contexts/feedback';

const useStyles = makeStyles((theme) => ({
    expand: {
        marginTop: '2em',
        width: '100%'
    },
    panel: {
        padding: '1em',
        border: 'none'

    },
    icon: {
        marginRight: '0.2em',
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    add: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    button: {
        color: 'white',
        margin: '1em'
    },
    deleteIcon: {
        color: 'white'
    }
}))

const ChecksForm = ({ patient = {}, setPatient }) => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [check, setCheck] = useState({})

    const handleSave = async () => {
        try {
            const { data: { check: createdCheck } } = await patientService.createCheck(check)
            setIsFormOpen(false)
            setPatient(prev => ({
                ...prev,
                checks: [...patient.checks || [], createdCheck]
            }))

            setMessage('Check created')
        } catch (e) {
            setMessage('Error creating check')
        }
    }

    const handleDelete = async (id) => {
        try {
            await patientService.deleteCheck(id)

            setPatient(prev => ({
                ...prev,
                checks: patient.checks.filter(check => check._id !== id)
            }))
            
            setMessage('Check deleted')
        } catch (e) {
            setMessage('Error deleting check')
        }
    }

    const createData = (id, date, weight, FA, PA, PC) => {
        const height = patient.height
        const IMC = (weight / ((height * height) / 10000)).toFixed(2)

        const calculateGED = (gender) => {
            if (gender === 'hombre') return ((66.473 + (13.751 * weight) + (5.0033 * height) - (6.755 * patient.age)) * FA).toFixed(2)
            if (gender === 'mujer') return ((655.1 + (9.463 * weight) + (1.8 * height) - (4.6756 * patient.age)) * FA).toFixed(2)
        }

        const calculateFat = (gender) => {
            if (gender === 'hombre') return (IMC / PA * 10 + +IMC / 100).toFixed(2)
            if (gender === 'mujer') return (IMC / PA * 10 + +IMC + 10).toFixed(2)
        }

        return {
            date: moment(date).format('DD/MM/yy'),
            weight,
            IMC,
            FA,
            GED: calculateGED(patient.gender),
            PA,
            PC,
            ICC: (PA / PC).toFixed(2),
            fat: calculateFat(patient.gender),
            delete: <Fab size='small' color="secondary" onClick={() => handleDelete(id)}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>
        };
    }

    const values = patient.checks
        ? patient.checks.map(check =>
            createData(check._id, check.createdAt, check.weight, check.FA, check.PA, check.PC))
        : []

    const rows = [
        { label: 'Date', key: 'date' },
        { label: 'Weight', key: 'weight' },
        { label: 'IMC (18,5 - 24,9)', key: 'IMC' },
        { label: 'FA', key: 'FA' },
        { label: 'GED (kcal)', key: 'GED' },
        { label: 'PA (cm)', key: 'PA' },
        { label: 'PC (cm)', key: 'PC' },
        { label: `ICC ${patient.gender === 'hombre' ? '(0, 71 - 0, 85)' : '(0, 78 - 0, 94)'}`, key: 'ICC' },
        { label: `%F ${patient.gender === 'hombre' ? '(8 - 19)' : '(21 - 33)'}`, key: 'fat' },
        { label: '', key: 'delete' }
    ]

    return <Accordion className={classes.expand}>
        <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon />}
        >
            <AssessmentIcon className={classes.icon} />
            <Typography variant='body1'>Checks</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
            <BasicTable rows={rows} values={values} />
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
                <Button className={classes.button} onClick={handleSave} color="secondary" variant="contained">Save</Button>
            </Paper>}
        </AccordionDetails>

    </Accordion>
}

export default ChecksForm