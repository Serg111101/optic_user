import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching, fetchSuccess, fetchError } from "../slices/LoginStyleSlice";

export const fetchLoginStyle = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('http://localhost:3003/api/v1/superAdmin/loginOptions/1');            
            dispatch(fetchSuccess(response.data));
            
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}