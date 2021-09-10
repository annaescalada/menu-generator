import _ from 'lodash'
import { defaultMeals } from '../../helpers';

export const onDragEnd = (value, plan, setPlan) => {
    const { destination, source } = value

    if (!destination) return

    const newDistribution = _.cloneDeep(plan.distribution)

    const draggedItem = newDistribution[source.index]

    newDistribution.splice(source.index, 1)

    newDistribution.splice(destination.index, 0, draggedItem)

    setPlan({
        ...plan,
        distribution: newDistribution
    })
}

export const handleChange = (plan, setPlan) => (v, key, index) => {
    const newDistribution = _.cloneDeep(plan.distribution)

    newDistribution[index] = {
        ...newDistribution[index],
        [key]: v
    }

    setPlan({
        ...plan,
        distribution: newDistribution
    })
}

export const handleDelete = (plan, setPlan) => (index) => {
    const newDistribution = _.cloneDeep(plan.distribution)

    newDistribution.splice(index, 1)

    setPlan({
        ...plan,
        distribution: newDistribution
    })
}

export const setMeal = (plan, setPlan) => (type, index) => {
    const newDistribution = _.cloneDeep(plan.distribution)

    newDistribution[index] = {
        ...newDistribution[index],
        ...defaultMeals[type]
    }

    setPlan({
        ...plan,
        distribution: newDistribution
    })
}
