import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching4, fetchSuccess4, fetchError4 } from "../slices/HomeSlice";

const URL = process.env.REACT_APP_BASE_URL


export const fetchHome = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching4());
            const response =await axios.get(URL + 'api/v1/superAdmin/home');            
            const arr=[]
            
            for(let key in response.data){
                arr?.push(response.data[key]);
                break
            }
            console.log(arr);
            dispatch(fetchSuccess4(arr));
            
            
        }
        catch(error){
            
            dispatch(fetchError4(error as Error));
        }

    }
}