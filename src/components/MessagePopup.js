

function MessagePopup({type, message} ){
    const cor = type == "error" ? "#c44040" : "#265d2bdb"

    return (
    <>
        <div>
            <p>{message}</p>
        </div>

        <style jsx>{/*css*/`
            div {
                display: flex;
                justify-content:center;
                align-items:center;
                z-index: 4;
            }
            
            p {
                font-size: 1.2em;
                color: #fff;
                min-height: 60px;
                background-color: ${cor};
                min-width: 300px;
                text-align: center;
                line-height: 60px;
            }
        `}
        </style>
    </>
    )
}


export default MessagePopup