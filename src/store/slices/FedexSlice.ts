import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';


interface FedexState {
   loading: boolean;
   error:string;
   fedex:IUsps[];
   fedexGet:IUsps[]

}

const initialState:FedexState = {
    loading: false,
    error:"",
    fedex:[],
    fedexGet:[]
}

export const FedexSlice = createSlice({
  name: 'fedex',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccessFedex(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.fedex = action.payload;
        state.error = ''
    },
    fetchSuccess8(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.fedexGet = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
       
        state.error = action.payload.message
    },
  }
})

export const { fetching, fetchSuccessFedex, fetchSuccess8, fetchError,} = FedexSlice.actions


export default FedexSlice.reducer