import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useContext, useState, useEffect } from 'react';
import appConfig from '../config.json';
import Head from "next/head"
import { UserContext } from '../contexts/UserContext'
import { useRouter } from 'next/router';
import { ThemeContext } from '../contexts/ThemeContext'
import { createClient } from '@supabase/supabase-js'



export async function getServerSideProps(context) {
    return {
      props: {
            baseUrl: process.env.SUPERBASE_URL,
            anonKey: process.env.SUPERBASE_ANON_KEY

        }, // will be passed to the page component as props
    }
  }



export default function ChatPage({baseUrl, anonKey}) {
    // Sua lógica vai aqui
    const { userName } = useContext(UserContext)
    const router = useRouter()

    let Theme = appConfig.defaultTheme
    const { defaultTheme } = useContext(ThemeContext)


    //Banco de Dados
    
    const superbase = createClient(baseUrl, anonKey )

    

     /* async function receberDados(){
        superbase
        .from("mensagens-date")
        .select("*")
        .then( ( { data } ) => data)
    } */


    /* const  [dados , setNewDados ] = useState([]) */
        
   /*  async function receberDados(){
        superbase
        .from("mensagens-date")
        .select("*")
        .then( ( { data } ) => setNewDados(data))
    }
 */

    const [userMensangem, setUserMensagem] = useState([])
    const [mensage, setNewMensage] = useState() 

    useEffect(() => {
        superbase
        .from("mensagens-date")
        .select("*")
        .order("id", { ascending:false})
        .then( ( { data } ) =>  setUserMensagem(data))
        console.log("mudou")
    }, [])
    
    


    function handleNewMessage(date){
        const newMensage = {
            userName: `${userName}`,
            texto: date,
        }
        superbase
            .from("mensagens-date")
            .insert([newMensage])
            .then((date) => {
                setUserMensagem([ newMensage, ...userMensangem,] 
                )
            })

       /*  setUserMensagem([
            {
                
            }, ...userMensangem,] 
        )*/

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

                        {<MessageList defaultTheme={defaultTheme} mensagens={userMensangem} userName={userName} />}

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

function MessageList({ defaultTheme, mensagens, userName }) {
    /* const defaultTheme = props.theme */

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

            {/* props. */mensagens.map((date) => {
                console.log(date)
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
                                src={`https://github.com/${userName}.png`}
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
                        {date.texto}
                    </Text>

                )
            })}
        </Box>
       
    )
}