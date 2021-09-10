import React, { useState, useContext } from 'react'
import _ from 'lodash'

import { FeedbackContext } from '../../contexts/feedback'
import Loading from '../../components/shared/Loading'
import { AuthContext } from '../../contexts/auth'
import ItemStructure from '../../components/ItemStructure/ItemStructure';
import MenuForm from './components/MenuForm/MenuForm'
import { useEnums } from '../../hooks'
import { useIngredients } from '../ingredients/hooks'
import { useMenus } from './hooks'
import { useRecipes } from '../recipes/hooks'
import { handleDelete, handleEdit, handleSave } from './helpers'

const Menus = () => {
    const { message, setMessage } = useContext(FeedbackContext)
    const { selectedMenu: menu, setSelectedMenu: setMenu, setSelectedRecipes } = useContext(AuthContext)

    const [isFormOpen, setIsFormOpen] = useState(menu._id)
    const [reload, setReload] = useState(true)
    
    const [enums, loadingEnums] = useEnums()
    const [allMenus, loadingMenus] = useMenus()
    const [allIngredients, loadingIngredients] = useIngredients(reload, setReload)
    const [allRecipes, loadingRecipes] = useRecipes()

    const isLoading = loadingMenus || loadingIngredients || loadingRecipes || loadingEnums

    return isLoading 
    ? <Loading />
    : <>
    <ItemStructure 
        name='Menu'
        item={menu}
        setItem={setMenu}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        defaultValue={{}}
        allItems={allMenus}
        handleDelete={() => handleDelete({ menu, setMenu, setIsFormOpen, setMessage, setReload })}
    />
        {isFormOpen && <MenuForm
            menu={menu}
            setMenu={setMenu}
            handleClick={() => menu._id
                ? handleEdit({ menu, setMenu, setIsFormOpen, setMessage, setSelectedRecipes, setReload })
                : handleSave({ menu, setMenu, setIsFormOpen, setMessage, setSelectedRecipes, setReload })}            
            error={message}
            enums={enums}
            allIngredients={allIngredients}
            allRecipes={allRecipes}
            setSelectedRecipes={setSelectedRecipes}
            error={message}
        />}
    </>
}

export default Menus