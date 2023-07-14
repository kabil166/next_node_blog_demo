'use client'
import { Button, Card, CardHeader, Container, TextField, ThemeProvider, createTheme} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [userData, setUserData] = useState();

    const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem('user-data')){
            setUserData(JSON.parse(localStorage.getItem('user-data')))
        }
    }, []);

    console.log(userData);

    const logout = () =>{
        localStorage.clear();
        router.push('/login')

    }
   
    const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <TextField value={userData?.firstName}/>
            <Button onClick={logout}>Log Out</Button>
        </Container>
    </ThemeProvider>
  )
}

export default Page