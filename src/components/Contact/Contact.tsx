import React from 'react'
import "./Contact.scss"
export function Contact() {


  const data = new Date()
  const day:number=data.getDay()

const arrData = [
  "  Mon 09:00 am – 05:00 pm",
  "Tue 09:00 am – 05:00 pm ",
  "Wed 09:00 am – 05:00 pm ",
  "Thu 09:00 am – 05:00 pm",
  "Fri 09:00 am – 05:00 pm ",
  "  Sat Closed",
  "Sun Closed",
];


  return (
    <div className="contact">
      <div className="title">info@bestopticlab.com</div>

      <div className="inputs">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email*" />

        <textarea placeholder="Message" className={"text"} />
      </div>

      <div className="btn">
        <button>SEND</button>
        <p>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      <div className="textBottom">
        <div className="textLeft">
          <h2>Best Optic Lab, Inc</h2>
          <p>820 Thompson Ave, Ste 30 Glendale, CA 91201</p>
          <p>(818) 649-1799</p>
        </div>
        <div className="textRight">
          <h2>Hours</h2>

          {arrData.map((item: any, index: any) =>
            index == day - 1 ? (
              <b key={index}>{item}</b>
            ) : (
              <p key={index}>{item}</p>
            )
          )}
        </div>
      </div>

      <div className="footerTop">
        <div className="sub">Supscribe</div>
        <div className="in">
          <input type="email" placeholder="EMAIL ADRESS" />
        </div>
        <div className="btn2">
          <button>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
