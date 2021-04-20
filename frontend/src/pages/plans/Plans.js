import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

import AutocompleteInput from '../../components/shared/AutocompleteInput';
import { FeedbackContext } from '../../contexts/feedback';
import Loading from '../../components/shared/Loading';
import planService from '../../services/plan';
import PlansForm from './PlansForm';
import { config } from './planConfig'
import { AuthContext } from '../../contexts/auth'

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
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        margin: '2em'
    },
}))

const Plans = () => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)
    const { selectedPlan: plan, setSelectedPlan: setPlan } = useContext(AuthContext)

    console.log(plan)

    const { defaultPlan } = config

    const [allPlans, setAllPlans] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(plan ?._id)

    const getData = async () => {
        try {
            const { data: { plans: retrievedPlans } } = await planService.getAllPlans()
            setAllPlans(retrievedPlans)
        } catch (e) {
            console.log(e ?.response ?.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('plan==>', plan)

    const handleSave = async () => {
        try {
            const { data: { plan: createdPlan } } =await planService.create(plan)
            setPlan(createdPlan)
            getData()

            setMessage('Plan created')
        } catch (e) {
            setMessage('Error creating plan')
        }
    }

    const handleEdit = async () => {
        try {
            const { data: { plan: editedPlan } } = await planService.edit(plan ?._id, plan)
            setPlan(editedPlan)
            getData()

            setMessage('Plan updated')
        } catch (e) {
            console.log(e)
            setMessage('Error editing plan')
        }
    }

    const handleDelete = async () => {
        try {
            await planService.delete(plan ?._id)
            setPlan({ distribution: defaultPlan })
            setIsFormOpen(false)
            getData()

            setMessage('Plan deleted')
        } catch (e) {
            console.log(e)
            setMessage('Error deleting plan')
        }
    }

    return allPlans ? <>
        <div className={classes.search}>
            <AutocompleteInput
                label='Buscar plan'
                onChange={(v) => { setPlan(v || { distribution: defaultPlan }); setIsFormOpen(Boolean(v)) }}
                getOptionLabel={option => `${option.name}`}
                options={allPlans}
                variant='outlined'
            />
        </div>
        <div className={classes.container}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setPlan({ distribution: defaultPlan });
                setIsFormOpen(!isFormOpen);
            }}>
                {isFormOpen
                    ? <Close />
                    : <AddIcon />}
            </Fab>
            {plan ?._id && <Fab className={classes.delete} color="secondary" onClick={handleDelete}>
                <DeleteIcon className={classes.deleteIcon} />
            </Fab>}
        </div>
        {isFormOpen && <>
            <Link className={classes.link} to={`/menu-base`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Menu básico</Button>
            </Link>
            <PlansForm
                plan={plan}
                setPlan={setPlan}
                handleClick={plan._id ? handleEdit : handleSave}
                error={message}
            />
        </>}
    </> : <Loading />
}

export default Plans