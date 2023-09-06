import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess,fetchSuccessTasks, fetchError } from "../slices/EmployeesProfilSlice";


const URL = process.env.REACT_APP_BASE_URL;

export const fetchEmployeesProfil = (id:string) => {
    return async (dispatch: Dispatch) => {
        
        try {
     
            dispatch(fetching());
            const response = await axios.get(`${URL}api/v1/tasks/getEmployeById/${id}`);
            const response1 = await axios.get(`${URL}api/v1/tasks/getTasks/${id}`);
            dispatch(fetchSuccess(response.data));
            dispatch(fetchSuccessTasks(response1.data))
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}

export const editTaskStatus = (id:string,status:boolean) => {
    return async (dispatch: Dispatch) => {
        
        try {
     
            dispatch(fetching());
           
            const response1 = await axios.put(`${URL}api/v1/tasks/checkBox/${id}`,{tasks_status:!status});
      
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}