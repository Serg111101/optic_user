import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';


interface ShipState {
   loading: boolean;
   error:string;
   uspsship:IUsps[];
   fedexship:IUsps[];
}

const initialState:ShipState = {
    loading: false,
    error:"",
    uspsship:[],
    fedexship:[],
}

export const Ship = createSlice({
  name: 'Ship',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchFedexSuccess(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.fedexship = action.payload;
        state.error = ''
    },
 
    fetchUspsSuccess2(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.uspsship = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchFedexSuccess, fetchUspsSuccess2,  fetchError } = Ship.actions


export default Ship.reducer