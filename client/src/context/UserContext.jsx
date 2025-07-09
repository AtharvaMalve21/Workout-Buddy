import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const values = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }

    const URI = import.meta.env.VITE_BACKEND_URI;


    const fetchUserDetails = async () => {
        try {

            const { data } = await axios.get(`${URI}/api/v1/users/profile`, {
                withCredentials: true
            });

            if (data.success) {
                setUser(data.data);
            }

        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [isLoggedIn])

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}