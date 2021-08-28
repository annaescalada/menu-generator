import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from "react-router";
import { makeStyles, Paper, Typography, Grid, AppBar, Toolbar, Divider } from '@material-ui/core';
import sharedService from '../../../services/shared';
import _ from 'lodash'
import moment from 'moment'
import { AuthContext } from '../../../contexts/auth';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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
        borderRadius: '20px',
        width: 'fit-content',
        margin: '3em 0',
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-around'
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
    groupContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    group: {
        minWidth: '23%',
        margin: '1em',
        padding: '1em',
        borderRadius: '15px',
        background: theme.palette.secondary.extraLight
    },
    legend: {
        backgroundColor: theme.palette.primary.extraMegaLight,
        borderRadius: '20px',
        width: 'fit-content',
        margin: '3em 0',
        padding: '1em',
    },
}))

const GruposAlimentosRaciones = (props) => {
    const classes = useStyles()

    const { selectedPatient: patient, selectedMenu: menu } = useContext(AuthContext)

    const [enums, setEnums] = useState({})
    const [repeatedAllIngredients, setRepeatedAllIngredients] = useState()
    const [allIngredients, setAllIngredients] = useState()
    const [foodLabels, setFoodLabels] = useState()

    const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    useEffect(() => {
        const getData = async () => {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            const meals = menu.content ? Object.keys(menu.content) : []

            let ingredients = []

            meals.forEach(meal => {
                if (menu.content[meal] ?.ingredients) {
                    const nonComplexIngredients = menu.content[meal].ingredients.filter(ingredient => !ingredient.isComplex)
                    const complexIngredients = menu.content[meal].ingredients
                        .filter(ingredient => ingredient.isComplex)
                        .map(ingredient => ingredient.ingredients)
                    console.log(_.flatten(complexIngredients))

                    ingredients.push(...nonComplexIngredients, ..._.flatten(complexIngredients))
                }

                if (menu.content[meal] ?.recipe) {
                    const filteredIngredients = menu.content[meal].recipe ?.ingredients ? menu.content[meal].recipe.ingredients.filter(ingredient => !ingredient.isComplex) : []
                    ingredients.push(...filteredIngredients)
                }
            })

            setRepeatedAllIngredients(ingredients)

            setAllIngredients(_.orderBy(_.uniqBy(ingredients, e => e._id), ['name'], ['asc']))

            setFoodLabels(retrievedEnums.groupEnum.map((group, index) => ({
                index,
                label: firstUppercase(group),
                ref: `/images/Food-icons/${group.split(' ').join('_')}.png`,
                key: group
            })))
        }
        getData()
    }, [])

    const numberOfPortions = (ingredient) => _.countBy(repeatedAllIngredients, (rec) => rec._id === ingredient._id).true

    const quantityString = (portion, count, group, unit) => {
        const factor = {
            U: 1,
            g: 1,
            cs: 10,
            cp: 5,
            tz: group === 'hortalizas' ? 25 : group === 'otras verduras' ? 100 : 50
        }
        const quantity = portion * count * factor[unit]

        return `${quantity} ${unit === 'U' ? unit : 'g'}`
    }

    return <>
        <div className={classes.container}>
            <Typography variant='h4' color='primary'>Lista de la compra semanal</Typography>
            <Typography variant='body1'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>
            <Divider light='true' style={{ margin: '2em 0' }} />

            <div className={classes.groupContainer}>
                {foodLabels && foodLabels.map(food => allIngredients
                    .filter(ingredient => ingredient.group === food.key)
                    .length ? <div className={classes.group}>
                        <div className={classes.titleContainer}>
                            <img className={classes.icon} src={food.ref} alt="icon meal" />
                            <Typography variant='h6'>{food.label}</Typography>
                        </div>
                        <div>
                            {food.key === 'condimentos'
                                ? <Typography style={{ lineHeight: '2em' }} variant='body1'>{allIngredients
                                    .filter(ingredient => ingredient.group === food.key)
                                    .map(ingredient => firstUppercase(ingredient.name))
                                    .join(', ')
                                }</Typography>
                                : allIngredients
                                    .filter(ingredient => ingredient.group === food.key)
                                    .map(ingredient => <Grid container spacing={1} alignItems='center' style={{ lineHeight: '2em' }}>
                                        <Grid item xs={2}>
                                            <CheckBoxOutlineBlankIcon className={classes.tagIcon} />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant='body1'>{firstUppercase(ingredient.name)}</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant='body1'>{`${numberOfPortions(ingredient)}R (≈ ${quantityString(ingredient.portion, numberOfPortions(ingredient), ingredient.group, ingredient.unit)})`}</Typography>
                                        </Grid>
                                    </Grid>
                                    )}
                        </div>
                    </div>
                    : null)}
            </div>

            <div className={classes.legend}>
                <Typography variant='h6' color='primary'>Otros...</Typography>
                <div className={classes.chipContainer}>
                    <Typography align='center' variant='body1' >Fruta de temporada y frutos secos para los snacks. Otros condimentos, infusiones... </Typography>
                </div>
            </div>
        </div>
    </>
}


export default withRouter(GruposAlimentosRaciones)
