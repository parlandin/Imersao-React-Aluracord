import { Box, Text,  Button } from '@skynexui/components';

function Header({router,  defaultTheme , supabase }) {

    return (
        <>
            <Box styleSheet={{ width: '100%', 
                /* marginBottom: '16px', */ 
                marginBottom: {xs: "0px" , sm: "16px"},
                display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', 
                overflow: 'hidden',
                backgroundColor: {xs: defaultTheme.colors.neutrals[600], sm: "transparent"},
                padding: "10px",
                fontFamily:  "Retro gaming, sans-serif",
                wordWrap: "break-word" }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    onClick={(async event => {
                        event.preventDefault()
                        let { error } = await supabase.auth.signOut()
                        router.reload()
                    })}
                />
            </Box>
        </>
    )
}

export default Header