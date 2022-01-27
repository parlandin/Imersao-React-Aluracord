import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useContext, useState, useEffect } from 'react';
import appConfig from '../config.json';
import Head from "next/head"
import { UserContext } from '../contexts/UserContext'
import { useRouter } from 'next/router';
import { ThemeContext } from '../contexts/ThemeContext'
import { createClient } from '@supabase/supabase-js'




export default function ChatPage() {
    // Sua lógica vai aqui
 
    //Banco de Dados
    const baseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL
    const anonKey =  process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY
    const superbase = createClient(baseUrl, anonKey )

    superbase
    .from("mensagens-date")
    .select("*")
    .then( (date) => console.log(date))
 









    let Theme = appConfig.defaultTheme
    const { defaultTheme } = useContext(ThemeContext)
    /* const setDefaultTheme = useContext(ThemeContext).setDefaultTheme */

    const router = useRouter()


    const [userMensangem, setUserMensagem] = useState([{
        userName: `Gustavo Parlandim`,
        id: 0,
        userPhoto: "https://avatars.githubusercontent.com/u/56051040?v=4",
        message: "Olá, seja Bem vindo ao chat!"
        }
    ])


    const { userName } = useContext(UserContext)

    const [mensage, setNewMensage] = useState() 


    function handleNewMessage(date){
        setUserMensagem([
            {
                id: `${userMensangem.length}` ,
                userName: `${userName}`,
                userPhoto: `https://github.com/${userName}.png`,
                message: date
            }, ...userMensangem,]
        )
        setNewMensage("")
    }

    // ./Sua lógica vai aqui
    return (
        <>
            <Head>
                <title>Aluracord - Chat</title>
            </Head>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: "transparent"/* defaultTheme.colors.primary[500] */,
                    backgroundImage: defaultTheme.backgroundImage,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    color: defaultTheme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: defaultTheme.colors.neutrals[700],
                        height: '100%',
                        maxWidth: '90%',
                        maxHeight: '95vh',
                        padding: '32px',
                    }}
                >
                    <Header router={router} />
                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: defaultTheme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >

                        {<MessageList theme={defaultTheme} mensagens={userMensangem} />}

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: defaultTheme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: defaultTheme.colors.neutrals[200],
                                }}
                                value={mensage}
                                onChange={(event) => {
                                    setNewMensage(event.target.value)
                                }}

                                onKeyPress={(event) => {
                                    if (event.key === "Enter"){
                                        event.preventDefault()
                                        handleNewMessage(mensage)
                                    }
                                }}


                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header({router}) {
    const setUserName = useContext(UserContext).setUserName

    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    onClick={(event => {
                        event.preventDefault()
                        setUserName("")
                        router.push("/")
                    })}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const defaultTheme = props.theme

    return (
        <Box 
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: defaultTheme.colors.neutrals["000"],
                marginBottom: '16px',
                backgroundColor: defaultTheme.colors.neutrals[700],
            }}
        >

            {props.mensagens.map((date) => {
                return (
                    <Text
                        key={date.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: defaultTheme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={date.userPhoto}
                            />
                            <Text tag="strong">
                                {date.userName}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: defaultTheme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {date.message}
                    </Text>

                )
            })}
        </Box>
       
    )
}