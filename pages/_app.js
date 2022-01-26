import GlobalStyle from '../src/components/GlobalStyle';
import HeadPage from '../src/components/HeadPages';
import { ThemeProvider } from '../contexts/ThemeContext';
import { UserProvider } from '../contexts/UserContext';

export default function CustomApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <HeadPage /> 
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </ThemeProvider>
    )
  }