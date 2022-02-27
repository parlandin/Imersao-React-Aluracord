import React, {useState} from "react"


function FormInput({type, handleOnSubmit, handleChangeLogin}){
    const [values, setValues ] = useState({email: "", senha: ""})

    function handleChange(e){
         const name =  e.target.name
         setValues({...values, [name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        handleOnSubmit(values)
    }
    return (
    <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="text" 
                onChange={handleChange} 
                value={values.email} 
                name="email"/>
            </div>

            <div>
                <label>Senha:</label>
                <input type="password"
                onChange={handleChange} 
                value={values.senha}  
                name="senha"/>

                <span className="pass_info">minimo 6 caracteres</span>
            </div>
            <button type="submit">{type}</button>
        </form>

        <input type="button"  className="button_login" onClick={handleChangeLogin}
        value={type == "Registrar" ? "já tem uma conta? entra" : "não tem uma conta? registre"}/> 

        <style jsx>{/*css*/`
            form{
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                align-items: center;
            }
            form label {
                margin-bottom: 5px;
            }

            form div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                color: #ffffff;
                margin-bottom: 10px;
            }
            form div input {
                background-color: transparent;
                outline: none;
                border: 1px solid #000;
                font-size: 1.4em;
                height: 30px;
            }

            form button {
                padding: 5px 20px;
                border: 1px solid #000;
                background: transparent;
                color: #ffffff;
                font-size: 1.5em;
                cursor: pointer;
            }

            input.button_login {
                background: transparent;
                border: none;
                color: #fff;
                cursor: pointer;
            }
            .pass_info {
                font-size: 0.7em;
                margin-top:5px ;
            }
        `}
        </style>
    </>
    )
}

export default FormInput