import React from 'react'
import Header from './Header'
import Feedback from './Feedback';

const App = ({ children }) => <div>
        <Header/>
        {children}
        <Feedback />
</div>

export default App