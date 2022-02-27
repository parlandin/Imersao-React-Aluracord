import React,  { createContext, useState , useContext, useEffect} from "react"
import supabase from "../../services/supabase"

export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const user = supabase.auth.user()
        if(user){
            setUser(user)
        }
    })

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}