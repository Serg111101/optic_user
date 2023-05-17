import "./Themes.scss"
import { useAppDispatch,useAppSelector } from "../../hooks/redux";
import { fetchThemes } from "../../store/action/ThemesAction";
import { useEffect } from "react";




export  function Themes() {
  const {Themes}:any=useAppSelector(state=>state.Themes)
  const dispatch=useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchThemes())
  },[dispatch])




  return (
    <div className="themes">
      <div className='line_div'>
        <div className='line'></div>
        <p>Terms and Conditions</p>
        <div className='line'></div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: Themes.text }} />
    </div>
  );
}
