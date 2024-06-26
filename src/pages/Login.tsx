import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, CssBaseline, TextField, Typography, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../slices/authSlice";

const Login = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async() => {
        if(email && password){
            const response = await dispatch( login({email,password}));
        }else{
            console.log("Please Enter EMail AND Password");
        }
    };
    return (
        <>
        <Container maxWidth="xs">
            <CssBaseline />
            <Box sx = {{ 
                mt:20,
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Avatar sx={{m:1, bgcolor:"primary.light"}}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Login</Typography>
                <Box sx={{mt:1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="EMail Address"
                        name="email"
                        autoFocus
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" sx={{mt:3, mb:2 }} onClick={handleLogin}>Login</Button>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link to="/register">Don't have an account? Register</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
            
        </>
    )
}

export default Login;