import React from 'react'
import _ from 'lodash'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from '../styles';

const TopButtons = () => {
    const classes = useStyles()

    return <div className={classes.topButtons}>
        <Link className={classes.link} to={`/menu-grid`}>
            <Button
                className={classes.docButton}
                onClick={() => { }}
                color="primary"
                variant="outlined"
            >
                Menú
            </Button>
        </Link>
        <Link className={classes.link} to={`/grocery-list`}>
            <Button
                className={classes.docButton}
                onClick={() => { }}
                color="primary"
                variant="outlined"
            >
                List a de la compra
            </Button>
        </Link>
        <Link className={classes.link} to={`/recipe-book`}>
            <Button
                className={classes.docButton}
                onClick={() => { }}
                color="primary"
                variant="outlined"
            >
                Recetario
            </Button>
        </Link>
    </div>

}

export default TopButtons

