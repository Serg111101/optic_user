import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching, fetchSuccess, fetchError,fetchSuccess1 } from "../slices/OrderSlice";
const URL = process.env.REACT_APP_BASE_URL;

export const fetchOrders = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get(`${URL}api/v1/superAdmin/getColumns`);
                    
            
            const item = response.data
            
            
           
           
          
            
            dispatch(fetchSuccess(item));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
} 


export const deletes = (table: any, item: string)=> {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response = await  axios({
                method: 'delete',
                url: `${URL}dropColumn`,
                data:     {tableName:table, columnName:item}
                
              });
            //   console.log(JSON.stringify({tableName:table, columnName:item}));
            //   console.log(response)
            // TODO: remove console.logs before deployment
            // console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response))
            dispatch(fetchSuccess(response.data));

        }catch(error){
            dispatch(fetchError(error as Error));
        }   
}
    
  }
  export const   total=(order: any)=> {
    return async (dispatch:Dispatch)=>{


   try{
        dispatch(fetching);
        const response = await axios({
      method: "post",
      url: `${URL}api/v1/superAdmin/insertValues`,
      data:order,
    
    
    })

    
}catch(error) {
    dispatch(fetchError(error as Error))
}
    }
}