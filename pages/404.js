import { Box, Button, Text,  Image } from '@skynexui/components';
import Head from "next/head"
import frame  from  "../src/images/Frame-2.jpg"
import frameSmall from  "../src/images/Frame-Small.jpg"
import frame2Mobile  from  "../src/images/Android-Small.jpg"
import { useRouter } from "next/router"






function Page404() {
    //jsx
    const roteamento = useRouter()
    return (
    <>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet" />
        <title>404-Page not found</title>
        </Head>


        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: "transparent",
                
                backgroundImage: {lg: `url(${frame.src})`, md: `url(${frameSmall.src})`, sm: `url(${frameSmall.src})` ,xs: `url(${frame2Mobile.src})` },

                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                backgroundPosition: "center",
            }}
            >
            <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
                    <Text
                    styleSheet={{
                        fontFamily: "Patua One, cursive;",
                        fontSize:  {xs: "80px", lg:"120px"},
                        paddingBottom: {xs: "5", lg:"20px"}
                    }}
                    tag="h1"
                    >
                    404
                    </Text>

                    <Text
                    styleSheet={{
                        fontFamily: "Patua One, cursive;",
                        fontSize:  {xs: "15px", lg:"30px"},
                        padding:  {xs: "5px", lg:"10px"}
                    }}
                    tag="h3"
                    >
                    Você Perdeu o  Caminho de Casa  
                    </Text>

                    <Text
                    styleSheet={{
                        fontFamily: "Patua One, cursive;",
                        fontSize: {xs: "14px", lg:"18px"},
                        marginBottom: "40px",
                        textAlign: "center"
                    }}
                    tag="p"
                    >
                    Não se preocupe, você não está só, volte para o inicio.
                    </Text>

                    <Button 
                     buttonColors={{
                        contrastColor: '#FFFFFF',
                        mainColor: '#000000',
                        mainColorLight: '#E67635',
                        mainColorStrong: '#AB4E19'
                      }}
                    label="Home"
                    colorVariant="dark"
                    rounded="md"
                    size="md"
                    styleSheet={{
                      disabled: {},
                      focus: {},
                      hover: {
                        cursor: 'pointer'
                      }
                    }}
                    variant="secondary"
                    onClick={(event) =>  roteamento.push("/") }

                    />
            </Box>
        </Box>


    </>
    )
}


  
export default Page404












