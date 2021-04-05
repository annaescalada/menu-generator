import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
            {!isLoggedIn ? <Route
                render={(props) => <Component {...props} />}
                {...rest}
            /> : <Redirect to='/ingredients' />}
        </>
    );
}

export default PublicRoute