import moment from 'moment'
import patientService from "./service";

export const defaultPatient = {
    name: '',
    email: '',
    phone: '',
    height: ''
}

export const handleSave = async ({ patient, setPatient, setMessage, setReload }) => {
    try {
        const { data: { patient: createdPatient } } = await patientService.create(patient)
        setPatient(createdPatient)
        setReload(true)

        setMessage('Patient created')
    } catch (e) {
        setMessage('Error creating patient')
    }
}

export const handleEdit = async ({ patient, setPatient, setMessage, setReload }) => {
    try {
        const { data: { patient: updatedPatient } } = await patientService.edit(patient._id, patient)
        setPatient(updatedPatient)
        setReload(true)

        setMessage('Patient updated')
    } catch (e) {
        console.log(e)
        setMessage('Error editing patient')
    }
}

export const handleDelete = async ({ patient, setPatient, setIsFormOpen, setMessage, setReload }) => {
    try {
        await patientService.delete(patient._id)
        setPatient({})
        setIsFormOpen(false)
        setReload(true)

        setMessage('Patient deleted')
    } catch (e) {
        setMessage('Error deleting patient')
    }
}

export const getPatient = async (v, setPatient, setIsFormOpen) => {
    try {
        const id = v ?._id || null
        
        if (!id) return setPatient(defaultPatient)

        const { data: { patient: retrievedPatient } } = await patientService.getPatient(id)
        setPatient({
            ...retrievedPatient,
            age: moment().diff(moment(retrievedPatient.dateOfBirth), 'years')
        })

        setIsFormOpen(Boolean(v))
    } catch (e) {
        console.log(e ?.response ?.data)
    }
}