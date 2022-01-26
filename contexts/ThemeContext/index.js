import  React, { createContext, useState } from "react";
import appConfig from '../../config.json'



export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {

    const [defaultTheme, setDefaultTheme] = useState(appConfig.defaultTheme)

    return (
        <ThemeContext.Provider value={{defaultTheme, setDefaultTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}