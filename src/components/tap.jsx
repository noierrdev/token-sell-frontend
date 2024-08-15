import { Clear, ContentPaste, Remove, X } from "@mui/icons-material";
import { Fab, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { BACKEND_URL } from "../Configs";
import { useSnackbar } from "notistack";

export default function(){
    const snackbar=useSnackbar();
    const refMint=useRef(null)
    const pasteMint=async ()=>{
        refMint.current.value=await window.navigator.clipboard.readText.readText();
    }
    const buyRequest=async ()=>{
        console.log(`BUY : ${refMint.current.value}`)
        const res=await fetch(`${BACKEND_URL}/buy/${refMint.current.value}`,{
            headers:{
                passkey:"noierrdev"
            }
        });
        const data=await res.json()
        if(data.status=="success"){
            snackbar.enqueueSnackbar("Bought!",{variant:"success"})
        }else {
            snackbar.enqueueSnackbar(data.error,{variant:"error"})
        }
    }
    const sellRequest=async (e)=>{
        e.preventDefault();
        console.log(`SELL : ${refMint.current.value}`)
        const res=await fetch(`${BACKEND_URL}/sell/${refMint.current.value}`);
        const data=await res.json()
        if(data.status=="success"){
            snackbar.enqueueSnackbar("Sold!",{variant:"success"})
        }else {
            snackbar.enqueueSnackbar(data.error,{variant:"error"})
        }
    }
    return(
        <form onSubmit={sellRequest} >
            <Typography variant="h4" component={"h4"} align="center" >
                Only Raydium!
            </Typography>
            <div style={{display:"flex",alignItems:"center"}} >
            <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                inputRef={refMint}
                // ref={refMint}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    sx={{width:60,height:60}}
                    onClick={e=>{refMint.current.value=""}}
                    >
                        <Clear/>
                    </IconButton>
                </InputAdornment>
                }
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        sx={{width:60,height:60}}
                        onClick={pasteMint}
                        >
                            <ContentPaste/>
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    style:{
                        fontSize:30
                    }
                }}
            />
            
            </div>
            <div style={{width:"100%",textAlign:"center"}} >
            <Fab color="success" sx={{marginTop:15,width:100,height:100}} type="button" onClick={buyRequest} ><Typography color={"whitesmoke"} component={`h2`} variant="h2" >B</Typography></Fab>
            </div>
            <div style={{width:"100%",textAlign:"center",marginTop:10}} >
            <Fab color="error" size="large" sx={{width:160,height:160,marginTop:5}} type="submit"  ><Typography component={`h2`} variant="h2" >S</Typography></Fab>
            </div>
            
        </form>
    )
}