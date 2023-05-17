import { Dispatch } from "@reduxjs/toolkit";
// import axioss from "../../axios/axios";

import {  fetching, fetchSuccess, fetchSuccess1,fetchError } from "../slice/USPSSlice";
import axios from "axios";
export const fetchUsps = (arr:any)=>{
   
    return async (dispatch:Dispatch)=>{
        try {
            dispatch(fetching());
            
            const response = await  axios({
                method: 'post',
                url: 'http://localhost:3005/api/v1/users/shippo',
                data:     [{
                  name: arr[0].name,
    company: arr[0].company,
    street1: arr[0].street1,
    street2: "",
    city: arr[0].city,
    state: arr[0].state,
    zip: arr[0].zip,
    country: arr[0].country,
    phone: arr[0].phone,
    email: arr[0].email,
    // metadata:"home",
    // object_purpose: "PURCHASE",
    // validate: true

                },
              {
                height: arr[1].height,
                distance_unit:arr[1].distance_unit,
                length: arr[1].length,
                width: arr[1].width,
                weight: arr[1].weight,
                mass_unit: arr[1]. mass_unit
              }
              
              
              ]
                    
              
            });
           
            dispatch(fetchSuccess(response.data.rates));
            
      }catch (err:any) {
    
        fetchError(err)
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 409) {
            //     setErrMsg('Username Taken');
            //   } else {
            //     setErrMsg('Registration Failed')
            //   }
              // errRef.current.focus();
            }

    }
} 


export const fetchCreate = (arr:any)=>{
   
  return async (dispatch:Dispatch)=>{
      try {
          dispatch(fetching());
          
          const response = await  axios({
              method: 'post',
              url: 'http://localhost:3005/api/v1/users/createShip',
              data:    {rate:arr}
                  
            
          });
         
          dispatch(fetchSuccess1([response.data]));
          
    }catch (err:any) {
  
      fetchError(err)
         
    }

  }
} 