import React, { useState, useContext } from 'react'
import { Button, Typography } from '@material-ui/core';
import authService from '../services/auth';
import { AuthContext } from '../contexts/auth';
import { authorize } from '../services/api';
import TextInput from '../components/shared/TextInput';
import { makeStyles } from '@material-ui/styles';
import { FeedbackContext } from '../contexts/feedback';

const useStyles = makeStyles((theme) => {
    console.log('theme ===>', theme)
    return({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em'
    },
    button: {
        color: 'white',
        margin: '1em'
    },
    text: {
        marginLeft: '1em',
        marginTop: '1em',
        color: theme.palette.secondary.dark
    }
})})


const Login = () => {
    const classes = useStyles()

    const { me } = useContext(AuthContext)
    const { message, setMessage } = useContext(FeedbackContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const { data: { token } } = await authService.login({ email, password })
            authorize(token)
            me()
        } catch(e) {
            setMessage(e?.response?.data?.message)
        }
    }

    return <div className={classes.container}>
        <TextInput value={email} onChange={(v) => setEmail(v)} required label="email" />
        <TextInput value={password} onChange={(v) => setPassword(v)} type="password" required type='password' label="password" />
        <Button className={classes.button} onClick={handleLogin} onClick={handleLogin} color="secondary" variant="contained">Log in</Button>
    </div>
}

export default Login