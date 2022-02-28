import { Box, Text,  Image } from '@skynexui/components';
import React,{memo} from 'react';
import CustomButtonOne from "./CustomButtonOne";



function MessageListTest( props) {

    return (
    <>
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
                overflowWrap: "break-word"

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
                            marginBottom: '5px',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: `${date.userName.toString().toLocaleLowerCase() == props.user.toString().toLocaleLowerCase()
                                ? "flex-end" : "flex-begin"}`,
                            hover: {
                                backgroundColor: props.defaultTheme.colors.neutrals[700],
                            }
                        }}
                       
                    >

                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                flexDirection:`${date.userName.toString().toLocaleLowerCase() == props.user.toString().toLocaleLowerCase()  
                                    ? "row-reverse": "row"}`,
                                alignItems: "center",
                            }}
                        >

                            <Image
                                styleSheet={{
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    margin:  ' 0 8px',
                                }}
                                src={`https://yydjgkxeuorrnksdcojq.supabase.in/storage/v1/object/public/avatars/${date.avatar}`}
                            />
                            <Text tag="strong">
                                {date.userName}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    margin: "0 10px",
                                    color: props.defaultTheme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {new Date(date.created_at).toLocaleString('pt-BR').substring(0,16)}
                            </Text>

                            <CustomButtonOne  onClick={() => {
                                        /* if(props.userName == date.userName && props.userName != "Gu-Parlandim"){
                                        
                                            supabase
                                            .from("mensagens-date")
                                            .delete([date])
                                            .match({ id: `${date.id}` })
                                            .then(() => {})

                                            listenerDelete((date) => {
                                                
                                                props.setDeleting((valor)=> {
                                                    return !valor
                                                })
                                            })   

                                        } else{
                                            alert("Você só pode apagar suas proprias mensagens!!")
                                        } */
                                    }
                                }>
                                {"/images/trash2.svg"}
                            </CustomButtonOne>

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
                        (<>
                           <p>{date.texto}</p>
                           <style jsx>{/*CSS*/`
                            p {
                                word-break: break-all;
                                word-break: break-word;
                                margin: 5px;
                                max-width: 65%;
                            }
    
                           `} </style>
                        </>)
                    }

                    </Text>
              
                )
            })}
           
        </Box>
    </>
    )
   
}

const MessageList = memo(MessageListTest)

export default MessageList