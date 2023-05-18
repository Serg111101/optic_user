import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';
interface UspsState {
   loading: boolean;
   error:string;
   usps:IUsps[];
   fedex:IUsps[];
   create:IUsps[];
   uspsGet:IUsps[];
   fedexGet:IUsps[]

}

const initialState:UspsState = {
    loading: false,
    error:"",
    usps:[],
    fedex:[],
    create:[],
    uspsGet:[],
    fedexGet:[]
}

export const uspsSlice = createSlice({
  name: 'usps',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.usps = action.payload;
        state.error = ''
    },
    fetchSuccess1(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.create = action.payload;
        state.error = ''
    },
    fetchSuccess2(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.fedex = action.payload;
        state.error = ''
    },
    fetchSuccess3(state,action: PayloadAction<IUsps[]>){
        state.loading = false;
        state.uspsGet = action.payload;
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
    }
  }
})

export const {  fetching, fetchSuccess, fetchSuccess1,fetchSuccess2,fetchSuccess3,fetchSuccess8, fetchError } = uspsSlice.actions


export default uspsSlice.reducer