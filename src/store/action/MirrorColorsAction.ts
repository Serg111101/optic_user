import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching3, fetchSuccess3, fetchError3 } from "../slices/MirrorColorsSlice";

export const fetchMirrorColors = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching3());
            const response =await axios.get('http://localhost:3003/api/v1/superAdmin/styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess3(arr));
            
            
        }
        catch(error){
            
            dispatch(fetchError3(error as Error));
        }

    }
}