// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):{}, // for user object
  error: null,
  success: localStorage.getItem("token")?true:false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(loginUser.pending, (state,action) =>{
      return {...state,loading:true}
    });
    builder.addCase(loginUser.fulfilled, (state,action)=>{
      if(action.payload)
      {
        return {
          ...state,
          loading:false,
          userInfo:action.payload,
          success:true
        }
      }else{
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state,action) =>{
      return {...state,loading:false,error:action.payload}
    });

    builder.addCase(logoutUser.pending, (state,action) =>{
      return {...state,loading:true}
    });
    builder.addCase(logoutUser.fulfilled, (state,action)=>{
        return {
          ...state,
          loading:false,
          userInfo:{},
          success:false
        };
    });
    builder.addCase(logoutUser.rejected, (state,action) =>{
      return {...state,loading:false,error:action.payload}
    });
  },
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, {rejectWithValue})=>{
    try {
      const token = await axios.post('http://localhost:5000/api/auth/login', {
        email: values.username,
        password: values.password
      });
      localStorage.setItem("token", JSON.stringify(token.data));
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  ()=>{
      localStorage.removeItem("token");
      return null;
  }
)

export default authSlice.reducer