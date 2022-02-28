import { Box } from '@skynexui/components'
import appConfig from '../config.json'
import React, { useContext, useState, useEffect } from 'react'
import Head from "next/head"
import Form from "../src/Components/Form/Form"
import { useAuth } from '../hooks/UserContext'
import { useRouter } from 'next/router';




export default function PaginaInicial() {
    const [user] = useAuth()
    const defaultTheme = appConfig.defaultTheme
    const router = useRouter()

    useEffect(()=> {
        if(user){
            router.push("/chat")
            return
        }
    })

    return (
        <>
            <Head>
                <title>Aluracord</title>
            </Head>


            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: /* "transparent" */defaultTheme.colors.neutrals[500],
                    backgroundImage: defaultTheme.backgroundImage,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: defaultTheme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Form />
                    {/* Formulário */}

                </Box>
            </Box>
        </>
    );
}