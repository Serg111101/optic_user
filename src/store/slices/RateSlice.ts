import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUsps } from '../../models/model';
interface UspsState {
   loading2: boolean;
   loading1: boolean;
   error:string;
   usps:IUsps[];
   fedex:IUsps[];
   create:IUsps[];
   uspsGet:IUsps[];
   fedexGet:IUsps[]

}

const initialState:UspsState = {
    loading2: false,
    loading1: false,
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
        state.loading1 = true;
        
    },
    fetching1(state){
        state.loading2 = true;
        
    },
    fetchSuccess(state,action: PayloadAction<IUsps[]>){
        state.loading2 = false;
        state.usps = action.payload;
        state.error = ''
    },
    fetchSuccess1(state,action: PayloadAction<IUsps[]>){
        state.loading1 = false;
        state.create = action.payload;
        state.error = ''
    },
    fetchSuccess3(state,action: PayloadAction<IUsps[]>){
        state.loading1 = false;
        state.uspsGet = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading2 = false;
       
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetching1,fetchSuccess, fetchSuccess1,fetchSuccess3, fetchError} = uspsSlice.actions


export default uspsSlice.reducer