import React, { useState, useContext } from 'react'

import { Button, Paper } from '@material-ui/core'

import { AuthContext } from '../../contexts/auth'
import { FeedbackContext } from '../../contexts/feedback'
import TextInput from '../shared/TextInput'
import { useStyles } from '../Header/styles'
import { handleLogin } from './helpers'

const Login = () => {
    const classes = useStyles()

    const { me } = useContext(AuthContext)
    const { setMessage } = useContext(FeedbackContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <Paper className={classes.container}>
        <TextInput value={email} onChange={(v) => setEmail(v)} required label="email" />
        <TextInput value={password} onChange={(v) => setPassword(v)} type="password" required type='password' label="password" />
        <Button className={classes.button} onClick={handleLogin} onClick={() => handleLogin(email, password, me, setMessage)} color="secondary" variant="contained">Log in</Button>
    </Paper>
}

export default Login