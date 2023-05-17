import { useCallback, useEffect, useRef, useState } from 'react';
import "./Galery.scss"
import { fetchHome } from "../../store/action/HomeAction";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Loading } from '../loading';

export function Galery() {
  const { loading,  Home }: any = useAppSelector((state) => state.Home)
  const dispatch = useAppDispatch();

  const [width, setWidth] = useState(((window.innerWidth / 100) * 70) - 200)
  const [widthimg, setWidthImg] = useState((window.innerWidth / 100) * 54)
  const [transform, settransform] = useState(0)
  const [index, setIndex] = useState(0);
  const [x, setX] = useState(0);

  const timeoutRef: any = useRef(null);
  const delay = 2500;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const fun = useCallback(() => {

    timeoutRef.current = setTimeout(() => {

      setIndex((x) => (x === Home.length - 1 ? 0 : x + 1));
    }, delay);
  }, [Home.length]);

  useEffect(() => {
    dispatch(fetchHome())
  }, [dispatch])


  useEffect(() => {
    resetTimeout();
    fun();

    return () => {
      resetTimeout();
    }

  }, [resetTimeout, fun, Home.length, setIndex, index]);

  useEffect(() => {
    if ((index * 85 - 50) - x > width) {
      settransform(transform + 1)
      setX(x + 280)
    } else if (index === 0) {
      setX(0)
      settransform(0)
    } else {
      settransform(transform)
    }
    setWidth(((window.innerWidth / 100) * 80) - 200)
    setWidthImg((window.innerWidth / 100) * 54)

  }, [index,transform,width,widthimg,x])
  return (
    <div>
      {loading ? <Loading /> :
       <>
        <div className="line_div">
          <div className="line"></div>
          <p>Photo Galery</p>
          <div className="line"></div>
        </div>
        <div className="slideshow">
          <div className="slideshowSlider" style={{ transform: `translate3d(${-index * (width)}px, 0, 0)` }}>
            {Home?.map((el: any, inde: number) => (
              <div
                className={index !== inde ? "activee" : "activee aaa1"}
                key={inde}
                style={{ marginLeft: inde === 0 ? `${width - 450}px` : '', maxWidth: `${widthimg}px` }}
                onClick={() => {
                  setIndex(inde);
                }}
              >
                <img src={el.image} alt='galery_foto' />
              </div>
            ))}
          </div>
          <div className="slideshowDots_111" style={{ width: `${width}px` }}>
            <div className="slideshowDots" style={{ transform: transform ? `translate3d(${-transform * 280}px, 0, 0)` : '' }}>
              {Home?.map((el: any, idx: number) => (

              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}

              >
                <img src={el.image} alt='galery_change'/>

              </div>
              ))}
            </div>
          </div>
        </div>
    </>}
    </div >
  )
}