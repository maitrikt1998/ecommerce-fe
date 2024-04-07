import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { getUser } from "../slices/authSlice";
import { Button } from "@mui/material";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
    
    useEffect(()=>{
        if(basicUserInfo){
            dispatch(getUser(basicUserInfo.user.id));
        }
    }, [basicUserInfo]);

    const handleLogout = () => {
        try {
            localStorage.removeItem("userInfo");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (
        <>
            <h1>Home</h1>
            <h4>Name: {userProfileInfo?.user.name}</h4>
            <h4>Email: {userProfileInfo?.user.email}</h4>
            <Button variant="contained" sx={{mt:3,mb:2}} onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}

export default Home;