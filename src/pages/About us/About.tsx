import "./About.scss";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchAbout } from "../../store/action/AboutAction";


export function About() {

  const {About} = useAppSelector(state=>state.About)
  const dispatch = useAppDispatch()
  const [name] = useState('Products and Services')

  useEffect(()=>{
    dispatch(fetchAbout(name))
  },[dispatch,name])
  
  return (
    <div className="about">
      <div className="line_div">
        <div className="line"></div>
        <p>{About[0]?.title_div}</p>
        <div className="line"></div>
      </div>
      {
        About?.map((el:any,index:number)=>
        <div className="About_div" key={el.id}>
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
          <img src={el.image?el.image:'https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/631108ad-718c-433c-aaad-63328e2832e7.jpg/:/cr=t:9.68%25,l:0%25,w:100%25,h:80.65%25/rs=w:600,h:300,cg:true'} alt="" />
          </>}
        </div>)
      }
    </div>
  );
}
