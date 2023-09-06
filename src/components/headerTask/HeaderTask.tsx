import './Header.scss'
import auth from "../../auth";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const HeaderTask = () => {
//     let auth:any; 
//     if(localStorage.getItem('auth')){
//      let log:any = localStorage.getItem('auth')
//       auth = JSON.parse(log)
//     }
const [auths,setAuths]= useState<any>(auth().username)
const navigate= useNavigate()
useEffect(()=>{
    let x = auth().username
    setAuths(x)
},[window.location.pathname])
   function deleteitem() {
        
  
        localStorage.removeItem('auth')
        auth()
        setAuths(auth())
        navigate('LoginTask/ttaasskkss')

    }
    return (
        <header className='HeaderTask'>
            <nav>
                <li onClick={()=>navigate("/ttaasskkss")} ><a>Home</a></li>
                <li onClick={()=>navigate("employees/ttaasskkss")} ><a>Employees</a></li>
                <li onClick={()=>navigate("tasks/ttaasskkss")} ><a>Tasks</a></li>
                {auths ? <li onClick={()=>deleteitem() }><a>Log Out</a></li>: <li onClick={()=>navigate("/LoginTask/ttaasskkss")} ><a>Login</a></li>}
            </nav>
        </header>
    )
}
