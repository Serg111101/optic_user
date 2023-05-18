import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';


interface UspsState {
   loading: boolean;
   error:string;
   uspsorder:IUsps[];
   fedexorder:IUsps[];
}

const initialState:UspsState = {
    loading: false,
    error:"",
    uspsorder:[],
    fedexorder:[],
}

export const OrderShip = createSlice({
  name: 'uspsorder',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.uspsorder = action.payload;
        state.error = ''
    },
 
    fetchSuccess2(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.fedexorder = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchSuccess2,  fetchError } = OrderShip.actions


export default OrderShip.reducer