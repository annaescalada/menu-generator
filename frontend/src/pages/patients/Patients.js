import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Paper, Fab, Typography, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

import sharedService from '../../services/shared';
import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';
import patientService from '../../services/patient';
import PatientsForm from './PatientsForm';

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

const Patients = () => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)

    const [enums, setEnums] = useState()
    const [isFormOpen, setIsFormOpen] = useState()
    const [allPatients, setAllPatients] = useState()
    const [patient, setPatient] = useState({
        name: '',
        email: '',
        phone: '',
        height: ''
    })

    const getPatient = async (id) => {
        try {
            const { data: { patient: retrievedPatient } } = await patientService.getPatient(id)
            setPatient({
                ...retrievedPatient,
                age: moment().diff(moment(retrievedPatient.dateOfBirth), 'years')
            })
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    const getAllPatients = async () => {
        try {
            const { data: { patients: retrievedPatients } } = await patientService.getAllPatients()
            setAllPatients(retrievedPatients)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    const getData = async () => {
        try {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            getAllPatients()
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('pacient==>', patient)

    const handleSave = async () => {
        try {
            const { data: { patient: createdPatient }} = await patientService.create(patient)
            setPatient(createdPatient)
            getAllPatients()

            setMessage('Patient created')
        } catch (e) {
            setMessage('Error creating patient')
        }
    }

    const handleEdit = async () => {
        try {
            const { data: { patient: updatedPatient }} = await patientService.edit(patient._id, patient)
            setPatient(updatedPatient)
            getAllPatients()

            setMessage('Patient updated')
        } catch (e) {
            console.log(e)
            setMessage('Error editing patient')
        }
    }

    const handleDelete = async () => {
        try {
            await patientService.delete(patient._id)
            setPatient({})
            setIsFormOpen(false)
            getAllPatients()

            setMessage('Patient deleted')
        } catch (e) {
            setMessage('Error deleting patient')
        }
    }

    return allPatients ? <>
        <div className={classes.search}>
            <AutocompleteInput
                label='Buscar paciente'
                onChange={(v) => { getPatient(v ?._id || {}); setIsFormOpen(Boolean(v)) }}
                getOptionLabel={option => `${option.name}`}
                options={allPatients}
                variant='outlined'
            />
        </div>
        <div className={classes.container}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setPatient({});
                setIsFormOpen(!isFormOpen);
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {patient._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>}
        </div>
        {isFormOpen && <PatientsForm
            patient={patient}
            setPatient={setPatient}
            handleClick={patient._id ? handleEdit : handleSave}
            error={message}
            enums={enums}
        />}
    </> : <Loading />
}

export default Patients