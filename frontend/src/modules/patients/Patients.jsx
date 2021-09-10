import React, { useState, useContext } from 'react'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';
import PatientsForm from './components/PatientsForm/PatientsForm';
import { AuthContext } from '../../contexts/auth';
import { useStyles } from './styles';
import { useEnums } from '../../hooks';
import { usePatients } from './hooks';
import { getPatient, handleEdit, handleDelete, handleSave } from './helpers';

const Patients = () => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)
    const { selectedPatient: patient, setSelectedPatient: setPatient } = useContext(AuthContext)

    const [isFormOpen, setIsFormOpen] = useState(patient._id)
    const [reload, setReload] = useState(true)

    const [enums, loadingEnums] = useEnums()
    const [allPatients, loadingPatients] = usePatients(reload, setReload)

    const isLoading = loadingEnums || loadingPatients
    return isLoading
        ? <Loading />
        : <>
            <div className={classes.search}>
                <AutocompleteInput
                    label='Buscar paciente'
                    onChange={(v) => getPatient(v, setPatient, setIsFormOpen)}
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
                handleClick={() => patient._id
                    ? handleEdit({ patient, setPatient, setIsFormOpen, setMessage, setReload })
                    : handleSave({ patient, setPatient, setIsFormOpen, setMessage, setReload })}
                error={message}
                enums={enums}
            />}
        </>
}

export default Patients