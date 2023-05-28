import { Dispatch } from "@reduxjs/toolkit";
import { fetching, fetchSuccess, fetchSuccess1, fetchSuccess2, fetchSuccess3, fetchSuccess8, fetchError } from "../slices/RateSlice";
import axios from "axios";
import { fetchUspsorder } from "./OrderShipActions";
import { useAppDispatch } from "../../hooks/redux";


export const fetchUsps = (arr: any) => {

  return async (dispatch: Dispatch) => {

    try {
      dispatch(fetching());
 console.log(arr);

      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/users/shippo',
        data: [{
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


        ]


      });
      console.log(response.data[0].rates);

      localStorage.setItem('shippoId', JSON.stringify(response.data[0].id))
      { if(response.data[0].rates){
       let usps = response.data[0].rates.sort((a:any,b:any)=> b.amount - a.amount)
       dispatch(fetchSuccess(usps));
      }}
   

      console.log(response)
    } catch (err) {

      console.log(err)
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
export const fetchFedex = () => {

  const arr1 ={
    "accountNumber": {
      "value": "740561073"
    },
    "requestedShipment": {
      "shipper": {
        "address": {
          "postalCode": 65247,
          "countryCode": "US"
        }
      },
      "recipient": {
        "address": {
          "postalCode": 75063,
          "countryCode": "US"
        }
      },
      "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
      "rateRequestType": [
        "ACCOUNT",
        "LIST"
      ],
      "requestedPackageLineItems": [
        {
          "weight": {
            "units": "LB",
            "value": 10
          }
        }
      ]
    
  }
  }

  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetching());

      const response: any = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/users/fedex/ratesAndTransitTimes',
        data: arr1


      });
      localStorage.setItem('fedexId', JSON.stringify(response.data[1].rateId))
      console.log(response);

      dispatch(fetchSuccess2(response.data[0]));

    } catch (err) {

      console.log(err)
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
    console.log(arr);
    try {

      dispatch(fetching());

      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/users/rateDetails',
        data: [arr]


      });
      if (response.data[0].id) {
        localStorage.setItem('shipId', JSON.stringify(response?.data[0]?.id))
        console.log(response?.data[0]?.id);
      }
      console.log(response.data)
      dispatch(fetchSuccess1(response.data))
   
    } catch (err) {

      console.log(err)

    }

  }
}
export const fetchUspsGet = () => {
  return async (dispatch: Dispatch) => {
    try {
      const Id: any = localStorage.getItem('shippoId')
      const shippoId = JSON.parse(Id)
      dispatch(fetching());
      const response: any = await axios.get('http://localhost:3000/api/v1/users/returningShip/' + shippoId);
      const data = response?.data.rates
      const payload = data.map((elem: any) => JSON.parse(elem));

      console.log(response?.data.rates);
      { if(response.data.rates){
        let usps = payload.sort((a:any,b:any)=> b.amount - a.amount)
        console.log(usps);
        
        dispatch(fetchSuccess3(usps));
       }}
     


    }
    catch (error) {
      console.log(error, 'error');

      dispatch(fetchError(error as Error));
    }

  }
}
export const fetchFedexGet = () => {
  return async (dispatch: Dispatch) => {
    try {
      const Id: any = localStorage.getItem('fedexId')
      const fedexId = JSON.parse(Id)
      dispatch(fetching());
      const response: any = await axios.get('http://localhost:3000/api/v1/users/returningShip/' + fedexId);
      const data = response?.data.rateReplyDetails
      const payload = data.map((elem: any) => JSON.parse(elem));

      console.log(response?.data.rateReplyDetails);

      dispatch(fetchSuccess8(payload));

    }
    catch (error) {
      console.log(error, 'error');

      dispatch(fetchError(error as Error));
    }

  }
}