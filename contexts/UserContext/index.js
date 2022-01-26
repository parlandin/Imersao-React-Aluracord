import React,  { createContext, useState } from "react"

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [userName, setUserName] = useState("Gu-Parlandim")

    return (
        <UserContext.Provider value={{userName, setUserName}}>
            {children}
        </UserContext.Provider>
    )
}