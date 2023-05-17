import { useState, useEffect } from "react";
import "./Lens.scss";
import { Color } from "../ColorStyles";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchMirrorCoating } from "../../store/action/MirrorCoatingAction";
import { fetchAntiReflectiveCoating } from "../../store/action/AntiReflectiveCoatingAction";
// import { EditOutlined, CloseOutlined, CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Lens() {

  const { MirrorCoating } = useAppSelector(state => state.MirrorCoating);
  const { AntiReflectiveCoating } = useAppSelector(state => state.AntiReflectiveCoating)

  
  const dispatch = useAppDispatch()
  const [name, setName] = useState('Mirror Coating')
  const [name1, setName1] = useState('Anti-Reflective Coating')
  useEffect(() => {
    dispatch(fetchMirrorCoating(name));
    dispatch(fetchAntiReflectiveCoating(name1))
  }, [dispatch]);
  const [Show, setShow] = useState(false);

  return (
    <div className="lens">
      <div className="line_div">
        <div className="line"></div>
            <p>{MirrorCoating[0]?.title_div} </p>
        <div className="line"></div>
      </div>

      <div className="contaDiv">
        {MirrorCoating.map((el) =>
          <div key={el.id}>          
              <p className="titleP">{el.title}</p>

              <p className="texta">{el.text}</p>
          </div>
        )}
        <div className="butt">
          <button className="submit" onClick={() => setShow(!Show)}>
            {Show ? "HIDDE" : "SHOW"} COLOR GUIDE
          </button>
        </div>
        {Show && <Color />}
      </div>

      <div className="lens">
        <div className="line_divs">
          <div className="lines"></div>
              <p>{AntiReflectiveCoating[0]?.title_div} </p>
          <div className="lines"></div>
        </div>

        <div className="classBottomm">
          {AntiReflectiveCoating?.map((el, index) => (
            <div className="classBottom" key={el.id}>
              
                  <div className="divImage1">
                    <img src={el.image} alt="Image" />
                  </div>

                  <div className="Lens_textaBottom">
                    <p className="textaBottomTitle">{el.title}</p>

                    <p className="textaM">{el.text}</p>
                  </div>
                 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
