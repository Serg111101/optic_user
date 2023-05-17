import { useCallback, useEffect, useRef, useState } from 'react';
import "./Galery.scss"
import { useNavigate } from 'react-router-dom';
import { fetchHome } from "../../store/action/HomeAction";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export function Galery() {
  const { Home }: any = useAppSelector((state) => state.Home)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHome())
  }, [dispatch])

  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef: any = useRef(null);

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
    resetTimeout();
    fun();

    return () => {
      resetTimeout();

    };
  }, [resetTimeout, fun, Home.length, setIndex, index]);

  return (
    <div>
    <div className="line_div">
      <div className="line"></div>
      <p>Photo Galery</p>
      <div className="line"></div>
    </div>
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 69}%, 0, 0)` }}
      >

        {Home?.map((el: any, inde: number) => (
          <div
            className={index !== inde ? "activee" : "activee aaa1"}
            key={inde}
            onClick={() => {
              setIndex(inde);
            }}
          >
            <img src={el.image} />
          </div>
        ))}
      </div>
      <div className="slideshowDots_111">
        <div className="slideshowDots">
          {Home?.map((el: any, idx: number) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            >

              <img src={el.image} />

            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}