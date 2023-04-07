import { useState } from "react";
import "./Header.scss";
import {  useNavigate } from "react-router-dom";

export function Header() {
    
    const navigate:any = useNavigate();
    const [activ,setActiv]:any=useState(sessionStorage.getItem('activ')||'1');    

    function savesession(num:string){
        sessionStorage.removeItem('activ')
        sessionStorage.setItem('activ',num);
        setActiv(sessionStorage.getItem('activ'))
    }
  
    return (
        <header className="header" >
            <div className="container" >

                <div className="image" onClick={() => { navigate( "/" )}} >
                    <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" />

                </div>

                <div className="items" >
                    <div className={activ==='1'?"itemHome item activ":"itemHome item"} onClick={()=>{navigate("/");savesession('1') }} >HOME</div>
                    <div className={activ==='2'?"itemAbout item activ":"itemAbout item"}  onClick={()=>{navigate("/about");savesession('2')}} >ABOUT US</div>
                    <div className={activ==='3'?"itemStiles item activ":"itemStiles item"}  onClick={()=>{navigate("/orderinginformation");savesession('3')}} > CLIP AND LEND STYLES </div>
                </div>

                <div className="button" >
                    <button>SIGN IN</button>
                </div>
            </div>



    </header>
  )
}
