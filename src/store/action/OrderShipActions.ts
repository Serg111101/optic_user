import { Dispatch } from "@reduxjs/toolkit";
import {  fetching, fetchSuccess, fetchError } from "../slices/OrderShip";
import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL


export const fetchUspsorder = (ShipId:any)=>{
   
    return async (dispatch:Dispatch)=>{
        
        try{ 
          
          
            dispatch(fetching());
            const response:any =await axios.get(URL + 'api/v1/users/rateDetails/'+ ShipId);            
           
            dispatch(fetchSuccess([response.data]));
            
            
        }
        catch(error){
            
            dispatch(fetchError(error as Error));
        }

    }
} 