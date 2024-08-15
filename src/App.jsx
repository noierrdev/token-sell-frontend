import { AppBar, Box, Button, Container, CssBaseline, Switch, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import { useState } from 'react'
import Main from './components/main'
import Tap from './components/tap'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  const theme=createTheme({
    palette:{
      mode:"dark"
    }
  })
  return (
    <>
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <SnackbarProvider>
      <Container  sx={{padding:2,paddingTop:6,marginTop:6}} >
        <AppBar position="fixed" >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              RaydiumTap
            </Typography>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Main} />
            <Route path='/tap' Component={Tap} />
          </Routes>
        </BrowserRouter>
      </Container>
      </SnackbarProvider>
    </ThemeProvider>
    </>
  )
}

export default App
