import { useEffect } from "react";
import "./Footer.scss";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchLoginStyle } from "../../store/action/LoginStyleActions";

export function Footer() {
  const navigate = useNavigate()
  const {LoginStyle}:any=useAppSelector(state=>state.LoginStyle)

  const dispatch = useAppDispatch()
 
  useEffect(() => {
      dispatch(fetchLoginStyle());
  }, [dispatch])


  return (
    <div className="footer" style={{background:LoginStyle?.loginBg_color,borderTop:`2px solid ${LoginStyle?.buttonBg_color} `}}>
      <footer className="containerFooter">
        <div className="linkIcons">
          <div className="link1">
            <a href="https://www.facebook.com/bestopticlab/" style={{color:LoginStyle?.login_color}}>
              <FacebookOutlined />
            </a>
          </div>
          <div className="link2">
            <a href="https://www.instagram.com/best_optic_lab/?__coig_restricted=1" style={{color:LoginStyle?.login_color}}>
              <InstagramOutlined />
            </a>
          </div>
        </div>

        <div className="footerText">
          <div className="textAbout" style={{color:LoginStyle?.login_color}}>
            Copyright © 2018 Best Optic Lab, Inc - All Rights Reserved.
          </div>
          <div className="linkText">
            <a href="https://www.freeprivacypolicy.com/privacy/view/435a9c30b1335b8e09e21580430da181" style={{color:LoginStyle?.login_color}}>
              Privacy Policy
              <span>/</span>
            </a>

            <span onClick={() => { navigate( "/terms-and-conditions" ); }} style={{color:LoginStyle?.login_color}}>Terms and Conditions</span>

            <span onClick={() => {
              navigate("/contact")
            }} style={{color:LoginStyle?.login_color}}>Contact US</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
