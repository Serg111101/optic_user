import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrdersState {
   loading: boolean;
   error:string;
   orders:IOrders[],
   totals: IOrders[],
   
}

interface IOrders {
  id: number;
  title: string;
  name: string;
  is_active:null|boolean;
  price: number;
  price1: number;
  img: string;
  
}


const initialState:OrdersState = {
    loading: false,
    error:"",
    orders:[],
    totals:[],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IOrders[]>){
        state.loading = false;
        state.orders = action.payload;
        state.error = ''
    },
    fetchSuccess1(state,action: PayloadAction<IOrders[]>){
      state.loading = false;
      state.totals = action.payload;
      state.error = ''
  },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchError,fetchSuccess1 } = ordersSlice.actions


export default ordersSlice.reducer