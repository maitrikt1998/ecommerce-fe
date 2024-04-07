import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User{
    email: String;
    password: String;
};

interface NewUser extends User{
    name: String;
};

interface UserBasicInfo{
    id: string;
    name: string;
    email: string;
    status: number;
    user:{
        id: string;
    };
}

interface userProfileData{
    name: string;
    email: string;
    user:{
        name:string;
        email:string;
    }
}

interface userProfileInfo{
    user:{
        name:string;
    }
}

interface AuthApiState{
    basicUserInfo?: UserBasicInfo | null;
    userProfileData?: userProfileData | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
}

const baseURL = "http://127.0.0.1:8000/api"

const initialState: AuthApiState = {
    basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
    userProfileData: undefined,
    status: "idle",
    error: null
}


//Register Page API 
export const register = createAsyncThunk("register", async(data:NewUser)=>{
    const response = await axios.post(`${baseURL}/register`,data);
    const resData = response.data;
    localStorage.setItem("userInfo", JSON.stringify(resData));
    return resData;
});

//Login Page API
export const login = createAsyncThunk("login", async(data:User)=>{
    const response = await axios.post(`${baseURL}/login`,data);
    const resData = response.data;
    if (resData.status === 1) {
        localStorage.setItem("userInfo", JSON.stringify(resData));
    }
    return resData;
});

// export const logout = createAsyncThunk("logout", async () => {
//     const token = localStorage.getItem("userInfo");
//     console.log(token.token);
//     const response = await axios.delete(`${baseURL}/logout`, {});
//     // return response.data;
//     const resData = response.data;
//     localStorage.removeItem("userInfo");
//     return resData;
// });


//UserDetail API
export const getUser = createAsyncThunk("users/profile", async (userId: string) => { 
    const response = await axios.get(`${baseURL}/user/${userId}`);
    return response.data;
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<UserBasicInfo>)=>{
            state.status = "idle";
            state.basicUserInfo =  action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Login failed";
        })

        .addCase(register.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            register.fulfilled,
            (state, action: PayloadAction<UserBasicInfo>) => {
              state.status = "idle";
              state.basicUserInfo = action.payload;
            }
          )
        .addCase(register.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Registration failed";
        })
        // .addCase(logout.pending, (state) => {
        //     state.status = "loading";
        //     state.error = null;
        // })
        // .addCase(logout.fulfilled, (state, action) => {
        //     state.status = "idle";
        //     state.basicUserInfo = null;
        // })
        // .addCase(logout.rejected, (state, action) => {
        //     state.status = "failed";
        //     state.error = action.error.message || "Logout failed";
        // })

        .addCase(getUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.userProfileData = action.payload;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Get user profile data failed";
        });
    }
});

export default authSlice.reducer;