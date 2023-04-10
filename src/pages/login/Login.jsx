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


// interface ILogin {
//     [key: string]: string,
// }
export const Login = () => {

    const navigate=useNavigate()
    const [user, setUser] = useState({});

    const [modalActive, setModalActive] =useState(false)
    // const [inpuActive, serIputActive] = useState(true)
   
    const [checkLogin, setCheckLogin] = useState({});
    const [loginError, setLoginError] = useState({});
    const [password, setPassword] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [active, setActive] = useState(false);
    const [errMsg, setErrMsg] = useState('');    




async function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/v1/auth/google/login',
      config,
      data: userObject
    });
    console.log(res);
    const data=JSON.stringify(res.data)
    localStorage.setItem('auth',data)
    navigate('/')
  }



  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "31098185916-s1icd47jctcqk6vojp22l6catuaiklvg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )

    // google.accounts.id.prompt();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(checkLogin,password);
    //     const response = await axios.post('http://localhost:3000/api/v1/auth/login',
    //         JSON.stringify({ checkLogin, password }),
    //         {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         }
    //     );
    // console.log('aaaaaaaaaaaaaaaaaa');
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/auth/login',
            data: {
               email:checkLogin,
               password:password
            }
          });
          const res = JSON.stringify(response.data)
          localStorage.setItem('response', res);
          localStorage.setItem('token', response.data.accessToken)
          console.log(response);
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
        
    } catch (err) {
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
            <img src="../../../../image/logo11.webp" />
            <h3 id={"containerHeaderH1"}>WELCOME TO BEST OPTIC LAB, INC</h3>
        </div>                    <div className="containerMain">
            
                        <div className="loginImage">
                            <img src="../../../../image/logins.webp" />
                        </div>

                        
                        <form  className="loginForm" onSubmit={handleSubmit}>
                            <h3 className="loginFormTitle">Sign up</h3>
                            <div id="loginFormChildLogin" className="loginFormChild">
                                <label>Login</label>
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
                                <label>Password</label>
                                <input
                                    placeholder="*******"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    name='password'
                                    type="password"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setPassword(e.target.value )
                                    }}
                                    style={{ "borderRadius": "0px" }}
                                />

                                <p className="password_p">{passwordError.password}</p>

                            </div>
                            
                            <div id="loginFormChildCheckbox" className="loginFormCheckbox">    
                            <button className="RegistrationButton" onClick={(e)=>{setModalActive(true);e.preventDefault()}}  >Registration</button>

                                <div id="loginFormCheckboxChild" className="loginFormCheckboxChild">
                        
                                    <div className="remcheck"> <input type="checkbox"
                                    
                                     />
                                        
                                        
                                        <label id={active ? "unCheked" : "saveCheck"}>Remember</label>
                                    </div>
                                </div>
                            </div>
                            
                            <button id="loginFormChildButton" className="loginFormButton" > Sign in</button>
                            <div className="google" >
                    


                            <div id="signInDiv"></div>
      {/* {
        Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { user && 
      <div>
        <img src={user.picture}></img> 
         <h3>{user.name}</h3>
      </div>
      } */}


                    
                     </div>    
                        </form>
                        
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}/>
        </div>
    );
}
