import planService from "./service";

export const defaultMeals = {
    breakfast: {
        carbs: 1,
        proteins: 0,
        cruciferous: 0,
        otherVeggies: 0,
        greens: 0,
        fats: 1,
        dairy: 1,
        omega3: 1,
        fruit: 2,
        berries: 1,
    },
    lunch: {
        carbs: 1,
        proteins: 1,
        cruciferous: 1,
        otherVeggies: 1,
        greens: 1,
        fats: 1,
        dairy: 0,
        omega3: 0,
        fruit: 0,
        berries: 0,
    },
    snack: {
        carbs: 1,
        proteins: 0,
        cruciferous: 0,
        otherVeggies: 0,
        greens: 0,
        fats: 1,
        dairy: 0,
        omega3: 0,
        fruit: 1,
        berries: 0,
    },
    miniSnack: {
        carbs: 0,
        proteins: 0,
        cruciferous: 0,
        otherVeggies: 0,
        greens: 0,
        fats: 1,
        dairy: 0,
        omega3: 0,
        fruit: 1,
        berries: 0,
    }
}

export const defaultPlan = {
    name: '',
    recommendations: '',
    distribution: [{
        name: 'Desayuno',
        time: '9:00',
        ...defaultMeals.breakfast,
        text: ''
    },
    {
        name: 'Comida',
        time: '14:00',
        ...defaultMeals.lunch,
        text: ''
    },
    {
        name: 'Cena',
        time: '20:00',
        ...defaultMeals.lunch,
        text: ''
    }]
}

export const portionMacros = {
    carbs: {
        carbs: 30,
        proteins: 7,
        fat: 2
    },
    proteins: {
        carbs: 20,
        proteins: 15,
        fat: 2
    },
    fats: {
        carbs: 5,
        proteins: 5,
        fat: 10
    },
    dairy: {
        carbs: 15,
        proteins: 5,
        fat: 5
    },
    omega3: {
        carbs: 5,
        proteins: 5,
        fat: 10
    },
    fruit: {
        carbs: 30,
        proteins: 5,
        fat: 1
    },
    berries: {
        carbs: 20,
        proteins: 2.5,
        fat: 1
    }
}

export const handleSave = async ({ plan, setPlan, setMessage, setReload }) => {
    try {
        const { data: { plan: createdPlan } } = await planService.create(plan)
        setPlan(createdPlan)
        setReload(true)

        setMessage('Plan created')
    } catch (e) {
        setMessage('Error creating plan')
    }
}

export const handleEdit = async ({ plan, setPlan, setIsFormOpen, setMessage, setReload }) => {
    try {
        const { data: { plan: editedPlan } } = await planService.edit(plan ?._id, plan)
        setPlan(editedPlan)
        setReload(true)

        setMessage('Plan updated')
    } catch (e) {
        console.log(e)
        setMessage('Error editing plan')
    }
}

export const handleDelete = async ({ plan, setPlan, setIsFormOpen, setMessage, setReload }) => {
    try {
        await planService.delete(plan ?._id)
        setPlan({ distribution: defaultPlan.distribution })
        setIsFormOpen(false)
        setReload(true)

        setMessage('Plan deleted')
    } catch (e) {
        console.log(e)
        setMessage('Error deleting plan')
    }
}
