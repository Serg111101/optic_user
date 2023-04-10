/* eslint-disable */
import "./login.scss";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
// import auth from "../../auth";
// import { FullInfoActionConfirm } from "../../components/fullInfoActionConfirm";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";


// interface ILogin {
//     [key: string]: string,
// }
export const Login = () => {

    const navigate=useNavigate()

    const [modalActive, setModalActive] =useState(false)
    // const [inpuActive, serIputActive] = useState(true)
    // const navigate = useNavigate();
    const [checkLogin, setCheckLogin] = useState({});
    const [loginError, setLoginError] = useState({});
    const [password, setPassword] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [active, setActive] = useState(false);
    const [errMsg, setErrMsg] = useState('');    // let user = {};
// }
//     if (localStorage.getItem("user") === null) {
//         localStorage.setItem("user", JSON.stringify(user));
//     }

//     const loginRequest = async () => {

//         try {
//             const user = await axios.post('/auth/login', {
//                 username: checkLogin.login,
//                 password: password.password,
//             });
//             const lifetime = active
//                 ? (new Date).setDate((new Date()).getDate() + 356)
//                 : (new Date).setDate((new Date()).getDate() + 1)

//             localStorage.setItem('auth', JSON.stringify({ ...user.data, lifetime: lifetime }));
//         } catch (error: any) {
//             loginError.login = 'Incorrect Username or password';
//             setLoginError({ ...loginError });
//         }
//     }
//     const checkValidation = async (e: any) => {
//         e.preventDefault();
//         let check = 0;


//         if (checkLogin['login'] && checkLogin['login'].length >= 3 && checkLogin['login'].length <= 38) {
//             check++;
//             setLoginError({});
//         } else if (checkLogin['login'] == '' || checkLogin['login'] == null) {
//             loginError.login = 'Required';
//             setLoginError({ ...loginError });
//         } else if (checkLogin['login'] && checkLogin['login'].length < 3 || checkLogin['login'].length > 38) {
//             loginError.login = 'Minimum 3 characters Maximum 38 characters';
//             setLoginError({ ...loginError });
//         }

//         //  password validation
//         if (password['password'] && password['password'].length >= 3 && password['password'].length <= 38) {
//             check++;
//             setPasswordError({});
//         }
//         else if (password['password'] == '' || password['password'] == null) {
//             passwordError.password = 'Required';
//             setPasswordError({ ...passwordError });
//         }
//         else if (password['password'] && password['password'].length < 3 || password['password'].length > 38) {
//             passwordError.password = 'Minimum 3 characters Maximum 38 characters';
//             setPasswordError({ ...passwordError });
//         }
//         await loginRequest();
//         if (check == 2 && auth().role === "admin") {
//             navigate("/homeFullInfo")
//         }
//         if (check == 2 && auth().role === "primeminister") {
//             navigate("/home")
//         }
//         if (check == 2 && auth().role === "parlamentpresident") {
//             navigate("/initialPage")
//         }


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
        setUser('');
        setPwd('');
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

                        
                        <form onSubmit={handleSubmit} className="loginForm">
                            <h3 className="loginFormTitle">Sign up</h3>
                            <div id="loginFormChildLogin" className="loginFormChild">
                                <label>Login</label>
                                <input placeholder="Login" name="login"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCheckLogin(e.target.value )
                                    }}
                                    style={{ "borderRadius": "0px" }}
                                    // id={loginError.login ? "loginError1" : ""}
                                />
                                <p className="login_p">{loginError.login} </p>
                            </div>

                            <div id="loginFormChildPassword" className="loginFormChild">
                                <label>Password</label>
                                <input
                                    placeholder="*******"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    name='password'
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setPassword(e.target.value )
                                    }}
                                    // className={loginError.login ? "loginError1 loginFormChildid" : "loginFormChildid"}
                                    style={{ "borderRadius": "0px" }}
                                />

                                <p className="password_p">{passwordError.password}</p>

                            </div>
                            
                            <div id="loginFormChildCheckbox" className="loginFormCheckbox">    
                            <button className="RegistrationButton" onClick={()=>setModalActive(true)}  >Registration</button>

                                <div id="loginFormCheckboxChild" className="loginFormCheckboxChild">
                        
                                    <div className="remcheck"> <input type="checkbox"
                                    //  onClick={(e) => {
                                    //     setActive(!active)
                                    // }}
                                     />
                                        
                                        
                                        <label id={active ? "unCheked" : "saveCheck"}>Remember</label>
                                    </div>
                                </div>
                            </div>
                            
                            <button id="loginFormChildButton" className="loginFormButton" > Sign in</button>
                            <div className="google">
                    <a href="http://localhost:3000/api/v1/users/auth/google">
                    <img src="../../../../image/google_logo.png"  />
                    </a>
                     </div>    
                        </form>
                        
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}/>
        </div>
    );

     }
