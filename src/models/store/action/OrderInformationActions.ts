import { Dispatch } from "@reduxjs/toolkit";
// import axios from "../../axios/axios";
import axios from "axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/OrderInformationSlice";

export const fetchOrders = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('http://localhost:3005/api/v1/superAdmin/getColumns');
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
                url: 'http://localhost:3005/api/v1/superAdmin/dropColumn',
                data:     {tableName:table, columnName:item}
                
              });
            dispatch(fetchSuccess(response.data));

        }catch(error){
            dispatch(fetchError(error as Error));
        }
    
}
    
  }