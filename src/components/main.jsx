import { Box, Button, Container, CssBaseline, Switch, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {BACKEND_URL} from "../Configs"
import { useSnackbar } from 'notistack';
export default function(props){
    const refMint1=useRef(null);
    const refMint2=useRef(null);
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
        </>
    )
}