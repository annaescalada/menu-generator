import React from 'react'

import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy';

import AutocompleteInput from '../shared/AutocompleteInput'
import { useStyles } from './styles'

const ItemStructure = ({ name, item, setItem, defaultValue, isFormOpen, setIsFormOpen, allItems, handleDelete }) => {
    const classes = useStyles()

    return <>
        <div className={classes.search}>
            <AutocompleteInput
                label={`Buscar ${name}`}
                onChange={(v) => { setItem(v || { defaultValue }); setIsFormOpen(Boolean(v)) }}
                getOptionLabel={option => `${option.name}`}
                options={allItems}
                variant='outlined'
            />
        </div>
        <div className={classes.container}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setItem(defaultValue);
                setIsFormOpen(!isFormOpen);
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {item._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>}
            {item._id && <Fab className={classes.delete} color="secondary" onClick={() => setItem(prev => ({ ...prev, _id: null }))}>
                <FileCopyIcon className={classes.deleteIcon} />
            </Fab>}
        </div>
    </>
}

export default ItemStructure