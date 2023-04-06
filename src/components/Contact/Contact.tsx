import React from 'react'
import "./Contact.scss"
export  function Contact() {
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

      <div className='textBottom' >
        <div className='textLeft' >
          <h2>Best Optic Lab, Inc</h2>
          <p>820 Thompson Ave, Ste 30 Glendale, CA 91201</p>
          <p>(818) 649-1799</p>
        </div>
        <div className='textRight' >
          <h2>Hours</h2>
          <p>
            Mon 09:00 am – 05:00 pm <br /> Tue 09:00 am – 05:00 pm <br /> Wed
            09:00 am – 05:00 pm <br />
            <b>Thu 09:00 am – 05:00 pm</b>
            <br />
            Fri 09:00 am – 05:00 pm <br />
            Sat Closed <br />
            Sun Closed <br />
          </p>
        </div>
      </div>
    </div>
  );
}
