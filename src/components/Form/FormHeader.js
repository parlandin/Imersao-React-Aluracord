import Title from "../Title"


function FormHeader(){
    return (
        <>
        <div>
            <Title >
                Bem vindo!
            </Title>
            <span>Discord - Alura Gaming</span>
        </div>
        <style jsx> {/*css*/`
            span{
                font-size: .8em;
                color: #ffffff;
            }
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 20px;
            }
        `}
        </style>

        </>
    )
}


export default FormHeader