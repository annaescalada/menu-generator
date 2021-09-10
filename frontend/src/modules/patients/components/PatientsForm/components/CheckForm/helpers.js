import patientService from "../../../../service";
import moment from 'moment'

export const handleSave = async ({ check, patient, setPatient, setIsFormOpen, setMessage }) => {
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

export const handleDelete = async ({ id, patient, setPatient, setMessage }) => {
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

export const createData = (patient, id, date, weight, FA, PA, PC, deleteComponent) => {
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
        delete: deleteComponent
    };
}

export const values = (patient, deleteComponent) => patient.checks
    ? patient.checks.map(check =>
        createData(check._id, check.createdAt, check.weight, check.FA, check.PA, check.PC, deleteComponent))
    : []

export const rows = patient => [
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

export const idealWeightRange = patient => ({
    min: (18.5 * ((patient.height * patient.height) / 10000)).toFixed(2),
    max: (24.9 * ((patient.height * patient.height) / 10000)).toFixed(2),
})
