import { useEffect, useState } from 'react'
import moment from 'moment'
import patientService from './service';
import { defaultPatient } from './helpers';

export const usePatients = (reload = true, setReload) => {
    const [allPatients, setAllPatients] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!reload) return
        
        patientService.getAllPatients().then(({ data: { patients } }) => {
            setAllPatients(patients)
            setLoading(false)
            setReload && setReload(false)
        })   
    }, [reload])

    return [allPatients, loading]
}


