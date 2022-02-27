import FormHeader from "./FormHeader"
import FormInput from "./FormInput"
import React, {useState} from "react"
import supabase from "../../../services/supabase"
import { useAuth } from "../../../hooks/UserContext"
import { useRouter } from "next/router"
import Loading from "../Loading"
import MessagePopup from "../MessagePopup"



function Form(){
    const [stateLogin, setStateLogin] = useState({
        loading: false,
        PopupMessage: false,
        message: "",
        type: "success"
    })

    const router = useRouter()
    const [user, setUser] = useAuth()
    

    async function handleLogin(date){
        setStateLogin({...stateLogin, loading: true})
        let { user, error } = await supabase.auth.signIn({
            email: date.email,
            password: date.senha,
          })
          
        if (error){
            console.log(error)
            setStateLogin({...stateLogin, loading: false})
            setStateLogin({...stateLogin, PopupMessage: true, message: error.message, type: "error"})

            const inteval = setTimeout(() => setStateLogin({...stateLogin, PopupMessage: false}), 1500)
            return () => clearInterval(inteval)
        }
        setUser(user)
        router.push("/chat")
    }

    async function handleRegistre(date){
        setStateLogin({...stateLogin, loading: true})
        let { user, error } = await supabase.auth.signUp({
            email: date.email,
            password: date.senha
          })

        if (error){
            setStateLogin({...stateLogin, loading: false})
            setStateLogin({...stateLogin, PopupMessage: true, message: error.message, type: "error"})
            
            const inteval = setTimeout(() => setStateLogin({...stateLogin, PopupMessage: false}), 1500)
            return () => clearInterval(inteval)
        }


        setStateLogin({...stateLogin, loading: false, PopupMessage: true, message: "  Confirme seu email para continuar  ", type: "success"})

        const inteval = setTimeout(() => setStateLogin({...stateLogin, PopupMessage: false}), 1500)
        return () => clearInterval(inteval)
    }


    function handleChangeLogin(){
        setStateLogin(!stateLogin)

    }


    return (
    <>  
        {stateLogin.PopupMessage ? <MessagePopup type={stateLogin.type} message={stateLogin.message}/> :
            stateLogin.loading ? <Loading /> :
                    user  || stateLogin
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

