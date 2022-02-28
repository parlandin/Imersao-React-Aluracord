import { Box,  TextField, } from '@skynexui/components';
import React, {  useState, useEffect } from 'react';
import Head from "next/head"
import { useRouter } from 'next/router';
import CustomButtonOne from '../src/Components/CustomButtonOne';
import { ButtonSendSticker } from "../src/components/ButtonSendSticker"
import appConfig from '../config.json'
import supabase from "../services/supabase"
import { useAuth } from '../hooks/UserContext';
import Account from '../src/Components/Account';
import Loading from "../src/Components/Loading" 
import MessageList from "../src/Components/MessageList"
import Header from '../src/Components/HeaderComponet';





function listenerChange(addNewMensage){
    return (
        supabase
        .from("mensagens-date")
        .on('INSERT', async (date) => {
            addNewMensage(date.new) 
        })
        .subscribe()

    )
}



export default function ChatPage() {
    const [user, setUser] = useAuth()
    const [session, setSession] = useState(supabase.auth.session())
    const [userInfo, setUserInfo] = useState(null)

    const [userMensangem, setUserMensagem] = useState([])
    const [mensage, setNewMensage] = useState("")


    const router = useRouter()
    const defaultTheme = appConfig.defaultTheme

    const [loading, setLoading] = useState(true)

   


    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
          })

        if(session){
            getProfile()  
        }
        
    }, [user])


    useEffect(() => {
        if(!user){
            router.push("/")
            return
        }
      
        supabase
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
    }, [])
    
    async function getProfile() {
        try {
          let { data } = await supabase
            .from('profiles')
            .select(`username,  avatar_url`)
            .eq('id', user.id)
            .single()

            if(data) {
                setUserInfo(data)
                setLoading(false)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    
    function handleNewMessage(date){
        const newMensage = {
            avatar: userInfo.avatar_url,
            userName: userInfo.username,
            texto: date,
            created_at: new Date(),
            user_id: user.identities[0].user_id 
        }
        supabase
            .from("mensagens-date")
            .insert([newMensage])
            .then((date) =>  {})
            
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
                    color: defaultTheme.colors.neutrals['000'],
                    overflowX: 'hidden',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor:  {xs: "transparent", sm: defaultTheme.colors.neutrals[700] },
                        height: '100%',
                        maxWidth: {xs: "100%" , sm: "80%"},
                        maxHeight: '95vh',
                        padding: {xs: "0px%" , sm: "10px%"},
                        
                    }}
                >

                    <Header router={router}   defaultTheme={defaultTheme} supabase={supabase}/>

                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            overflowX: 'hidden',
                            wordWrap: "break-word",
                            backgroundColor:defaultTheme.colors.neutrals[600],
                            flexDirection: 'column',
                            borderRadius: {xs: "0px 0px 5x 5px" , sm: "5px"},
                            padding:  {xs: "25px" , sm: "16px"},
                        }}
                    >
                       {loading ? <Loading /> :<Account key={session.user.id} session={session} />}

                        {loading 
                            ? < MessageList defaultTheme={defaultTheme} mensagens={userMensangem} />

                            :  < MessageList defaultTheme={defaultTheme} mensagens={userMensangem}      setMensagens={setUserMensagem} supabase={supabase} user={userInfo.username}/>}
                        
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
                           <CustomButtonOne onClick={() => {
                                mensage.length > 0 ? handleNewMessage(mensage) : alert("sua mensagem não pode ser vazia")
                                
                            }}>
                                {"/images/send.svg"}
                            </CustomButtonOne>
                            <ButtonSendSticker onSend={(sticker) => {
                                
                                /* handleNewMessage(`:sticker:${sticker}`) */
                            }}>

                            </ButtonSendSticker>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

