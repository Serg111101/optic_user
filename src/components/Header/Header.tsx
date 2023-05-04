import {  useEffect } from "react";
import "./Header.scss";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";




export function Header() {
    const { LoginStyle }: any = useAppSelector((state: any) => state.LoginStyle)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchLoginStyle());
    }, [dispatch])
    const users: any = localStorage.getItem('auth')
    const users1: any = localStorage.getItem('response')
    const user = JSON.parse(users)
    const user1 = JSON.parse(users1)
    const navigate: any = useNavigate()
    function handleSignOut() {
        localStorage.removeItem('auth');
        localStorage.removeItem('response');
        localStorage.removeItem('token');
        navigate('login')
    }

    return (
        <header className="header" style={{ background: LoginStyle?.loginBg_color }}>
            <div className="container" >

                <div className="image" onClick={() => { navigate("/") }} >
                    <img src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95" />

                </div>

                <div className="items" >

                    <div style={{ color: LoginStyle.login_color }} className={window.location.href == process.env.REACT_APP_BASE_URL ? "itemHome item activ" : "itemHome item"} onClick={() => { navigate("/") }} >HOME</div>
                    <div style={{ color: LoginStyle.login_color }} className={window.location.href == process.env.REACT_APP_BASE_URL + 'about' ? "itemAbout item activ" : "itemAbout item"} onClick={() => { navigate("/about") }} >ABOUT US</div>
                    <div style={{ color: LoginStyle.login_color }} className={window.location.href == process.env.REACT_APP_BASE_URL + 'ClipandLendStyles' ? "itemStiles item activ" : "itemStiles item"} onClick={() => { navigate("/ClipandLendStyles") }} > CLIP AND LEND STYLES </div>
                    <div style={{ color: LoginStyle.login_color }} className={window.location.href == process.env.REACT_APP_BASE_URL + 'orderinginformation' ? "itemStiles item activ" : "itemStiles item"} onClick={() => { navigate("/orderinginformation") }} > ORDER ITEM </div>
                </div>

                <div className="button" >
                    {user?.googleId || user1?.id ? <button onClick={() => handleSignOut()} style={{ background: LoginStyle?.buttonBg_color, color: LoginStyle?.login_color }}>Sign out</button> : <button onClick={() => navigate('login')} style={{ background: LoginStyle?.buttonBg_color, color: LoginStyle?.login_color }}>SIGN IN</button>
                    }
                </div>
            </div>
        </header>)
}
