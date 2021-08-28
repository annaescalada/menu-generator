import { useEffect, useState } from 'react'
import recipesService from './service'

export const useRecipes = (reload = true, setReload) => {
    const [allRecipes, setAllRecipes] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!reload) return
        
        recipesService.getAllRecipes().then(({ data: { recipes } }) => {
            setAllRecipes(recipes)
            setLoading(false)
            setReload && setReload(false)
        })   
    }, [reload])

    return [allRecipes, loading]
}