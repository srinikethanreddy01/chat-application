import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Typography, Box, Stack, TextField } from '@mui/material';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <Box 
            sx={{
                textAlign: 'center', 
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexWrap:'wrap'
            }}
        >
            
            <Stack 
                direction='column'  
                boxShadow='3' 
                width={{ xs: '100%', sm: '70%', md: '50%', lg: '40%' }}
                p={3}
                spacing={2}

                borderRadius={3}
                   
            >
                <Typography  sx={{fontWeight:'600',fontSize:{lg:'40px',md:'30px',sm:'24px',xs:'12px'}} }>CHAT ROOM</Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography>Name</Typography>
                    <TextField 
                        fullWidth 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Stack>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography>Room</Typography>
                    <TextField 
                    
                    
                        fullWidth 
                        value={room} 
                        onChange={(e) => setRoom(e.target.value)} 
                    />
                </Stack>
                
                <Link to={`/chat?name=${name}&room=${room}`} style={{ textDecoration: 'none' }}>
                    <Box
                        sx={{
                            mt: 2,
                            p: 1,
                            bgcolor: 'primary.main',
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        Join
                    </Box>
                </Link>
            </Stack>
        </Box>
    );
};

export default Join;
