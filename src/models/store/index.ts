import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from "./slice/OrderInformationSlice";
import uspsReducer from "./slice/USPSSlice"
import createReducer from "./slice/USPSSlice"

export const store = configureStore({
  reducer: {
   orders: ordersReducer,
   usps:uspsReducer,
   create:createReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch