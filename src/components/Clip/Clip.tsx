import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchClip} from "../../store/action/ClipAction";
import { useCallback, useEffect, useRef, useState } from "react";
import './Clip.scss'

export function Clip() {
  const {Clip}=useAppSelector(state=>state.Clip)
  const dispatch = useAppDispatch()
  const name='Clip Styles'

  useEffect(() => {
    dispatch(fetchClip(name));
}, [dispatch]);


  
  const delay = 2000;
  const [index, setIndex] = useState(0);

  const timeoutRef: any = useRef(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const fun = useCallback(() => {

    timeoutRef.current = setTimeout(() => {

      setIndex((x) => (x === Clip.length - 1 ? 0 : x + 1));
    }, delay);
  }, [Clip.length]);

  useEffect(() => {
    resetTimeout();
    fun();

    return () => {
      resetTimeout();

  };
}, [resetTimeout, fun, Clip.length, setIndex,index]);

  return (
    <div className='Clip'>
      <div className='Clip_line_div'>
        <div className='Clip_line'></div>
        <p>{Clip[0]?.title_div}</p>
        <div className='Clip_line'></div>
      </div>
      <div
        className="Clip_slideshow"
      >
        <div
          className="Clip_slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >

          {Clip.map((el:any, index) => (
            <div
              className={index < index + 1 && index > index - 1 ? "Clip_activee" : "Clip_aslide"}
              key={index}
              onClick={() => {
                setIndex(index)
              }}
            >
              {
                <img src={el.image} alt="Clip_image" />
              }
            </div>
          ))}

        </div>

        <div className="Clip_slideshowDots">
          {Clip.map((el:any, idx) => (
            <div
              key={idx}
              className={`Clip_slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            > <img src={el?.image} alt="Clip_foto" /> </div>
          ))}
        </div>
      </div>

    </div>
  )
}
