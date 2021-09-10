import { useState, useEffect } from 'react'
import { calculateMacros } from './helpers';

export const useMacros = (plan) => {
    const [macros, setMacros] = useState({})

    useEffect(() => {
        setMacros(calculateMacros(plan))
    }, [plan.distribution])

    return [macros]
}