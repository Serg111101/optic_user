// import governmentMembersFullInfo from "../store/slice/GovernmetMembersFullInfo";
import { configureStore } from '@reduxjs/toolkit';
import LoginStyleReducer from "./slices/LoginStyleSlice";
import MirrorCoatingReducer from './slices/MirrorCoatingSlice';
import AntiReflectiveCoatingReducer from './slices/AntiReflectiveCoatingSlice';
import MirrorColorsReducer from './slices/MirrorColorsSlice';
// import UniqueProductReducer from './slice/UniqueProduct'
// import GovernmetMembersFullInfoReducer from './slice/GovernmetMembersFullInfo';
// import  uniqueProduct  from './slice/UniqueProduct';
import  HomeReduce  from './slices/HomeSlice';
// import ordersReducer from "./slice/OrderInformationSlice";

export const store = configureStore({
  reducer: {
    LoginStyle: LoginStyleReducer,
    Home:HomeReduce,
    MirrorCoating:MirrorCoatingReducer,
    AntiReflectiveCoating:AntiReflectiveCoatingReducer,
    MirrorColors:MirrorColorsReducer,
    // GovernmetMembersFullInfo:GovernmetMembersFullInfoReducer,
    // UniqueProduct:UniqueProductReducer,
    // uniqueProduct:uniqueProduct,
    // image:governmentMembersFullInfo,
    // orders: ordersReducer,
    // Calendar:CalendarReducer,
    // SuperAdmin:SuperAdminReducer,
    // Phonnumber:PhonnumberReducer,



  }})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



