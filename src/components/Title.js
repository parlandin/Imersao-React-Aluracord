

function Titulo(props) {
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`

                ${Tag} {
                    color: #ffffff;
                    font-size: 2.4em;
                    font-weight: 600;
                    /* font-family: "Retro gaming", sans-serif; */
                }
            `}</style>
        </>
    );
}


export default  Titulo