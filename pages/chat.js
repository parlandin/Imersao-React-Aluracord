import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useContext, useState, useEffect } from 'react';
import appConfig from '../config.json';
import Head from "next/head"
import { UserContext } from '../contexts/UserContext';
import { useRouter } from 'next/router';
import { ThemeContext } from '../contexts/ThemeContext'




export default function ChatPage() {
    // Sua lógica vai aqui
 
    let defaultTheme = useContext(ThemeContext).defaultTheme


    const router = useRouter()



    const [userMensangem, setUserMensagem] = useState([{
        userName: `Gustavo Parlandim`,
        id: 0,
        userPhoto: "https://avatars.githubusercontent.com/u/56051040?v=4",
        message: "Olá, seja Bem vindo ao chat!"
        }
    ])


    const username = useContext(UserContext).userName

    const [mensage, setNewMensage] = useState() 


    function handleNewMessage(date){
        setUserMensagem([
            {
                id: `${userMensangem.length}` ,
                userName: `${username}`,
                userPhoto: `https://github.com/${username}.png`,
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
                    backgroundColor: defaultTheme.colors.primary[500],
                    backgroundImage: defaultTheme.backgroundImage,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    color: appConfig.defaultTheme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.defaultTheme.colors.neutrals[700],
                        height: '100%',
                        maxWidth: '95%',
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
                            backgroundColor: appConfig.defaultTheme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >

                        {<MessageList mensagens={userMensangem} />}

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
                                    backgroundColor: appConfig.defaultTheme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.defaultTheme.colors.neutrals[200],
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


    return (
        <Box 
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.defaultTheme.colors.neutrals["000"],
                marginBottom: '16px',
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
                                backgroundColor: appConfig.defaultTheme.colors.neutrals[700],
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
                                    color: appConfig.defaultTheme.colors.neutrals[300],
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