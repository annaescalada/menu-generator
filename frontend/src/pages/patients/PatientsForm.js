import React from 'react'
import { Button, makeStyles, Paper, Chip, Grid, Divider, Typography, Table, Accordion, AccordionSummary, AccordionDetails, MenuItem } from '@material-ui/core'
import _ from 'lodash'
import moment from 'moment'
import TextInput from '../../components/shared/TextInput'
import SelectInput from '../../components/shared/SelectInput'
import AutocompleteInput from '../../components/shared/AutocompleteInput'
import DateInput from '../../components/shared/DateInput';
import { isToday } from 'date-fns';
import BasicTable from '../../components/shared/BasicTable';
import ChecksForm from './CheckForm'
import { Editor, EditorState } from 'draft-js';
import EditableInput from '../../components/shared/EditableInput'
import { Link } from 'react-router-dom'
import PortionDistribution from './PortionDistribution';



const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        margin: '3em 1em 1em 1em',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'

    },
    chip: {
        margin: '0.2em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    },
    link: {
        margin:'1em',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center'
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    }
}))

const PatientsForm = ({ patient, setPatient, error, handleClick, enums }) => {
    const classes = useStyles()
    return <Paper className={classes.container}>
        <Typography align='center' variant='h6' color='primary'>Contact Data</Typography>
        <Chip className={classes.chip} label={moment(patient.created_at).format('DD/mm/yy')} color='primary' />
        <TextInput
            label="Name"
            value={patient.name}
            onChange={(v) => setPatient(prev => ({ ...prev, name: v }))}
            required
            error={error && !patient.name}
        />
        <Grid container justify='center' alignItems='center'>
            <Grid item xs={6}>
                <TextInput
                    label="Email"
                    value={patient.email}
                    onChange={(v) => setPatient(prev => ({ ...prev, email: v }))}
                    required
                    error={error && !patient.email}
                    type='email'
                />
            </Grid>
            <Grid item xs={6}>
                <TextInput
                    label="Phone"
                    value={patient.phone}
                    onChange={(v) => setPatient(prev => ({ ...prev, phone: v }))}
                    required
                    error={error && !patient.phone}
                />
            </Grid>
            {!patient._id && <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Create patient</Button>}
        </Grid>
        <Divider style={{ margin: '3em 0' }} />
        <Typography align='center' variant='h6' color='primary'>Antropometric Data</Typography>
        <Grid container justify='center' alignItems='center' wrap>
            <Grid item xs={4}>
                <DateInput
                    label="Date of birth"
                    value={patient.dateOfBirth}
                    onChange={(v) => setPatient(prev => ({
                        ...prev,
                        dateOfBirth: v,
                        age: moment().diff(moment(patient.dateOfBirth), 'years')
                    }))}
                />
            </Grid>
            <Grid item xs={2}>
                <Chip className={classes.chip} label={`age: ${patient.age || 0}`} color='primary' />
            </Grid>
            <Grid item xs={3}>
                <SelectInput
                    label="Gender"
                    value={patient.gender}
                    onChange={(v) => setPatient(prev => ({ ...prev, gender: v }))}
                    options={enums.genderEnum}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    label="Height (cm)"
                    value={patient.height}
                    onChange={(v) => setPatient(prev => ({ ...prev, height: v }))}
                    type='number'
                />
            </Grid>
            {patient._id && <ChecksForm patient={patient} setPatient={setPatient} />}
        </Grid>
        <Divider style={{ margin: '3em 0' }} />
        <Typography align='center' variant='h6' color='primary'>Menu Configuration</Typography>
        <SelectInput
            label="Tags (to exclude in menu)"
            multiple
            value={patient.tags || []}
            onChange={(v) => setPatient(prev => ({ ...prev, tags: v }))}
            options={enums.tagEnum}
            disabled={patient.isComplex}
        />
        <Link className={classes.link} to={`/grupos-alimentos-raciones/${patient._id}`}>
            <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Grupos de alimentos y raciones</Button>
        </Link>
        <SelectInput
            label="Utensils"
            multiple
            value={patient.utensils || []}
            onChange={(v) => setPatient(prev => ({ ...prev, utensils: v }))}
            options={enums.utensilsEnum}
        />
        <SelectInput
            label="Preparation days"
            multiple
            value={patient.preparationDays || []}
            onChange={(v) => setPatient(prev => ({ ...prev, preparationDays: v }))}
            options={enums.daysEnum}
        />
        <PortionDistribution patient={patient} setPatient={setPatient} handleClick={handleClick}/>
        <Link className={classes.link} to={`/menu-base/${patient._id}`}>
            <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Menu básico</Button>
        </Link>
        <Divider style={{ margin: '3em 0' }} />
        <Typography align='center' variant='h6' color='primary'>History</Typography>
        <EditableInput
            value={patient.history || ''}
            onChange={(v) => setPatient(prev => ({ ...prev, history: v }))}
        />
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper >

}

export default PatientsForm