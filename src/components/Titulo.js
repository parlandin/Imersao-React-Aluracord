
export default 
function Titulo(props) {
    const Tag = props.tag || 'h1';
    const Cor = props.styleSheet.color

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${Cor};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}