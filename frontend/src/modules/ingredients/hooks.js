import { useEffect, useState } from 'react'
import ingredientsService from './service';

export const useIngredients = (reload = true, setReload) => {
    const [allIngredients, setAllIngredients] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!reload) return
        
        ingredientsService.getAllIngredients().then(({ data: { ingredients } }) => {
            setAllIngredients(ingredients)
            setLoading(false)
            setReload && setReload(false)
        })   
    }, [reload])

    return [allIngredients, loading]
}