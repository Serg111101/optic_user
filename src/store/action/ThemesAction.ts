import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetchingThemes, fetchSuccessThemes, fetchErrorThemes } from "../slices/ThemesSlice";

export const fetchThemes = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingThemes());
            const response =await axios.get('http://localhost:3000/api/v1/superAdmin/terms');            
            dispatch(fetchSuccessThemes(response.data[0]));
            console.log(response.data[0]);
               
        }
        catch(error){
            
            dispatch(fetchErrorThemes(error as Error));
        }

    }
}