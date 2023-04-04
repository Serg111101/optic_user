import "./Header.scss";
import {  useNavigate } from "react-router-dom";

export function Header() {
    const navigate:any = useNavigate();

    return (
        <header className="header" >

            <div className="container" >
                <div className="image" onClick={() => { navigate( "/" ) }} >
                    <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" />

                </div>

                <div className="items" >
                    <div className="itemHome item" onClick={()=>{navigate("/")}} >HOME</div>
                    <div className="itemAbout item"  onClick={()=>{navigate("/about")}} >ABOUT US</div>
                    <div className="itemStiles item" > CLIP AND LEND STYLES </div>
                </div>

                <div className="button" >
                    <button>SIGN IN</button>
                </div>
            </div>

    </header>
  )
}
