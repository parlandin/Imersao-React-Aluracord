import FormHeader from "./FormHeader"
import FormInput from "./FormInput"
import React, {useState} from "react"
import supabase from "../../../services/supabase"
import { useAuth } from "../../../hooks/UserContext"
import { useRouter } from "next/router"
import Loading from "../Loading"


function Form(){
    const [loggin, setLoggin] = useState(false)
    const router = useRouter()
    const [user, setUser] = useAuth()
    const [loading, setLoadin] = useState(false)

    async function handleLogin(date){
        setLoadin(true)
        let { user, error } = await supabase.auth.signIn({
            email: date.email,
            password: date.senha
          })
        if (error){
            console.log(error)
            return
        }
        setUser(user)
        router.push("/chat")
    }

    async function handleRegistre(date){
        setLoadin(true)
        let { user, error } = await supabase.auth.signUp({
            email: date.email,
            password: date.senha
          })
        if (error){
            console.log(error)
            return
        }
        setUser(user)
    }

    function handleChangeLogin(){
        setLoggin(!loggin)

    }
    return (
    <>  {loading ? <Loading /> :
            user  || loggin
            ?   <div>
                <FormHeader />
                <FormInput 
                type="Entrar"
                handleOnSubmit={handleLogin}
                handleChangeLogin={handleChangeLogin}/>
                </div>

            : <div>
                <FormHeader />
                <FormInput 
                type="Registrar"
                handleOnSubmit={handleRegistre}
                handleChangeLogin={handleChangeLogin}/>
                </div>
            
        }
        
        <style jsx>{/*css*/`
            @font-face {
                font-family: "Retro gaming";
                src: url("/fonts/Retro-Gaming.ttf");
            }
            *{
                font-family: "Retro gaming", sans-serif;
            }
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `}
        </style>
    </>
    )
   
}

export default Form

