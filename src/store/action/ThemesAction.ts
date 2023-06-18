import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetchingThemes, fetchSuccessThemes, fetchErrorThemes } from "../slices/ThemesSlice";
const URL = process.env.REACT_APP_BASE_URL


export const fetchThemes = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingThemes());
            const response =await axios.get(URL + 'api/v1/superAdmin/terms');            
            dispatch(fetchSuccessThemes(response.data[0]));
               
        }
        catch(error){
            
            dispatch(fetchErrorThemes(error as Error));
        }

    }
}