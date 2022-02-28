
function CustomButtonOne( { children , onClick} ) {
    return (
    <>
       <button type="button" onClick={onClick}>
          <img src={children} alt={children}></img>
        </button>
       <style jsx>{/* CSS */`
            button {
                
                background-color: transparent;
                color: red;
                border: none;
            }
            button:hover {
                cursor: pointer;
            }
            
       `}
       </style>
    </>
    )
}

export default CustomButtonOne