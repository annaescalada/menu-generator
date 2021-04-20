import React, { useState, useEffect } from 'react';
import authService from '../services/auth';
import Loading from '../components/shared/Loading';
import { config } from '../pages/plans/planConfig'

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState()
    const [selectedPatient, setSelectedPatient] = useState({
        name: '',
        email: '',
        phone: '',
        height: 0
    })
    const [selectedPlan, setSelectedPlan] = useState({ distribution: config.defaultPlan })
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [selectedMenu, setSelectedMenu] = useState({
        name: ''
    })

    useEffect(() => {
        setIsLoading(true)
        getMe()
    }, [])

    const getMe = async () => {
        try {
            const { data: user } = await authService.me()
            setUser(user)
            setIsLoggedIn(true)
            setIsLoading(false)
        } catch (e) {
            setUser({})
            setIsLoggedIn(false)
            setIsLoading(false)
        }
    }

    const logMeOut = async () => {
        try {
            await authService.logout()
            setUser({})
            setIsLoggedIn(false)
        } catch (e) {
            setUser({})
            setIsLoggedIn(false)
        }
    }

    return <>
        {isLoading ? <Loading /> : (
            <AuthContext.Provider value={{
                user,
                isLoggedIn,
                me: getMe,
                logOut: logMeOut,
                selectedPatient,
                setSelectedPatient,
                selectedPlan,
                setSelectedPlan,
                selectedMenu,
                setSelectedMenu,
                selectedRecipes,
                setSelectedRecipes
            }}>
                {children}
            </AuthContext.Provider>
        )}
    </>
}

export default AuthProvider