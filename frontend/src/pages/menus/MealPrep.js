import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { AuthContext } from '../../contexts/auth';
import { Typography, Card, CardMedia, CardContent, Chip, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import sharedService from '../../services/shared';
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { config } from '../recipes/recipesConfig'


const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '1em'
    },
    content: {
        padding: '1.5em'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    container: {
        padding: '3em',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    titleContainer: {
        display: 'flex',
        alignContent: 'center',
        margin: '1.5em 0'
    },
    icon: {
        height: '1.5em',
        marginRight: '1em'
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '1em',
        padding: '1em'
    },
    chip: {
        margin: '0.5em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    }
}))


const MealPrep = () => {
    const classes = useStyles()

    const { recipeStructure } = config

    const { selectedRecipes, selectedPatient: patient } = useContext(AuthContext)

    const [enums, setEnums] = useState([])

    const getIngredientsList = (recipe) => recipeStructure(recipe).map(({ options, factor }) => {
        const filteredIngredients = recipe.ingredients ?.filter(ingredient => options.includes(ingredient.group))
       
        const groupLength = filteredIngredients ?.length
       
        return filteredIngredients ?.map(({ name, portion, unit }) => {
            const recipePortion = factor ? portion * factor / groupLength : portion

            return <Typography>{recipePortion}{unit} {name}</Typography>
        })
    })

    useEffect(() => {
        const getData = async () => {
            const { data: { enums: retrievedEnums } } = await sharedService.getEnums()
            setEnums(retrievedEnums)
        }
        getData()
    }, [])

    return <>
        <div className={classes.container}>
            <Typography variant='h4' color='primary'>Listado de recetas</Typography>
            <Typography variant='body1'>{patient.name} - {moment().format('DD/MM/yy')}</Typography>
            <Divider light='true' style={{ margin: '2em 0' }} />
            <Grid container spacing={5}>
                {selectedRecipes.map(recipe => <Grid item xs={4}>
                    <Card className={classes.root}>
                        {recipe.image && <CardMedia
                            className={classes.media}
                            image={recipe.image}
                            title={recipe.name}
                        />}
                        <CardContent className={classes.content}>
                            <Typography align='center' variant='h5'>{recipe.name}</Typography>
                            <div className={classes.chipContainer}>
                                <Chip className={classes.chip} icon={<AccessTimeIcon />} label={`${recipe.duration}'`} alt="icon meal" color='secondary' />
                                {recipe.utensils.map(utensil => <Chip className={classes.chip} label={utensil} alt="icon meal" color='secondary' />)}


                            </div>
                            <Typography variant='h6' color='primary'>Ingredientes</Typography>
                            {getIngredientsList(recipe)}
                            <Divider light='true' style={{ margin: '1em 0' }} />
                            <Typography variant='h6' color='primary'>Preparación</Typography>
                            <Typography><div dangerouslySetInnerHTML={{ __html: recipe.preparation }}></div></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                )}
            </Grid>
        </div>
    </>
}

export default MealPrep