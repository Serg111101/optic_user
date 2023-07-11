/* eslint-disable */
import "./login.scss";
import { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
// import auth from "../../auth";
// import { FullInfoActionConfirm } from "../../components/fullInfoActionConfirm";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";
const URL = process.env.REACT_APP_BASE_URL

declare global {
    interface Window {
        google: any;
    }
}


interface ILogin {
    [key: string]: string,
}
export const Login = () => {
 

    const { LoginStyle }:any = useAppSelector(state => state.LoginStyle)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchLoginStyle());
    }, [dispatch])
      
    const navigate=useNavigate()
    const [user, setUser] = useState({});

    const [modalActive, setModalActive] =useState(false)
    // const [inpuActive, serIputActive] = useState(true)
   
    const [checkLogin, setCheckLogin] = useState({});
    const [loginError, setLoginError] = useState<ILogin>({});
    const [password, setPassword] = useState({});
    const [passwordError, setPasswordError] = useState<ILogin>({});
    const [active, setActive] = useState(false);
    const [errMsg, setErrMsg] = useState('');    




async function handleCallbackResponse(response:any) {
    const userObject:any = jwt_decode(response.credential);
    setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
  
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    
    const res = await axios({
      method: 'post',
      url: URL + 'api/v1/auth/google/login',
    //   config,
      data: userObject
    });
    const data=JSON.stringify(res.data)
    localStorage.setItem('auth',data)
    navigate('/')
  }



  useEffect(() => {
    /* global google */
   window.google.accounts.id.initialize({
      client_id: "31098185916-s1icd47jctcqk6vojp22l6catuaiklvg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )

    // google.accounts.id.prompt();
  }, []);




  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
        const response = await axios({
            method: 'post',
            url: URL + 'api/v1/auth/login',
            data: {
               email:checkLogin,
               password:password
            }
          });
          const res = JSON.stringify(response.data)
          localStorage.setItem('response', res);
          localStorage.setItem('token', response.data.accessToken)
        //   const resp= localStorage.getItem('response')
        //   navigate(from, { replace: true });
        //   const respons = JSON.parse(resp)
          
          
        //   axioss.interceptors.request.use(function (config) {
        //           config.headers.Authorization = Bearer ${response.data.accessToken};
        //       return config;
        //   });
        // setAuth({ user, pwd, roles, accessToken });
        // setUser('');
        // setPwd('');
        navigate('/')
        // navigate(from, { replace: true });
        
    } catch (err:any) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        // errRef.current.focus();
    }

}

    

    return (
        <div className="login">
            <div className="main">
                <div className="containeri" id="container">
                

                <div className="containerHeader" id="containerHeader">
            <img src="../../../../images/logo11.webp" />
            <h3 id={"containerHeaderH1"}>{LoginStyle?.title}</h3>
        </div>                    <div className="containerMain">
            
                        <div className="loginImage">
                            <img src="../../../../images/logins.webp" />
                        </div>

                        
                        <form  className="loginForm" onSubmit={handleSubmit} style={{background:LoginStyle?.loginBg_color}}>
                            <h3 className="loginFormTitle" style={{ color: LoginStyle?.login_color }}>{LoginStyle?.signUp_title}</h3>
                            <div id="loginFormChildLogin" className="loginFormChild">
                                <label style={{ color: LoginStyle?.login_color }}>{LoginStyle?.login_title}</label>
                                <input placeholder="Login" name="login"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCheckLogin(e.target.value )
                                    }}
                                    style={{ "borderRadius": "0px" }}
                                />
                                <p className="login_p">{loginError.login} </p>
                            </div>

                            <div id="loginFormChildPassword" className="loginFormChild">
                                <label style={{ color: LoginStyle?.login_color }}>{LoginStyle?.password_title}</label>
                                <Input.Password
                                    placeholder="*******"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    name='password'
                                    // type="password"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setPassword(e.target.value )
                                    }}
                                    style={{ "borderRadius": "0px", padding:"12px" }}
                                />

                                <p className="password_p">{passwordError.password}</p>

                            </div>
                            
                            <div id="loginFormChildCheckbox" className="loginFormCheckbox">    
                            <button className="RegistrationButton" onClick={(e)=>{setModalActive(true);e.preventDefault()}}  style={{ color: LoginStyle?.login_color }}>{LoginStyle?.registration_title}</button>

                                <div id="loginFormCheckboxChild" className="loginFormCheckboxChild">
                        
                                    <div className="remcheck"> <input type="checkbox"
                                    
                                     />
                                        
                                        
                                        <label id={active ? "unCheked" : "saveCheck"}style={{ color: LoginStyle?.login_color }}>{LoginStyle?.remember_title}</label>
                                    </div>
                                </div>
                            </div>
                            

                        <button id="loginFormChildButton" className="loginFormButton" style={{ color: LoginStyle?.login_color , background:  LoginStyle?.buttonBg_color }}> {LoginStyle?.signIn_title}</button>
                          
                            <div className="google" id="google" >
                            <div className="signindiv" id="signInDiv"></div>
                     </div> 

                        </form>
                        
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}/>
        </div>
    );
}
