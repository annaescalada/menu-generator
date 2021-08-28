import React, { useState } from 'react'

export const FeedbackContext = React.createContext()

const FeedbackProvider = ({ children }) => {
    const [message, setMessage] = useState()

    return <FeedbackContext.Provider value={{ message, setMessage }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackProvider