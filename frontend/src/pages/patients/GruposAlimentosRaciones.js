import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";
import patientService from '../../services/patient';
import { makeStyles, Paper, Typography, Grid, AppBar, Toolbar } from '@material-ui/core';
import sharedService from '../../services/shared';
import ingredientsService from '../../services/ingredients'
import ErrorIcon from '@material-ui/icons/Error';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import _ from 'lodash'
import moment from 'moment'

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
    ingredientContainer: {
        margin: '0.2em 0 0 1em',
        lineHeight: '1.8em'
    }
}))

const GruposAlimentosRaciones = (props) => {
    const classes = useStyles()

    const { id: patientId } = props.match.params

    const [enums, setEnums] = useState({})
    const [patient, setPatient] = useState({})
    const [allIngredients, setAllIngredients] = useState()
    const [foodLabels, setFoodLabels] = useState()

    const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    useEffect(() => {
        const getData = async () => {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            const { data: { patient: retrievedPatient } } = await patientService.getPatient(patientId)
            setPatient(retrievedPatient)

            console.log(retrievedPatient)

            const { data: { ingredients: retrievedIngredients } } = await ingredientsService.getAllIngredients()
            setAllIngredients(_.orderBy(retrievedIngredients
                .filter(ingredient => _.intersection(retrievedPatient.tags || [], ingredient.tags).length === 0
                )), ['name'], ['asc'])

            setFoodLabels(retrievedEnums.groupEnum.map((group, index) => ({
                index,
                label: firstUppercase(group),
                ref: `/images/Food-icons/${group.split(' ').join('_')}.png`,
                key: group
            })))
        }
        getData()
    }, [])

    console.log(foodLabels)

    return <>
        <div className={classes.container}>
            <Typography variant='h6' color='primary'>Grupos de alimentos y ración recomendada</Typography>
            <Typography variant='subtitle2'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>

            <div>
                {foodLabels && foodLabels.map(food => <>
                    {allIngredients
                        .filter(ingredient => ingredient.group === food.key)
                        .length ? <div className={classes.titleContainer}>
                            <img className={classes.icon} src={food.ref} alt="icon meal" />
                            <Typography variant='h6'>{food.label}</Typography>
                        </div> : null}
                    <div>
                        {food.key === 'condimentos'
                            ? <Typography className={classes.ingredientContainer} variant='body1'>{allIngredients
                                .filter(ingredient => ingredient.group === food.key)
                                .map(ingredient => firstUppercase(ingredient.name))
                                .join(', ')
                                + '...'
                            }</Typography>
                            : allIngredients
                                .filter(ingredient => ingredient.group === food.key)
                                .map(ingredient => <Grid className={classes.ingredientContainer} alignItems='center' container>
                                    <Grid xs={8} style={{ display: 'flex', alignItems: 'center' }} item>
                                        <Typography variant='body1'>{firstUppercase(ingredient.name)}</Typography>
                                        {ingredient.tags ?.includes('semiprocesado') && <ErrorIcon style={{ height: '0.6em', marginLeft: '0.2em' }} color='secondary' />}
                                    </Grid>
                                    <Grid xs={2} item>
                                        <Typography variant='body1'>{`${ingredient.portion} ${ingredient.unit}`}</Typography>
                                    </Grid>
                                    <Grid xs={2} style={{ display: 'flex' }} item>
                                        {ingredient.season ?.includes('verano') && <WbSunnyIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('otoño') && <CloudIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('invierno') && <AcUnitIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('primavera') && <LocalFloristIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />}
                                    </Grid>
                                </Grid>
                                )}
                    </div>
                </>
                )}
            </div>

            <Paper className={classes.legend}>
                {!patient.tags ?.includes('semiprocesado') && <ErrorIcon style={{ height: '0.6em', marginLeft: '0.2em' }} color='secondary' />}
                {!patient.tags ?.includes('semiprocesado') && <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Semi-procesado</Typography>}
                <WbSunnyIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Verano</Typography>
                <CloudIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Otoño</Typography>
                <AcUnitIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Invierno</Typography>
                <LocalFloristIcon style={{ height: '0.6em', marginLeft: '0.2em' }} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Primavera</Typography>
            </Paper>
        </div>
    </>
}


export default withRouter(GruposAlimentosRaciones)
