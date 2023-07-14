'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from '@mui/material/Button'
import { Box, Container, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
const Page = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      firstName:data.get('firstName'),
      lastName:data.get('lastName'),
      country:data.get('country'),
      state:data.get('state'),
      city:data.get('city'),
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(payload)
    // const sendRequest = await fetch("http://localhost:3000/api/user",{
    //     method: "POST",
    //     headers: {
    //       "Access-Control-Allow-Origin" : "*",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       query: ` mutation createUser{
    //         createUser(userInput:{firstName:"${payload.firstName}",lastName:"${payload.lastName}",email:"${payload.email}",country:"${payload.country}",state:"${payload.state}",city:"${payload.city}",password:"${payload.password}"}){
    //           firstName
    //           lastName
    //           email
    //           country
    //           state
    //           city
    //           password
    //         }
    //       }
    //       `
    //     })
    //   }).then((res)=> res.json()).then(()=> router.push('/login'))\
    const sendRequest = await fetch('http://localhost:4000/user/register',{
      method: "POST",
      headers:{
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    }).then((res)=> res.json())

    console.log(sendRequest);
  };

  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();
  




  const defaultTheme = createTheme();

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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