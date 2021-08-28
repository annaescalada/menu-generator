import { useEffect, useState } from 'react'
import menuService from './service';

export const useMenus = (reload = true, setReload) => {
    const [allMenus, setAllMenus] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!reload) return
        
        menuService.getAllMenus().then(({ data: { menus } }) => {
            setAllMenus(menus)
            setLoading(false)
            setReload && setReload(false)
        })   
    }, [reload])

    return [allMenus, loading]
}