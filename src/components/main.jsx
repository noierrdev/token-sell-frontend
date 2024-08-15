import { Box, Button, Container, CssBaseline, Switch, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {ALT_URL, BACKEND_URL,BOT_URL} from "../Configs"
import { useSnackbar } from 'notistack';
export default function(props){
    const refMint1=useRef(null);
    const refMint2=useRef(null);
    const refBurnedMint1=useRef(null);
    const refBurnedMint2=useRef(null);
    const refPumpfunMint=useRef(null);
    const refPassword=useRef(null);
    const snackbar=useSnackbar();
    const [Quoted, setQuoted]=useState(true);
    const basicSell=(e)=>{
        e.preventDefault();
        const targetToken=refMint1.current.value;
        if(!targetToken) return;
        axios.get(`${BACKEND_URL}/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
        axios.get(`${BOT_URL}/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
    }
    const rapidSell=(e)=>{
        e.preventDefault();
        const targetToken=refMint1.current.value;
        if(!targetToken) return;
        axios.post(`${BACKEND_URL}/sell`,{
            token:targetToken,
            quoted:Quoted
        })
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
    }
    const buyBurned=(e)=>{
        e.preventDefault();
        const targetToken=refBurnedMint1.current.value;
        if(!targetToken) return;
        if(!refPassword.current.value) return
        // axios.get(`${ALT_URL}/buy/${targetToken}`)
        // .then(response=>{
        //     if(response.data.status=="success"){
        //         snackbar.enqueueSnackbar("Sold!",{variant:"success"})
        //     }else{
        //         snackbar.enqueueSnackbar("Error!")
        //     }
        // })
        axios.get(`${BACKEND_URL}/buy/${targetToken}`,{
            headers:{
                passkey:refPassword.current.value
            }
        })
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
    }
    const sellBurned=(e)=>{
        e.preventDefault();
        const targetToken=refBurnedMint2.current.value;
        if(!targetToken) return;
        axios.get(`${ALT_URL}/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
        axios.get(`${BACKEND_URL}/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
    }
    
    const sellPumpfun=(e)=>{
        e.preventDefault();
        const targetToken=refPumpfunMint.current.value;
        if(!targetToken) return;
        axios.get(`${ALT_URL}/pumpfun/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
        axios.get(`${BOT_URL}/pumpfun/sell/${targetToken}`)
        .then(response=>{
            if(response.data.status=="success"){
                snackbar.enqueueSnackbar("Sold!",{variant:"success"})
            }else{
                snackbar.enqueueSnackbar("Error!")
            }
        })
    }
    return (
        <>
            <Typography align="center" sx={{marginBottom:5}} variant="h4" component={"h4"} >Sell Raydium Tokens!</Typography>
            <form onSubmit={basicSell} >
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around"}} >
                    <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={refMint1}
                    />
                    <Button type="submit" variant="contained" sx={{marginLeft:1}} color="primary" >Sell</Button>
                </Box>
            </form>
            
            <form onSubmit={rapidSell} style={{marginTop:5}} >
                <Box sx={{width:"100%",display:"flex",alignItems:"center",marginTop:2}} >
                    <TextField
                    variant="outlined"
                    size="small"
                    inputRef={refMint2}
                    sx={{flexGrow:1}}
                    />
                    <Typography sx={{marginLeft:1}}>Quoted : </Typography>
                    <Switch checked={Quoted} onChange={e=>setQuoted(e.target.checked)} />
                    <Button type="submit" variant="contained" sx={{marginLeft:1}} color="primary" >Sell</Button>
                </Box>
            </form>
            <Typography align="center" sx={{marginTop:5,marginBottom:2}} variant="h4" component={"h4"} >Burned Pools!</Typography>
            <form style={{marginTop:1}} onSubmit={buyBurned} >
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around"}} >
                    <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth
                    inputRef={refPassword}
                    />
                    <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={refBurnedMint1}
                    sx={{marginLeft:1}}
                    />
                    <Button type="submit" variant="contained" sx={{marginLeft:1}} color="primary" >Buy</Button>
                </Box>
            </form>
            <form style={{marginTop:10}} onSubmit={sellBurned} >
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around"}} >
                    <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={refBurnedMint2}
                    />
                    <Button type="submit" variant="contained" sx={{marginLeft:1}} color="primary" >Sell</Button>
                </Box>
            </form>
            <Typography align="center" sx={{marginTop:5,marginBottom:2}} variant="h4" component={"h4"} >Pumpfun!</Typography>
            <form style={{marginTop:10}} onSubmit={sellPumpfun} >
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around"}} >
                    <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={refPumpfunMint}
                    />
                    <Button type="submit" variant="contained" sx={{marginLeft:1}} color="primary" >Sell</Button>
                </Box>
            </form>
        </>
    )
}