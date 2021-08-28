import _ from 'lodash'

export const handleIsComplex = (setIngredient) => {
    setIngredient(prev => ({
        ...prev,
        isComplex: !prev.isComplex,
        season: !prev.isComplex ? [] : prev.season,
        tags: !prev.isComplex ? [] : prev.tags,
        duration: null,
        ingredients: [],
        preparation: null,
        utensils: []
    }))
}

export const handleIngredients = async (v, setItem, enums) => {
    setItem(prev => ({
        ...prev,
        ingredients: v,
        season: _.intersection(...v.map(ingredient => ingredient.season)),
        tags: getTags(v, enums)
    }))
}

export const getTags = (ingredients, enums) => {
    const ingredientTags = ingredients ?.map(ingredient => ingredient.tags) || []

    const exclusiveTags = _.union(...ingredientTags.map(ingredientTag => ingredientTag.filter(tag => enums.exclusiveTags.includes(tag))))

    const inclusiveTags = ingredientTags.length ? _.intersection(...ingredientTags, enums.inclusiveTags) : []

    return [...exclusiveTags, ...inclusiveTags]
}