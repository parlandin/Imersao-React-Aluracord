function Loading(){
    return (
    <>
        <p className="progress arc">Loading…</p>
    
        <style jsx>{/*css*/`
                .progress::before {
                    content: " ";
                    margin-inline-end: 0.25rem;
                    animation-duration: 0.67s;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .progress.arc::before {
                    animation-name: arc;
                }
                
                p{
                    font-size: 2em;
                    font-family: "Retro gaming", sans-serif;
                    color: #fff;
                }
                
                @keyframes arc {
                    0% {
                      content: "◜";
                    }
                    25% {
                      content: "◝";
                    }
                    50% {
                      content: "◞";
                    }
                    75% {
                      content: "◟";
                    }
                    100% {
                      content: "◜";
                    }
                  }
            `}


        </style>
    </>
    )
}


export default Loading