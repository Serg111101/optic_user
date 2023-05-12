import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching1, fetchSuccess1, fetchError1 } from "../slices/MirrorCoatingSlice";

export const fetchMirrorCoating = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching1());
            const response =await axios.get('http://localhost:3000/api/v1/superAdmin/styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess1(arr)); 
            
            
            
              
        }
        catch(error){
            
            dispatch(fetchError1(error as Error));
        }

    }
}