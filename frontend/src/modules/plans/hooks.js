import { useEffect, useState } from 'react'
import planService from './service';

export const usePlans = (reload = true, setReload) => {
    const [allPlans, setAllPlans] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!reload) return
        
        planService.getAllPlans().then(({ data: { plans } }) => {
            setAllPlans(plans)
            setLoading(false)
            setReload && setReload(false)
        })   
    }, [reload])

    return [allPlans, loading]
}