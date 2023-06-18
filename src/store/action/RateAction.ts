import { Dispatch } from "@reduxjs/toolkit";
import { fetching,fetching1, fetchSuccess, fetchSuccess1, fetchSuccess3, fetchError, } from "../slices/RateSlice";
import axios from "axios";
// import { fetchUspsorder } from "./OrderShipActions";
// import { useAppDispatch } from "../../hooks/redux";
const URL = process.env.REACT_APP_BASE_URL


export const fetchUsps = (arr: any) => {

  return async (dispatch: Dispatch) => {

    try {
      dispatch(fetching1());

      const response = await axios({
        method: 'post',
        url: URL + 'api/v1/users/shippo',
        data: {
          name: arr[0].name,
          company: arr[0].company,
          street1: arr[0].street1,
          city: arr[0].city,
          state: arr[0].state,
          zip: arr[0].zip,
          country: arr[0].country,
          phone: arr[0].phone,
          email: arr[0].email,


        }
     });
      localStorage.setItem('shippoId', JSON.stringify(response.data[0].id))
      if(response.data[0].rates){
       let usps = response.data[0].rates.sort(async (a:any,b:any)=> a.amount - b.amount)
       
       dispatch(fetchSuccess(usps));
      }
   

    } catch (err) {

      dispatch(fetchError(err as Error));

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

export const fetchCreate = (arr: any) => {

  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetching());

      const response = await axios({
        method: 'post',
        url: URL + 'api/v1/users/rateDetails',
        data: [arr]

      });
      
      if (response.data[0].id) {
        localStorage.setItem('shipId', JSON.stringify(response?.data[0]?.id))
      }
      dispatch(fetchSuccess1(response.data))
  
    } catch (err) {


    }

  }
}
export const fetchUspsGet = () => {
  return async (dispatch: Dispatch) => {
    try {
      const Id: any = localStorage.getItem('shippoId')
      const shippoId = JSON.parse(Id)
      dispatch(fetching());
      const response: any = await axios.get(URL + 'api/v1/users/returningShip/' + shippoId);
      const data = response?.data.rates
      const payload = data.map((elem: any) => JSON.parse(elem));

   
    

      if(payload){
       let usps = payload.sort((a:any,b:any)=> b.amount - a.amount)
       
       dispatch(fetchSuccess3(usps));
      
      }
     


    }
    catch (error) {

      dispatch(fetchError(error as Error));
    }

  }
}
