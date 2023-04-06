import { Header } from "../../components/Header";
import "./Home.scss";
import { useEffect, useRef, useState } from 'react';

export  function Home() {
  const images = [
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/8a76c317-88fc-42e7-9f49-85e7fd370050.jpg/:/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/302d553c-1427-4ca2-9e61-21de3226e881.jpg/:/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/3c3dfdf0-b6b0-4a38-b6ce-c9f5ce47c5e1.jpg/:/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/357c1d86-a2c6-4584-86b8-33aaadf38d65.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/18ceed76-67c3-44fb-bd64-54121b1bd7e9.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/559d63f0-1f33-4059-92b8-3c6283bbaa5e.jpg/:/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/10b5c225-e693-4669-9a85-a39e9cbdeb6f.jpg/:/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/37095551-2792-43fa-9f59-9026f49c1f89.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1300,h:800",
    "https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/4ca8ed7c-bad5-4adb-ab80-ebffac3b09a1.jpg/:/rs=w:1300,h:800",

  ];
  const delay = 2500;
  const [index, setIndex] = useState( 0 );

  const timeoutRef:any = useRef( null );
  function resetTimeout():void {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }


  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);


  return (
      <div className="home" >
      <Header />

       <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((_, index) => (
          <div
            className="slide"
            key={index}
            // style={{ backgroundColor }}
          >
            {
              <img src={ images[index]} alt=''/>
            }
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>


      </div>
  )
}
