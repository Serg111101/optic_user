import { useState,useEffect } from "react";
import "./Color.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorColors } from "../../store/action/MirrorColorsAction";


export function Color() {
  const {MirrorColors}=useAppSelector(state=>state.MirrorColors)
  
  const dispatch = useAppDispatch()
  const name='Mirror Colors'
  console.log(MirrorColors);
  
  useEffect(() => {
    dispatch(fetchMirrorColors(name));
}, [dispatch]);

  return (
    <div className="color" >
      <div className="line_div1">
        <div className="line1"></div>
            <p className="mirorparagraph" >{MirrorColors[0]?.title_div}</p>
        <div className="line1"></div>
      </div>
      <div className="gridContainer" >
        {MirrorColors?.map((el, index) => (
          <div key={index} className="gridik">
                <img src={el?.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
