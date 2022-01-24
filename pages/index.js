import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React, { useState } from 'react';
import Head from "next/head"

function GlobalStyle() {
    return (
        <style global jsx>{/*css*/`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
    );
}

/*BUTTONS*/
function ColorButton(props) {
    const color = props.color
    const handerClick = props.event

    return (
        <>
            <input type="button" onClick={() => handerClick(color)}></input>
            <style jsx>{/*css*/`
            input{
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 0 5px;
                border: solid 1px ${color};
                cursor: pointer;
                transition: 200ms ease-in-out;

            }
            input:hover {
                border: solid 1px #000000
            }

        `
            }
            </style>
        </>
    )
}



function Titulo(props) {
    const Tag = props.tag || 'h1';
    const Cor = props.styleSheet.color

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${Cor};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}


export default function PaginaInicial() {
    const username = 'Gu-Parlandim';
    // let defaultColor = "#3F9142"
    let [defaultColor, setDeufaltColor] = useState("#3F9142")

    function changerColor(color) {
        setDeufaltColor(defaultColor = color)
    }

    return (
        
        <>
            <Head>
                <title>Aluracord</title>
            </Head>

            <GlobalStyle />
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: defaultColor //appConfig.theme.colors.primary[500],
                    ,
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
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
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2" styleSheet={{ color: defaultColor }}>Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: defaultColor /*appConfig.theme.colors.primary[500]*/,
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: defaultColor /* appConfig.theme.colors.primary[600], */
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
                            <ColorButton color="#f107ce" event={changerColor}></ColorButton>
                            <ColorButton color="#14a530" event={changerColor}></ColorButton>
                            <ColorButton color="#0636d1" event={changerColor}></ColorButton>
                            <ColorButton color="#f30101" event={changerColor}></ColorButton>
                            <ColorButton color="#32009f" event={changerColor}></ColorButton>
                            <ColorButton color="#f1f0009c" event={changerColor}></ColorButton>
                            <ColorButton color="#c96b00" event={changerColor}></ColorButton>
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
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
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
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color:  defaultColor /* appConfig.theme.colors.neutrals[200] */,
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}