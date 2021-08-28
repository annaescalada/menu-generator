import { useState, useEffect } from 'react'
import sharedService from "./services/shared";

export const useEnums = () => {
    const [enums, setEnums] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        sharedService.getEnums().then(({ data: { enums } }) => {
            setEnums(enums)
            setLoading(false)
        })   
    }, [])

    return [enums, loading]
}