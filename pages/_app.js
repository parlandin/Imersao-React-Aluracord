import GlobalStyle from '../src/components/GlobalStyle';
import HeadPage from '../src/components/HeadPages';
import { AuthContextProvider } from '../hooks/UserContext';

export default function CustomApp({ Component, pageProps }) {
    return (
    <>
        <GlobalStyle />
        <HeadPage /> 
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    </>
    )
  }