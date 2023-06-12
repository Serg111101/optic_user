import { Dispatch } from "@reduxjs/toolkit";
import {  fetching, fetching1, fetchFedexSuccess, fetchError } from "../slices/ShipSlice";
import axios from "axios";



export const fetchFedexShip = (arr:any)=>{
    return async (dispatch:Dispatch)=>{
        try{ 
            dispatch(fetching());
            const response: any = await axios({
              method: 'post',
              url: 'http://localhost:3000/api/v1/users/fedex/ship',
              data: {
                "contact":{
                  "personName":arr[0].name,
                  "phoneNumber": arr[0].phone,
                  "companyName": arr[0].company
                },
                "address": {
                  "streetLines": [
                    arr[0].street1,
                  ],
                  "city": arr[0].city,
                  "stateOrProvinceCode": arr[0].state,
                  "postalCode": arr[0].zip,
                  "countryCode": "US"
                }
      
            }});
            dispatch(fetchFedexSuccess(response?.data));
            localStorage.setItem('Shipping', JSON.stringify(response.data))
        }
        catch(error){
            dispatch(fetchError(error as Error));

        }

    }
} 



export const fetchUspsShip = (arr2:any)=>{
   
    
        
        return async (dispatch:Dispatch)=>{
        
            try{ 
                dispatch(fetching1());
                const response: any = await axios({
                  method: 'post',
                  url: 'http://localhost:3000/api/v1/users/createShip',
                  data: {
                    "rate": arr2.object_id,
                    "provider":arr2.provider,
                    "estimated_days":arr2.estimated_days,
                    "duration_terms":arr2.duration_terms,
                    "amount":arr2.amount,
                    "currency":arr2.currency
                  }
          
          
                });
             
                dispatch(fetchFedexSuccess([response.data]));
                 const arr = ["shippo"] 
                // dispatch(fetchUspsSuccess2(response?.data));
                const obj:any ={
                  trackingNumber:response?.data[0].object_id,
                  labelDocument:response?.data[0].label_url
                }
                arr.push(obj);
                
    

                localStorage.setItem('Shipping', JSON.stringify(arr))
 
                
    
            }
            catch(error){
              
                dispatch(fetchError(error as Error));
            }
    

    }

}