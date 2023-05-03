import { useNavigate } from "react-router-dom";
import "./About.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchAbout } from "../../store/action/AboutAction";


export function About() {

  const {About} = useAppSelector(state=>state.About)
  const dispatch = useAppDispatch()
  const navigate=useNavigate()
  const [name, setName] = useState('Products and Services')

  useEffect(()=>{
    dispatch(fetchAbout(name))
  },[dispatch])
  console.log(About);
  
  return (
    <div className="about">
      <div className="line_div">
        <div className="line"></div>
        <p>{About[0]?.title_div}</p>
        <div className="line"></div>
      </div>
      {
        About?.map((el:any,index:number)=><div className="About_div">
          {index%2===0?<>
          <img src={el.image} alt="" />
          <div>
            <h2>{el.title}</h2>
            <p>{el.text}</p>
          </div>
          </>:<>
          <div>
            <h2>{el.title}</h2>
            <p>{el.text}</p>
          </div>
          <img src={el.image} alt="" />
          </>}
        </div>)
      }
{/* 
      <div className="dv1">
        <div className="imageDiv1">
          <img
            src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/c8466294-eac6-423d-adcf-1e37beffe788.jpg/:/cr=t:2.83%25,l:0%25,w:100%25,h:94.34%25/rs=w:600,h:300,cg:true"
            alt="image"
          />
        </div>
        <div className="titleText1">
          <h3>Custom Clip-on Sunglasses</h3>
          <p>
            Best Optic Lab, Inc makes custom clip-on sunglasses for all optical
            frames, metal, plastic, rimless, semi-rimless. We make the clip-on
            with any shape to match the frame and any color to match the color
            of the frame. We can also make the frames multicolor, tortoise,
            shiny or matte. <br /> <br /> <br /> Our clips are made in the USA
            and are handmade by professional technicians.
          </p>

          <div className="butt">
            <button className="submit" onClick={()=>navigate('/ClipandLendStyles')}>Clip Styles</button>{" "}

          </div>
        </div>
      </div>
      <div className="dv2">
        <div className="titleText2">
          <h3>Metal Frame Recoloring</h3>
          <p>We also recolor metal frames with any color.</p>
        </div>
        <div className="imageDiv2">
          <img
            src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/631108ad-718c-433c-aaad-63328e2832e7.jpg/:/cr=t:9.68%25,l:0%25,w:100%25,h:80.65%25/rs=w:600,h:300,cg:true"
            alt="image"
          />
        </div>
      </div>
      <div className="dv3">
        <div className="imageDiv3">
          <img
            src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/5aeab6a2-bd73-4262-bf0f-6320ca78cca4.jpg/:/rs=w:600,h:300,cg:true,m/cr=w:600,h:300"
            alt="image"
          />
        </div>
        <div className="titleText3">
          <h3>Plastic Frame Finish</h3>
          <p>We can polish your old plastic frames or make it matte finish. </p>
        </div>
      </div> */}
    </div>
  );
}
