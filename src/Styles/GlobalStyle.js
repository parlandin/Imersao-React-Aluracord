function GlobalStyle() {
    return (
        <style global jsx>{/*css*/`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      @font-face {
        font-family: "Retro gaming";
        src: url("/fonts/Retro-Gaming.ttf");
        }
        
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 

     /* SCHOLL BAR */

     ::-webkit-scrollbar {
        width: 5px;
      }
      
      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 5px;
      }
       
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #131212b9; 
        border-radius: 5px;
      }
      

    `}</style>
    );
}

export default GlobalStyle