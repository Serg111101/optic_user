import { Dispatch } from "@reduxjs/toolkit";
import {  fetching, fetchSuccess, fetchError } from "../slices/OrderShip";
import axios from "axios";



export const fetchUspsorder = (ShipId:any)=>{
   
    return async (dispatch:Dispatch)=>{
        console.log(ShipId);
        
        try{ 
          
          
            dispatch(fetching());
            const response:any =await axios.get('http://localhost:3000/api/v1/users/rateDetails/'+ ShipId);            
           
            dispatch(fetchSuccess([response.data]));
            
            
        }
        catch(error){
            console.log(error,'error');
            
            dispatch(fetchError(error as Error));
        }

    }
} 