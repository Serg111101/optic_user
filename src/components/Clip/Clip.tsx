import { useCallback, useEffect, useRef, useState } from 'react';
import "./Clip.scss"

export function Clip() {
  const images: string[] = [
    'https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/e52ff993-fef1-40d5-8276-aca78cfb6a09.jpg/:/rs=w:1300,h:800',
    'https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/e860576e-3999-442f-ae8b-893876ae04d6.jpg/:/rs=w:1300,h:800',
    'https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/0b682934-197d-4de4-9b31-d26e66408b6d.jpg/:/rs=w:1300,h:800',
    'https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/87d1d0bf-dcd6-4acd-98d8-7a350309f8fb.jpg/:/rs=w:1300,h:800'
  ];

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

      setIndex((x) => (x === images.length - 1 ? 0 : x + 1));
    }, delay);
  }, [images.length]);

  useEffect(() => {
    resetTimeout();
    fun();

    return () => {
      resetTimeout();

  };
}, [resetTimeout, fun, images.length, setIndex,index]);

  return (
    <div className='Clip'>
      <div className='Clip_line_div'>
        <div className='Clip_line'></div>
        <p>Clip Styles</p>
        <div className='Clip_line'></div>
      </div>
      <div
        className="Clip_slideshow"
      >
        <div
          className="Clip_slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >

          {images.map((_, index) => (
            <div
              className={index < index + 1 && index > index - 1 ? "Clip_activee" : "Clip_aslide"}
              key={index}
              onClick={() => {
                setIndex(index)
              }}
            >
              {
                <img src={images[index]} />
              }
            </div>
          ))}

        </div>

        <div className="Clip_slideshowDots">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`Clip_slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            > <img src={images[idx]} /> </div>
          ))}
        </div>
      </div>

    </div>
  )
}
