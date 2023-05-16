import { useState,useEffect } from "react";
import "./Header.scss";
// import axios from "axios";
import {  useNavigate } from "react-router-dom";





export function Header() {
    
    const users:any=localStorage.getItem('auth')
    const users1:any=localStorage.getItem('response')
    const user=JSON.parse(users)    
    const user1=JSON.parse(users1)    
    const navigate:any = useNavigate()
    function handleSignOut() { 
    localStorage.removeItem('auth');
    localStorage.removeItem('response');
    localStorage.removeItem('token');
    navigate('login') 
  }

    return (
        <header className="header"
        //  style={{background:LoginStyle?.loginBg_color}}
         
         >
            <div className="container" >

                <div className="image" onClick={() => { navigate( "/" )}} >
                    <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" />

                </div>

                <div className="items" >
                    <div className={window.location.href=='http://localhost:3000/'?"itemHome item activ":"itemHome item"} onClick={()=>{navigate("/")}} >HOME</div>
                    <div className={window.location.href=='http://localhost:3000/about'?"itemAbout item activ":"itemAbout item"}  onClick={()=>{navigate("/about")}} >ABOUT US</div>

                    <div className={window.location.href=='http://localhost:3000/ClipandLendStyles'?"itemStiles item activ":"itemStiles item"}  onClick={()=>{navigate("/ClipandLendStyles")}} > CLIP AND LEND STYLES </div>
                    <div className={window.location.href=='http://localhost:3000/orderinginformation'?"itemStiles item activ":"itemStiles item"}  onClick={()=>{navigate("/orderinginformation")}} > ORDER ITEM </div>
                </div>
                <div className="button" >
                   { user?.googleId||user1?.id ?<button onClick={()=>handleSignOut()}>Sign out</button>:<button onClick={()=>navigate('login')}>SIGN IN</button>
}
                </div>
                
            </div>
            </header>)
}

//                     <div className={window.location.href=='http://localhost:3000/orderinginformation'?"itemStiles item activ":"itemStiles item"}  onClick={()=>{navigate("/orderinginformation")}} > CLIP AND LEND STYLES </div>
//                 </div>

               
//             </div>
//             </header>)
// }
