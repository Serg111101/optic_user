import { Dispatch } from "@reduxjs/toolkit";
import {  fetching, fetchFedexSuccess, fetchError } from "../slices/ShipSlice";
import axios from "axios";



export const fetchFedexShip = ()=>{

    const arr1 = {
        "labelResponseOptions": "URL_ONLY",
        "requestedShipment": {
          "shipper": {
            "contact": {
              "personName": "SHIPPER NAME",
              "phoneNumber": 1234567890,
              "companyName": "Shipper Company Name"
            },
            "address": {
              "streetLines": [
                "SHIPPER STREET LINE 1"
              ],
              "city": "HARRISON",
              "stateOrProvinceCode": "AR",
              "postalCode": 72601,
              "countryCode": "US"
            }
          },
          "recipients": [
            {
              "contact": {
                "personName": "RECIPIENT NAME",
                "phoneNumber": 1234567890,
                "companyName": "Recipient Company Name"
              },
              "address": {
                "streetLines": [
                  "RECIPIENT STREET LINE 1",
                  "RECIPIENT STREET LINE 2"
                ],
                "city": "Collierville",
                "stateOrProvinceCode": "TN",
                "postalCode": 38017,
                "countryCode": "US"
              }
            }
          ],
          "shipDatestamp": "2020-07-03",
          "serviceType": "PRIORITY_OVERNIGHT",
          "packagingType": "FEDEX_ENVELOPE",
          "pickupType": "USE_SCHEDULED_PICKUP",
          "blockInsightVisibility": false,
          "shippingChargesPayment": {
            "paymentType": "SENDER"
          },
          "shipmentSpecialServices": {
            "specialServiceTypes": [
              "RETURN_SHIPMENT"
            ],
            "returnShipmentDetail": {
              "returnType": "PRINT_RETURN_LABEL"
            }
          },
          "labelSpecification": {
            "imageType": "PDF",
            "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
          },
          "requestedPackageLineItems": [
            {
              "weight": {
                "value": 1,
                "units": "LB"
              }
            }
          ]
        },
        "accountNumber": {
          "value": 740561073
        }
      }
   
    return async (dispatch:Dispatch)=>{
        
        try{ 
            dispatch(fetching());
            const response: any = await axios({
              method: 'post',
              url: 'http://localhost:3000/api/v1/users/fedex/ship',
              data: arr1
      
      
            });
            dispatch(fetchFedexSuccess(response?.data));
            console.log(response?.data);
      localStorage.setItem('fedexShip', JSON.stringify(response.data))

        }
        catch(error){
            dispatch(fetchError(error as Error));

        }

    }
} 



export const fetchUspsShip = (arr2:any)=>{
   
    
        
        return async (dispatch:Dispatch)=>{
        console.log(arr2.object_id);
        
            try{ 
                dispatch(fetching());
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
                 const arr = [] 
                // dispatch(fetchUspsSuccess2(response?.data));
                arr.push(response?.data[0].label_url);
                arr.push(response?.data[0].object_id);
                arr.push(response?.data[1].userOrderId);

                localStorage.setItem('shippoShip', JSON.stringify(arr))
 
                
    
            }
            catch(error){
                dispatch(fetchError(error as Error));
            }
    

    }

}