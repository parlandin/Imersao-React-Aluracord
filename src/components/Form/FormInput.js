import React, {useState} from "react"


function FormInput({type, handleOnSubmit, handleChangeLogin}){
    const [values, setValues ] = useState({email: "", senha: ""})

    function handleChange(e){
         const name =  e.target.name
         setValues({...values, [name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if(values.email < 0|| values.senha < 6){
            return alert("dados inválido , revise e tente novamente")
        }
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
                name="senha"
                />

                <span className="pass_info">
                    minimo 6 caracteres
                </span>
            </div>

            <button type="submit">{type}</button>
        </form>

        <input type="button"  className="button_login" onClick={handleChangeLogin}
        value={type == "Registrar" ? "Já tem uma Conta? Acesse aqui" : "não tem uma Conta? Criar nova"}/> 

        <style jsx>{/*css*/`
            form{
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                align-items: center;
            }
            form label {
                margin-bottom: 10px;
            }

            form div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                color: #ffffff;
                margin-bottom: 25px;
            }
            form div input {
                background-color: transparent;
                outline: none;
                border: 2px solid #000;
                box-shadow: 3px 4px 0px 0px #fff;
                font-size: 1.4em;
                height: 30px;
            }

            form button {
                padding: 5px 20px;
                border: 1px solid #000;
                background: transparent;
                color: #ffffff;
                font-size: 1.2em;
                cursor: pointer;
                box-shadow: 3px 4px 0px 0px #fff;
                margin-bottom: 20px;
                font-family: "Retro gaming", sans-serif;
            }

            input.button_login {
                background: transparent;
                border: none;
                color: #fff;
                cursor: pointer;
                font-family: "Retro gaming", sans-serif;
            }
            .pass_info {
                font-size: 0.7em;
                margin-top:10px ;
            }
        `}
        </style>
    </>
    )
}

export default FormInput