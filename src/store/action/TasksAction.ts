import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetching, fetchSuccess, fetchError,fetchSuccessEmployeesId,fetchSuccessSearchTasks } from "../slices/TasksSlice";

const URL = process.env.REACT_APP_BASE_URL;

export const fetchTasks = (page:number,limit:number,setPage:any) => {


    
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`${URL}api/v1/tasks/getTask/${limit}/${page}`);
            
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
export const fetchTasksDelete = (id:number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.delete(`${URL}api/v1/tasks/deleteTasks/${id}`);
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchTasksEdit = (id:number,newTasks:any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            await axios.put(`${URL}api/v1/tasks/editTasks/${id}`,newTasks);
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchTasksAdd = (newTasks:any,id:any) => {
    return async (dispatch: Dispatch) => {
        
        const obj = {
            ...newTasks,
            employes_id:id,
        }
   
        
        try {
            // dispatch(fetching());
          await axios.post(`${URL}api/v1/tasks/addTasks/`,obj);
            
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}
export const fetchFullEmployees = () => {
    return async (dispatch: Dispatch) => {
        try {

            dispatch(fetching());
            const response = await axios.get(`${URL}api/v1/tasks/getAll`);
            dispatch(fetchSuccessEmployeesId(response.data));
        }
        catch (error) {

            dispatch(fetchError(error as Error));
        }

    }
}

export const fetchSearchTasks = (searchItem:string,search:string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response = await axios.post(`${URL}api/v1/tasks/search`,{[searchItem]:search});
            dispatch(fetchSuccessSearchTasks([response.data]));
        }
        catch (error) {
            dispatch(fetchError(error as Error));
        }

    }
}