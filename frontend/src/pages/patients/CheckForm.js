import React, { useState } from 'react'
import { makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Fab, Paper, Button, Grid } from '@material-ui/core'
import BasicTable from '../../components/shared/BasicTable'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import TextInput from '../../components/shared/TextInput';
import patientService from '../../services/patient';

const useStyles = makeStyles((theme) => ({
    expand: {
        marginTop: '2em'
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
}))

const ChecksForm = ({ patient = {}, setPatient }) => {
    const classes = useStyles()

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [check, setCheck] = useState({})
    const [message, setMessage] = useState()

    const createData = (date, weight, FA, PA, PC) => {
        const height = patient.height
        const IMC = weight / height * height

        const calculateGED = (gender) => {
            if (gender === 'hombre') return (66.473 + (13.751 * weight) + (5.0033 * height) - (6.755 * patient.age)) * FA
            if (gender === 'mujer') return (655.1 + (9.463 * weight) + (1.8 * height) - (4.6756 * patient.age)) * FA
        }

        const calculateFat = (gender) => {
            if (gender === 'hombre') return ((IMC / PA * 10) + IMC) / 100
            if (gender === 'mujer') return ((IMC / PA * 10) + IMC + 10) / 100
        }

        return {
            date,
            weight,
            IMC,
            FA,
            GED: calculateGED(patient.gender),
            PA,
            PC,
            ICC: PA / PC,
            fat: calculateFat(patient.gender)
        };
    }

    const values = patient.checks
        ? patient.checks.map(check =>
            createData(check.createdAt, check.weight, check.FA, check.PA, check.PC))
        : []

    const rows = [
        { label: 'Date', key: 'date' },
        { label: 'Weight', key: 'weight' },
        { label: 'IMC', key: 'IMC' },
        { label: 'FA', key: 'FA' },
        { label: 'GED (kcal)', key: 'GED' },
        { label: 'PA (cm)', key: 'PA' },
        { label: 'PC (cm)', key: 'PC' },
        { label: `ICC ${patient.gender === 'hombre' ? (0, 71 - 0, 85) : (0, 78 - 0, 94)}`, key: 'ICC' },
        { label: '% Grasa', key: 'fat' },
    ]

    const handleSave = async () => {
        try {
            await patientService.createCheck(check)
            setIsFormOpen(false)
            setPatient(prev => ({
                ...prev,
                checks: [...patient.checks || [], check]
            }))

            setMessage('Check created')
        } catch (e) {
            setMessage('Error creating check')
        }
    }

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