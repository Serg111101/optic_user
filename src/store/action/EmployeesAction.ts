import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess, fetchError } from "../slices/EmployeesSlice";
import { IEmployees } from "../../models/model";
const URL = process.env.REACT_APP_BASE_URL;



export const fetchEmployees = (page:number,limit:number,setPage:(page:number)=>void) => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`${URL}api/v1/tasks/getEmployes/${limit}/${page}`);
            
            if(response.data.length<=0||page <=1){
                setPage(1)
            }
            
            dispatch(fetchSuccess(response.data));
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesDelete = (id:number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.delete(`${URL}api/v1/tasks/deleteEmployes/${id}`);
            // fetchEmployees()
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesEdit = (id:number,newEmployees:any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response=await axios.put(`${URL}api/v1/tasks/putEmployes/${id}`,newEmployees);
          
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchEmployeesAdd = (newEmployees:any) => {
    return async (dispatch: Dispatch) => {
        
        try {
            dispatch(fetching());
            const response=await axios.post(`${URL}api/v1/tasks/addEmployes`,newEmployees);

            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}