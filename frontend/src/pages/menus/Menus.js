import React, { useEffect, useState, useContext } from 'react'
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import sharedService from '../../services/shared';
import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';
import menuService from '../../services/menu';
import { AuthContext } from '../../contexts/auth';
import MenuForm from './MenuForm';

const useStyles = makeStyles((theme) => ({
    search: {
        margin: '2em'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2em'
    },
    delete: {
        marginLeft: '1em'
    },
    deleteIcon: {
        color: 'white'
    }
}))

const Menus = () => {
    const classes = useStyles()

    const { selectedMenu: menu, setSelectedMenu: setMenu } = useContext(AuthContext)
    const { message, setMessage } = useContext(FeedbackContext)

    console.log('selectedMenu', menu)

    const [enums, setEnums] = useState()
    const [isFormOpen, setIsFormOpen] = useState(menu._id)
    const [allMenus, setAllMenus] = useState()

    const getAllMenus = async () => {
        try {
            const { data: { menus: retrievedMenus } } = await menuService.getAllMenus()
            setAllMenus(retrievedMenus)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    const getData = async () => {
        try {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            getAllMenus()
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('menu==>', menu)

    const handleSave = async () => {
        try {
            const { data: { menu: createdMenu } } = await menuService.create(menu)
            setMenu(createdMenu)
            getAllMenus()

            setMessage('Menu created')
        } catch (e) {
            setMessage('Error creating menu')
        }
    }

    const handleEdit = async () => {
        try {
            const { data: { menu: updatedMenu } } = await menuService.edit(menu._id, menu)
            setMenu(updatedMenu)
            getAllMenus()

            setMessage('Menu updated')
        } catch (e) {
            console.log(e)
            setMessage('Error editing menu')
        }
    }

    const handleDelete = async () => {
        try {
            await menuService.delete(menu._id)
            setMenu({})
            setIsFormOpen(false)
            getAllMenus()

            setMessage('Menu deleted')
        } catch (e) {
            setMessage('Error deleting menu')
        }
    }

    return allMenus ? <>
        <div className={classes.search}>
            <AutocompleteInput
                label='Buscar menu'
                onChange={(v) => { setMenu(v || {}); setIsFormOpen(Boolean(v)) }}
                getOptionLabel={option => `${option.name}`}
                options={allMenus}
                variant='outlined'
            />
        </div>
        <div className={classes.container}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setMenu({});
                setIsFormOpen(!isFormOpen);
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {menu._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>}
        </div>
        {isFormOpen && <MenuForm
            menu={menu}
            setMenu={setMenu}
            handleClick={menu._id ? handleEdit : handleSave}
            error={message}
            enums={enums}

        />}
    </> : <Loading />
}

export default Menus