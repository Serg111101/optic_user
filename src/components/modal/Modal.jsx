// import React from 'react'
import "./modal.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

// const USER_REGEX = /^[A-z][A-z0-9-_][@.]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';






function Modal({active, setActive,}) {
 
     const navigate=useNavigate()
 const [inputActive, setIputActive] = useState(true)

 const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(user);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(JSON.stringify({ user, pwd }),);
        try {
            
            const response = await  axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/users/add',
                data: {
                  email: user,
                  password: pwd
                }
              });
            console.log(response)
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
     }

  return (

//      <>
//      {success ? (
//          <section>
//              <h1>Success!</h1>
//              <p>
//                  <a href="#">Sign In</a>
//              </p>
//          </section>
//      ) : (
//          <section >
//              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//              <h1>Register</h1>
//              <form onSubmit={handleSubmit}>
//                  <label htmlFor="username">
//                      Username:
//                      {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /> */}
//                      {/* <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
//                  </label>
//                  <input
//                      type="text"
//                      id="username"
//                      ref={userRef}
//                      autoComplete="off"
//                      onChange={(e) => setUser(e.target.value)}
//                      value={user}
//                      required
//                      aria-invalid={validName ? "false" : "true"}
//                      aria-describedby="uidnote"
//                      onFocus={() => setUserFocus(true)}
//                      onBlur={() => setUserFocus(false)}
//                  />
//                  <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
//                      {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//                      4 to 24 characters.<br />
//                      Must begin with a letter.<br />
//                      Letters, numbers, underscores, hyphens allowed.
//                  </p>


//                  <label htmlFor="password">
//                      Password:
//                      {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} /> */}
//                      {/* <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} /> */}
//                  </label>
//                  <input
//                      type="password"
//                      id="password"
//                      onChange={(e) => setPwd(e.target.value)}
//                      value={pwd}
//                      required
//                      aria-invalid={validPwd ? "false" : "true"}
//                      aria-describedby="pwdnote"
//                      onFocus={() => setPwdFocus(true)}
//                      onBlur={() => setPwdFocus(false)}
//                  />
//                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                      {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//                      8 to 24 characters.<br />
//                      Must include uppercase and lowercase letters, a number and a special character.<br />
//                      Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                  </p>


//                  <label htmlFor="confirm_pwd">
//                      Confirm Password:
//                      {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} /> */}
//                      {/* <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
//                  </label>
//                  <input
//                      type="password"
//                      id="confirm_pwd"
//                      onChange={(e) => setMatchPwd(e.target.value)}
//                      value={matchPwd}
//                      required
//                      aria-invalid={validMatch ? "false" : "true"}
//                      aria-describedby="confirmnote"
//                      onFocus={() => setMatchFocus(true)}
//                      onBlur={() => setMatchFocus(false)}
//                  />
//                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                      {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
//                      Must match the first password input field.
//                  </p>

//                  <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
//              </form>
//              <p>
//                  Already registered?<br />
//                  <span className="line">
//                      <Link to="/">Sign In</Link>
//                  </span>
//              </p>
//          </section>
//      )}
//  </>














    <div className={active ? 'modal active' : "modal"} onClick={()=>setActive(false)}>
        <div className={active ? 'modal_content active' : "modal_content"} onClick={e=>e.stopPropagation()}>
              <div className='contain'>
                <p className='p1'><h1>Registration on the site</h1></p>
                <form onSubmit={handleSubmit} className='containform'>
                    <div className='inputers'>
                        <p>email</p>
                      <input
                     type="text"
                     id="username"
                     ref={userRef}
                     autoComplete="off"
                     onChange={(e) => setUser(e.target.value)}
                     value={user}
                     required
                     aria-invalid={validName ? "false" : "true"}
                     aria-describedby="uidnote"
                     onFocus={() => setUserFocus(true)}
                     onBlur={() => setUserFocus(false)}
                 />


                         <p>password</p>
                     <input
                     type="password"
                     id="password"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
                     aria-invalid={validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                     onFocus={() => setPwdFocus(true)}
                     onBlur={() => setPwdFocus(false)}
                 />



                         <p>password</p>
                    <input
                     type="password"
                     id="confirm_pwd"
                     onChange={(e) => setMatchPwd(e.target.value)}
                     value={matchPwd}
                     required
                     aria-invalid={validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                     onFocus={() => setMatchFocus(true)}
                     onBlur={() => setMatchFocus(false)}
                 />


                         <p>Company Name</p>
                    <input type="text" disabled={inputActive}  />
                    </div>
                    <div className='users'>
                         <div className='user1'>
                        <p>User</p>
                         <input type="checkbox" checked={inputActive} onClick={()=>setIputActive(!inputActive)}/>
                         </div>
                         <div className='user2'>
                         <p>Company</p>
                         <input type="checkbox" checked={!inputActive} onClick={()=>setIputActive(!inputActive)} />
                         </div>
                    </div>
                    <div className='registraciabutton'>

                       <button disabled={!validName || !validPwd || !validMatch ? true : false} >Sign Up</button>

                    <button onClick={()=>navigate(0)}>Go Back</button>
                    </div>
                             

                    </form>
                </div>
              </div>
        </div>

    
  )
}

export default Modal