'use client'
import Link from 'next/link'
// import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Container, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'

const Page = () => {

  const router = useRouter();
  const defaultTheme = createTheme();

  const handleSubmit= async(event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // const sendRequest = await fetch("http://localhost:3000/api/user",{
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Origin" : "*",
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     query: ` mutation login{
    //       login(loginUserInput:{email:"${payload.email}", password:"${payload.password}"})
    //     }
    //     `
    //   })
    // }).then((res)=> res.json())

    const sendRequest = await fetch("http://localhost:4000/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(res=> res.json())

    const { auth_token } = sendRequest;
    if(auth_token){
        localStorage.setItem("Authorization",auth_token)
        router.push('/')
    }
    
    //GraphQl Api Token
    // const usertoken = await sendRequest.data;
    // const token = usertoken?.login;
    // if(token!=null || token!== undefined){
    //   localStorage.setItem("Authorization",token)
    //   router.push('/')
    // }
    // console.log(token);

    //Express and Sql api token

    // const usertoken = await sendRequest;

    // console.log("EncryptedToken", usertoken)

  }



  return (
    <>
  <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
         
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
          </Grid>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {`Don't have an account? Sign up`}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
        </Container>
      </ThemeProvider>
  </>
  )
}

export default Page