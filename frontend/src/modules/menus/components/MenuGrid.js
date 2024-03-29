import React, { useContext, useState, useLayoutEffect } from 'react'
import { makeStyles, Typography, Divider, Paper, Chip } from '@material-ui/core';
import { AuthContext } from '../../../contexts/auth';
import sharedService from '../../../services/shared';
import moment from 'moment'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import _ from 'lodash'
import { recipeStructure } from '../../recipes/helpers';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '3em',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    legend: {
        backgroundColor: theme.palette.secondary.extraLight,
        borderRadius: '20px',
        width: 'fit-content',
        margin: '2em 0',
        padding: '0.5em',
    },
    titleContainer: {
        display: 'flex',
        alignContent: 'center',
        margin: '1.5em 0'
    },
    icon: {
        height: '2em',
        marginRight: '1em'
    },
    tagIcon: {
        height: '0.8em',
    },
    day: {
        background: theme.palette.primary.extraLight,
        padding: '0.5em',
        margin: '1em',
        borderRadius: '15px',
        minWidth: '20%',
        maxWidth: '20%'
    },
    meal: {
        padding: '0.8em',
        margin: '1em',
        borderRadius: '15px',
        background: theme.palette.secondary.extraLight
    },
    menuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em'
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '2em 1em 1em 1em'
    },
    chip: {
        margin: '0.5em',
        // color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content',
        color: theme.palette.secondary.dark
    },
    ingredientChip: {
        margin: '0.2em',
        background: theme.palette.primary.extraMegaLight
    }
}))

const MenuGrid = () => {
    const classes = useStyles()

    const { selectedPatient: patient, selectedMenu: menu, setSelectedMenu: setMenu } = useContext(AuthContext)

    const [enums, setEnums] = useState({})

    const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    useLayoutEffect(() => {
        const getData = async () => {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)
        }
        getData()
    }, [])

    const getIngredientsList = (coordinates, meal) => recipeStructure(meal).map(({ options, factor }) => {
        const filteredIngredients = menu.content ?.[coordinates] ?.ingredients ?.filter(ingredient => options.includes(ingredient.group))
       
        const groupLength = filteredIngredients ?.length
       
        return filteredIngredients ?.map(({ name, portion, unit }) => {
            const recipePortion = factor ? portion * factor / groupLength : portion

            // return <Typography align='center' variant='body1'>{recipePortion}{unit} {name}</Typography>
            return <Chip className={classes.ingredientChip} label={`${recipePortion}${unit} ${name}`} />
        })
    })

    const buildGrid = (content) => enums.daysEnum ?.map(day => <div className={classes.day}>
        <Typography align='center' style={{ fontWeight: 600 }} color='primary' variant='h5'>{firstUppercase(day)}</Typography>
        {enums.menuMealEnum ?.map(meal => {
            const coordinates = `${day}_${meal}`

            return <div className={classes.meal}>
                <Typography align='center' style={{ fontWeight: 600 }} variant='h6'>{firstUppercase(meal)}</Typography>
                <Typography align='center' style={{ marginBottom: '1em' }} color='secondary' variant='body1'>{meal === 'desayuno' ? '(9:00)' : meal === 'comida' ? '(13:30)' : '(20:30)'}</Typography>
                {menu.content ?.[coordinates] ?.recipe ?.name && <Typography align='center' variant='body1'>{<TurnedInIcon className={classes.tagIcon} color='secondary' />}{menu.content ?.[coordinates] ?.recipe ?.name}</Typography>}
                {!menu.content ?.[coordinates] ?.recipe ?.name && <>
                    <Typography align='center' variant='body1'>{menu.content ?.[coordinates] ?.name}</Typography>
                    <div className={classes.chipContainer}>
                        {getIngredientsList(coordinates, meal)}
                    </div>
                </>}
            </div>
        })}
    </div>)

    const getComplexIngredients = () => {
        if (!menu.content) return

        const meals = Object.keys(menu.content)

        if (!meals ?.length) return

        let complexIngredients = []

        const getComplex = (ingredients) => {
            debugger
            if (!ingredients) return
            ingredients.forEach(ingredient => {
                if (ingredient.isComplex) {
                    complexIngredients.push(ingredient)
                    getComplex(ingredient.ingredients)
                }
            })
        }

        meals.forEach(meal => {
            getComplex(menu.content[meal] ?.ingredients)
            getComplex(menu.content[meal] ?.recipe ?.ingredients)
        })

        return _.uniqBy(complexIngredients, e => e._id).map(ingredient => {
            const count = _.countBy(complexIngredients, (rec) => rec._id === ingredient._id).true

            const countLabel = ingredient.portionAmount ? ` ${Math.ceil(count / ingredient.portionAmount)}` : ` ${count}`

            return <Chip className={classes.chip} label={`${countLabel}R de ${ingredient.name}`} />
        })

    }

    return <div className={classes.container}>
        <Typography variant='h4' color='primary'>Menú semanal</Typography>
        <Typography variant='body1'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>
        <Divider light='true' style={{ margin: '2em 0' }} />

        <div className={classes.menuContainer}>
            {buildGrid()}
        </div>

        <div className={classes.legend}>
            <Typography align='center' style={{ fontWeight: 600, marginBottom: '0.5em' }} variant='h5' color='secondary'>Preparación semanal</Typography>
            <Typography align='center' variant='body1'>Una vez a la semana preparar las siguientes raciones de los siguientes alimentos, necesarios para seguir el menú:</Typography>
            <div className={classes.chipContainer}>
                {getComplexIngredients()}
            </div>
        </div>
        <Typography variant='h6'>Anna Escalada</Typography>
        <Typography variant='overline'>Dietista Nutricionista</Typography>
        <Typography variant='body1'>www.annaescalada.com - annaescalada@gmail.com</Typography>
    </div>

}

export default MenuGrid