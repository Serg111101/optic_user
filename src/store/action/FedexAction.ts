import { Dispatch } from "@reduxjs/toolkit";
import { fetching, fetchSuccessFedex, fetchSuccess8, fetchError, } from "../slices/FedexSlice";
import axios from "axios";
// import { fetchUspsorder } from "./OrderShipActions";
// import { useAppDispatch } from "../../hooks/redux";



export const fetchFedex = (zip:string) => {

  const arr1 =

      {
        "address": {
          "postalCode": +zip,
          "countryCode": "US"
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

      dispatch(fetchSuccessFedex(response.data[0]));

    } catch (err) {
      dispatch(fetchError(err as Error));
      
     
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


      dispatch(fetchSuccess8(payload));

    }
    catch (error) {

      dispatch(fetchError(error as Error));
    }

  }
}