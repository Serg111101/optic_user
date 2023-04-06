import React, { useState } from "react";
import "./Footer.scss";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate()

  const [show, setShow] = useState( false );



  return (
    <div className="footer">
      <footer className="containerFooter">
        <div className="linkIcons">
          <div className="link1">
            <a href="https://www.facebook.com/bestopticlab/">
              <FacebookOutlined />
            </a>
          </div>
          <div className="link2">
            <a href="https://www.instagram.com/best_optic_lab/?__coig_restricted=1">
              <InstagramOutlined />
            </a>
          </div>
        </div>

        <div className="footerText">
          <div className="textAbout">
            Copyright © 2018 Best Optic Lab, Inc - All Rights Reserved.{" "}
          </div>
          <div className="linkText">
            <a href="https://www.freeprivacypolicy.com/privacy/view/435a9c30b1335b8e09e21580430da181">
              Privacy Policy
              <span>/</span>
            </a>

            <span onClick={() => { navigate( "/terms-and-conditions" ); }} >Terms and Conditions</span>
            <span onClick={() => {
              navigate("/contact")
            }} >Contact US</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
