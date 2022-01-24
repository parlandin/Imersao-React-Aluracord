// Componente React 

function Title(props) {
    const Tag = props.tag
    return (
        <>
        <Tag>{props.children}</Tag>

        <style jsx>{ /*CSS */`
            ${Tag}{
                color:#323234;
                font-family:sans-serif;
            }`
        }
        </style>
        </>
    )
}


function HomePage() {
    //jsx
    return (
        <div>
            <Title tag="h1">Primeira pagina React!</Title>
            <a href="./about">About page</a>
        </div>
    )
}


  
export default HomePage












