import React, { useContext } from 'react'
import { makeStyles, Typography, Paper, Grid } from '@material-ui/core';
import { AuthContext } from '../../contexts/auth'
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment'
import { config } from './planConfig'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '3em',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    menuContainer: {
        marginTop: '3em',
    },
    mealContainer: {
        padding: '2em',
        margin: '1em',
        borderRadius: '20px'
    },
    recomContainer: {
        padding: '2em',
        margin: '3em 1em 4em 1em',
        borderRadius: '20px'
    },
    mealNameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundLightPrimary: {
        backgroundColor: theme.palette.primary.extraMegaLight
    },
    backgroundPrimary: {
        backgroundColor: theme.palette.primary.extraLight
    },
    backgroundSecondary: {
        backgroundColor: theme.palette.secondary.extraLight
    },
    img: {
        height: '3em',
        marginLeft: '0.5em'
    },
    portionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    portionName: {
        display: 'flex',
        padding: '0.2em',
        margin: '0.5em',
    },
    recomName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1em'
    },
    legend: {
        borderRadius: '20px',
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '70%'
    },
    imgLegend: {
        height: '1.5em',
        marginRight: '1em'
    },
}))

const MenuBase = () => {
    const classes = useStyles()

    const { selectedPlan: plan, selectedPatient: patient } = useContext(AuthContext)

    const { keyIconLabel } = config
    
    return <>
        <div className={classes.container}>
            <Typography variant='h4' color='primary'>Pauta nutricional</Typography>
            <Typography variant='body1'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>
            <div className={classes.menuContainer}>
                {plan.distribution.map(meal => <Paper className={`${classes.mealContainer} ${!['Desayuno', 'Comida', 'Cena'].includes(meal.name) ? classes.backgroundSecondary : classes.backgroundLightPrimary}`}>
                    <Grid spacing={5} direction='row' alignItems='center' container>
                        <Grid xs={2} item>
                            <div className={classes.mealNameContainer}>
                                <Typography variant='h5'>
                                    {meal.name}
                                </Typography>
                                <Typography color='secondary' variant='h6'>
                                    {meal.time}h
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={4} className={classes.portionContainer} item>
                            {keyIconLabel.map(({ icon, key }) => meal[key] ? <div className={classes.portionName}>
                                <Typography variant='h6' color='primary'>
                                    {meal[key]}x
                            </Typography>
                                <img className={classes.img} src={`/images/Food-icons/${icon}.png`} alt="icon meal" />
                            </div> : null)}
                        </Grid>
                        <Grid xs={6} item>
                            <Typography>
                                <div dangerouslySetInnerHTML={{
                                    __html: meal.text
                                }}></div>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>)}

                <Paper className={`${classes.recomContainer} ${classes.backgroundPrimary}`}>
                    <div className={classes.recomName}>
                        <ErrorIcon style={{ height: '2em', marginRight: '0.2em' }} color='primary' />
                        <Typography align='center' variant='h6' color='primary'>Recomendaciones generales:</Typography>
                    </div>
                    <Typography>
                        <div dangerouslySetInnerHTML={{
                            __html: plan.recommendations
                        }}></div>
                    </Typography>
                </Paper>

                <Paper className={classes.legend}>
                    {keyIconLabel.map(({ icon, label }) => <div className={classes.portionName}>
                        <img className={classes.imgLegend} src={`/images/Food-icons/${icon}.png`} alt="icon meal" />
                        <Typography variant='body1' color='primary'>
                            {label}
                        </Typography>
                    </div>)}
                </Paper>
            </div>
        </div>
    </>
}

export default MenuBase