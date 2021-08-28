import React from 'react'
import { CircularProgress } from '@material-ui/core';

const Loading = () => <div style={{ width: '100%', padding: '2em', display: 'flex', justifyContent: 'center'}}>
    <CircularProgress />
</div>

export default Loading