import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'
import React, { useContext, useState, useEffect } from 'react'
import Head from "next/head"
import ThemeChangeButton from '../src/components/ThemeChangeButton'
import Titulo from '../src/components/Titulo'
import { useRouter } from "next/router"
import { ThemeContext } from '../contexts/ThemeContext'
import { UserContext } from '../contexts/UserContext'





export default function PaginaInicial() {
    /* const Theme = useContext(ThemeContext).temaTest
    const setTheme =  useContext(ThemeContext).setTemaTest */

    /* const username = useContext(UserContext).userName
    const setUserName = useContext(UserContext).setUserName */
    const { userName, setUserName } = useContext(UserContext)


    const router = useRouter()

    /* const [username, setUserName] = useState("Gu-Parlandim") */


    /* const [defaultTheme, setDefaultTheme] = useState(appConfig.defaultTheme) */
    const defaultTheme = useContext(ThemeContext).defaultTheme
    const setDefaultTheme = useContext(ThemeContext).setDefaultTheme

    useEffect(()=> {
        document.title = `AluraCord  ${defaultTheme.name.length > 1 ? "-" + defaultTheme.name : ""}`
    })

    function changerTheme(theme) {
        setDefaultTheme(theme)
    }


    return (
        <>
            <Head>
                <title>Aluracord</title>
            </Head>


            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: "transparent" //appConfig.theme.colors.primary[500],
                    ,
                    backgroundImage: defaultTheme.backgroundImage,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: defaultTheme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        onSubmit={event => {
                            event.preventDefault()
                            router.push("/chat",)
                        }
                        }

                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2" styleSheet={{ color: defaultTheme.colors.primary[500] }}>Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: defaultTheme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={userName}

                            onChange={event => {
                                const newName = event.target.value
                                let tamanho = newName.length
                                if (tamanho > 0) {
                                    setUserName(newName)
                                } else {
                                    setUserName("")
                                }

                            }
                            }




                            fullWidth

                            textFieldColors={{
                                neutral: {
                                    textColor: defaultTheme.colors.neutrals[200],
                                    mainColor: defaultTheme.colors.neutrals[900],
                                    mainColorHighlight: defaultTheme.colors.primary[500],
                                    backgroundColor: defaultTheme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: defaultTheme.colors.neutrals["000"],
                                mainColor: /* defaultColor */ defaultTheme.colors.primary[500],
                                mainColorLight: defaultTheme.colors.primary[400],
                                mainColorStrong: defaultTheme.colors.primary[600],
                            }}
                        />

                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '25px',
                                borderRadius: '10px',
                                flex: 1,
                            }}
                        >
                            <ThemeChangeButton theme={appConfig.theme2} color="#f107ce" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.theme3} color="#14a530" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.theme4} color="#0636d1" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.theme6} color="#f30101" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.theme7} color="#32009f" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.theme5} color="#f1f0009c" event={changerTheme}></ThemeChangeButton>

                            <ThemeChangeButton theme={appConfig.defaultTheme} color="#c96b00" event={changerTheme}></ThemeChangeButton>
                        </Box>

                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: defaultTheme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: defaultTheme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={ userName.length > 2 
                                ? (`https://github.com/${userName}.png`) 
                                : (`https://github.com/gu-parlandim.png`)}
                                    
                            
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: defaultTheme.colors.neutrals[200],
                                backgroundColor: defaultTheme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {userName}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}