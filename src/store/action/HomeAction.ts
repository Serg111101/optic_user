import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching4, fetchSuccess4, fetchError4 } from "../slices/HomeSlice";

export const fetchHome = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching4());
            const response =await axios.get('http://localhost:3003/api/v1/superAdmin/home');            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess4(arr));
            
            
        }
        catch(error){
            
            dispatch(fetchError4(error as Error));
        }

    }
}