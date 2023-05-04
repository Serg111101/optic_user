import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching11, fetchSuccess11, fetchError11 } from "../slices/AboutSlice";

export const fetchAbout = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching11());
            const response =await axios.get('http://localhost:3000/api/v1/superAdmin/about?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess11(arr));   
        }
        catch(error){
            
            dispatch(fetchError11(error as Error));
        }

    }
}