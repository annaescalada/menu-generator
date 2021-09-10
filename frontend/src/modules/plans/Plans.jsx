import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

import { FeedbackContext } from '../../contexts/feedback';
import { AuthContext } from '../../contexts/auth'
import Loading from '../../components/shared/Loading';
import PlansForm from './components/PlansForm/PlansForm';
import ItemStructure from '../../components/ItemStructure/ItemStructure';
import { useStyles } from './styles'
import { defaultPlan, handleSave, handleEdit, handleDelete } from './helpers';
import { usePlans } from './hooks';
import { useEnums } from '../../hooks';

const Plans = () => {
    const classes = useStyles()

    const { message, setMessage } = useContext(FeedbackContext)
    const { selectedPlan: plan, setSelectedPlan: setPlan } = useContext(AuthContext)

    const [isFormOpen, setIsFormOpen] = useState(plan ?._id)
    const [reload, setReload] = useState(true)

    const [allPlans, loadingPlans] = usePlans(reload, setReload)
    const [enums, loadingEnums] = useEnums()

    const isLoading = loadingPlans || loadingEnums

    return isLoading
        ? <Loading />
        : <>
            <ItemStructure
                name='Plan'
                item={plan}
                setItem={setPlan}
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                defaultValue={defaultPlan}
                allItems={allPlans}
                handleDelete={() => handleDelete({ plan, setPlan, setIsFormOpen, setMessage, setReload })}
            />
            {isFormOpen && <>
                <Link className={classes.link} to={`/menu-base`}>
                    <Button
                        className={classes.docButton}
                        onClick={() => { }}
                        color="primary"
                        variant="outlined"
                    >
                        Plan básico
                        </Button>
                </Link>
                <PlansForm
                    plan={plan}
                    setPlan={setPlan}
                    handleClick={() => plan._id
                        ? handleEdit({ plan, setPlan, setIsFormOpen, setMessage, setReload })
                        : handleSave({ plan, setPlan, setIsFormOpen, setMessage, setReload })}
                        enums={enums}
                        error={message}
                />
            </>}
        </>
}

export default Plans