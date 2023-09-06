// import governmentMembersFullInfo from "../store/slice/GovernmetMembersFullInfo";
import { configureStore } from '@reduxjs/toolkit';
import LoginStyleReducer from "./slices/LoginStyleSlice";
import MirrorCoatingReducer from './slices/MirrorCoatingSlice';
import AntiReflectiveCoatingReducer from './slices/AntiReflectiveCoatingSlice';
import MirrorColorsReducer from './slices/MirrorColorsSlice';
import ordersReducer from "./slices/OrderSlice";
import AboutReducer from './slices/AboutSlice'
import ThemesReducer from './slices/ThemesSlice';
import  ClipReducer  from './slices/ClipSlice';
import  HomeReduce  from './slices/HomeSlice';
// import ordersReducer from "./slice/OrderInformationSlice";
import uspsReducer from "./slices/RateSlice"
import createReducer from "./slices/RateSlice"
import fedexReducer from './slices/FedexSlice'
import uspsGetReducer  from './slices/RateSlice'
import fedexGetReducer  from './slices/FedexSlice'
import fedexorder from './slices/OrderShip'
import uspsorder from './slices/OrderShip'
import UspsShip from './slices/ShipSlice'
import FedexShip from './slices/ShipSlice'
import EmployeesReduces from './slices/EmployeesSlice';
import TasksReduces from './slices/TasksSlice';
import EmployeesProfilReduces from './slices/EmployeesProfilSlice';
import LoginReducer from './slices/LoginSlice';



export const store = configureStore({
  reducer: {
    LoginStyle: LoginStyleReducer,
    Home:HomeReduce,
    MirrorCoating:MirrorCoatingReducer,
    AntiReflectiveCoating:AntiReflectiveCoatingReducer,
    MirrorColors:MirrorColorsReducer,
    orders: ordersReducer,
    About:AboutReducer,
    Themes:ThemesReducer,
    Clip:ClipReducer,
    usps:uspsReducer,
    create:createReducer,
    fedex:fedexReducer,
    uspsGet:uspsGetReducer,
    fedexGet:fedexGetReducer,
    fedexorder:fedexorder,
    uspsorder:uspsorder,
    UspsShip:UspsShip,
    FedexShip:FedexShip,
    Employees:EmployeesReduces,
    Tasks:TasksReduces,
    EmployeesProfil:EmployeesProfilReduces,
    Login:LoginReducer,

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



