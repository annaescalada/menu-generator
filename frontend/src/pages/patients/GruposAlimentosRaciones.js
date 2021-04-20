import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from "react-router";
import patientService from '../../services/patient';
import { makeStyles, Paper, Typography, Grid, AppBar, Toolbar } from '@material-ui/core';
import sharedService from '../../services/shared';
import ingredientsService from '../../services/ingredients'
import ErrorIcon from '@material-ui/icons/Error';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import _ from 'lodash'
import moment from 'moment'
import { AuthContext } from '../../contexts/auth';

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
    ingredientContainer: {
        margin: '0.2em 0 0 1em',
        lineHeight: '1.8em'
    },
    tagIcon: {
        height: '0.6em',
        marginLeft: '0.2em'
    }
}))

const GruposAlimentosRaciones = (props) => {
    const classes = useStyles()

    const { selectedPatient: patient, setSelectedPatient: setPatient } = useContext(AuthContext)

    const [enums, setEnums] = useState({})
    const [allIngredients, setAllIngredients] = useState()
    const [foodLabels, setFoodLabels] = useState()

    const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    useEffect(() => {
        const getData = async () => {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)

            const { data: { ingredients: retrievedIngredients } } = await ingredientsService.getAllIngredients()

            let filteredIngredients = retrievedIngredients

            if (patient ?.toIncludeTags ?.length) {
                filteredIngredients = retrievedIngredients
                    .filter(ingredient => _.intersection(patient.toIncludeTags || [], ingredient.tags).length !== 0)
            }

            if (patient ?.toExcludeTags ?.length) {
                filteredIngredients = retrievedIngredients
                    .filter(ingredient => _.intersection(patient.toExcludeTags || [], ingredient.tags).length === 0)
            }

            setAllIngredients(_.orderBy(filteredIngredients), ['name'], ['asc'])

            setFoodLabels(retrievedEnums.groupEnum.map((group, index) => ({
                index,
                label: firstUppercase(group),
                ref: `/images/Food-icons/${group.split(' ').join('_')}.png`,
                key: group
            })))
        }
        getData()
    }, [])
    console.log(patient)

    console.log(foodLabels)

    return <>
        <div className={classes.container}>
            <Typography variant='h4' color='primary'>Grupos de alimentos y ración recomendada</Typography>
            <Typography variant='body1'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>

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
                            }</Typography>
                            : allIngredients
                                .filter(ingredient => ingredient.group === food.key)
                                .map(ingredient => <Grid className={classes.ingredientContainer} alignItems='center' container>
                                    <Grid xs={8} style={{ display: 'flex', alignItems: 'center' }} item>
                                        <Typography variant='body1'>{firstUppercase(ingredient.name)}</Typography>
                                        {ingredient.tags ?.includes('semiprocesado') && <ErrorIcon className={classes.tagIcon} color='secondary' />}
                                        {ingredient.tags ?.includes('cocido') && <WatchLaterIcon className={classes.tagIcon} color='primary' />}
                                    </Grid>
                                    <Grid xs={2} item>
                                        <Typography variant='body1'>{`${ingredient.portion} ${ingredient.unit}`}</Typography>
                                    </Grid>
                                    <Grid xs={2} style={{ display: 'flex' }} item>
                                        {ingredient.season ?.includes('verano') && <WbSunnyIcon className={classes.tagIcon} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('otoño') && <CloudIcon className={classes.tagIcon} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('invierno') && <AcUnitIcon className={classes.tagIcon} size='small' color='secondary' />}
                                        {ingredient.season ?.includes('primavera') && <LocalFloristIcon className={classes.tagIcon} size='small' color='secondary' />}
                                    </Grid>
                                </Grid>
                                )}
                    </div>
                </>
                )}
            </div>

            <Paper className={classes.legend}>
                {!patient.tags ?.includes('semiprocesado') && <ErrorIcon className={classes.tagIcon} color='secondary' />}
                {!patient.tags ?.includes('semiprocesado') && <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Semi-procesado</Typography>}
                {!patient.tags ?.includes('cocido') && <WatchLaterIcon className={classes.tagIcon} color='primary' />}
                {!patient.tags ?.includes('cocido') && <Typography style={{ marginRight: '2em' }} variant='subtitle2'>cocido</Typography>}
                <WbSunnyIcon className={classes.tagIcon} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Verano</Typography>
                <CloudIcon className={classes.tagIcon} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Otoño</Typography>
                <AcUnitIcon className={classes.tagIcon} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Invierno</Typography>
                <LocalFloristIcon className={classes.tagIcon} size='small' color='secondary' />
                <Typography style={{ marginRight: '2em' }} variant='subtitle2'>Primavera</Typography>
            </Paper>
        </div>
    </>
}


export default withRouter(GruposAlimentosRaciones)
