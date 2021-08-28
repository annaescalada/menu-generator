import React, { useState, useContext } from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FeedbackContext } from '../contexts/feedback';

const Feedback = () => {
  const { message, setMessage } = useContext(FeedbackContext)

  return <Snackbar
    open={message}
    autoHideDuration={5000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    onClose={() => setMessage()}>
    <Alert severity='info'>
      {message}
    </Alert>
  </Snackbar>
}

export default Feedback