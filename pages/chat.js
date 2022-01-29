import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useContext, useState, useEffect } from 'react';
import Head from "next/head"
import { UserContext } from '../contexts/UserContext'
import { useRouter } from 'next/router';
import { ThemeContext } from '../contexts/ThemeContext'
import { createClient } from '@supabase/supabase-js'
import CustomButton from '../src/components/CustomButton';
import { ButtonSendSticker } from "../src/components/ButtonSendSticker"




const baseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY
const superbase = createClient(baseUrl, anonKey ) 



function listenerChange(addNewMensage){
    return (
        superbase
        .from("mensagens-date")
        .on('INSERT', async (date) => {
            
            addNewMensage(date.new) 
        })
        .subscribe()

    )
}


function listenerDelete(paramets){
    return (
        superbase
        .from("mensagens-date")
        .on("DELETE", async (date) =>{
            console.log("deletou")
            paramets(date)
        })
        .subscribe()
    )
}




export default function ChatPage() {
    
    const { userName } = useContext(UserContext)
    const router = useRouter()

    const { defaultTheme } = useContext(ThemeContext)



    const [userMensangem, setUserMensagem] = useState([])
    const [mensage, setNewMensage] = useState("")

    
    const [deleting, setDeleting] = useState("")


    useEffect(() => {
        superbase
            .from("mensagens-date")
            .select("*")
            .order("id", { ascending:false})
            .then( ( { data } ) => {
                
                setUserMensagem(data)
            })

        listenerChange((date) => {
            setUserMensagem((valorAtual) => {
                return [
                date, 
                ...valorAtual,
                ]}
            )
        })


    }, [deleting])
    
    

    function handleNewMessage(date){
        const newMensage = {
            userName: `${userName}`,
            texto: date,
        }
        superbase
            .from("mensagens-date")
            .insert([newMensage])
            .then(() =>  {})
            
        setNewMensage("") 
    }

    return (
        <>
            <Head>
                <title>Aluracord - Chat</title>
            </Head>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: "transparent",
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

                        {<MessageList defaultTheme={defaultTheme} mensagens={userMensangem} userName={userName} setMensagens={setUserMensagem} superbase={superbase} setDeleting={setDeleting}/>}
                        
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
                                        if (mensage.length > 0){
                                        event.preventDefault()
                                        handleNewMessage(mensage)
                                        }
                                        else {
                                            event.preventDefault()
                                            alert("sua mensagem não pode ser vazia")
                                        }
                                    }
                                }}
                            />
                            <CustomButton onClick={() => {
                                mensage.length > 0 ? handleNewMessage(mensage) : alert("sua mensagem não pode ser vazia")
                                
                            }}>
                                {"/images/send.svg"}
                            </CustomButton>
                            <ButtonSendSticker onSend={(sticker)=> {
                                
                                handleNewMessage(`:sticker:${sticker}`)
                            }}>

                            </ButtonSendSticker>
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

    function Remover(mensagem) {
        const novaListaDeMensagens = props.mensagens.filter((mensagemRemover) =>{
            return  props.mensagens.id !== mensagemRemover.id
        })
        props.setMensagens(novaListaDeMensagens)
    }

    

    return (
        <Box 
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: props.defaultTheme.colors.neutrals["000"],
                marginBottom: '16px',
                backgroundColor: props.defaultTheme.colors.neutrals[700],
            }}
           
        >
            
            {props.mensagens.map((date) => {
               
                return (
                    <>
                    
                    <Text
                        key={date.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: props.defaultTheme.colors.neutrals[700],
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
                                src={`https://github.com/${date.userName}.png`}
                            />
                            <Text tag="strong">
                                {date.userName}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    marginRight: "20px",
                                    color: props.defaultTheme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            <CustomButton  onClick={() => {
                                        if(props.userName == date.userName && props.userName != "Gu-Parlandim"){
                                            Remover(props.mensagens)

                                            superbase
                                            .from("mensagens-date")
                                            .delete([date])
                                            .match({ id: `${date.id}` })
                                            .then(() => {})

                                            listenerDelete((date) => {
                                                console.log("deletou:", date)
                                                props.setDeleting((valor)=> {
                                                    return !valor
                                                })
                                                    
                                                    
                                            })  

                                        } else{
                                            alert("Você só pode apagar suas proprias mensagens!!")
                                        }
                                    }
                                }>
                                {"/images/trash2.svg"}
                            </CustomButton>

                        </Box>
                        
                        {date.texto.startsWith(":sticker:")
                        ? (
                            <Image 
                            styleSheet={{
                                maxWidth: "170px",
                            }}
                            src={date.texto.replace(":sticker:", "")} alt="sticker img" />
                        )
                        : 
                        (
                           date.texto
                        )
                    }
                       
                        
                    
                    </Text>
                </>
                )
            })}
           
        </Box>
        
    )
   
}