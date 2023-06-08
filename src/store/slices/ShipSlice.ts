import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';


interface ShipState {
   loadingShip: boolean;
   loadingShip1: boolean;
   error:string;
   UspsShip:IUsps[];
   FedexShip:IUsps[];
}

const initialState:ShipState = {
    loadingShip: false,
    loadingShip1: false,
    error:"",
    UspsShip:[],
    FedexShip:[],
}

export const Ship = createSlice({
  name: 'Ship',
  initialState,
  reducers: {
    fetching(state){
        state.loadingShip = true;
    },
    fetching1(state){
        state.loadingShip1 = true;
    },
    fetchFedexSuccess(state,action: PayloadAction<IUsps[]>){
        state.loadingShip = false;
        state.FedexShip = action.payload;
        state.error = ''
    },
 
    fetchUspsSuccess2(state,action: PayloadAction<IUsps[]>){
        state.loadingShip1 = false;
        state.UspsShip = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loadingShip = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetching1, fetchFedexSuccess, fetchUspsSuccess2,  fetchError } = Ship.actions


export default Ship.reducer