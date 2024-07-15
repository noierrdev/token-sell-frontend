import { Box, Button, Container, CssBaseline, Switch, TextField, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import Main from './components/main'
import { SnackbarProvider } from 'notistack'
function App() {
  const theme=createTheme({
    palette:{
      // mode:"dark"
    }
  })
  return (
    <>
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <SnackbarProvider>
      <Container  sx={{padding:2,paddingTop:6,marginTop:6}} >
        <Main/>
      </Container>
      </SnackbarProvider>
    </ThemeProvider>
    </>
  )
}

export default App
