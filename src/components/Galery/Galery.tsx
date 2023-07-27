/*eslint-disable*/

import { useEffect, useRef } from 'react';
import { fetchHome } from '../../store/action/HomeAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loading } from '../loading';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import "./Galery.scss";

export function Galery() {
  const { loading, Home }: any = useAppSelector((state) => state.Home);
  const galleryRef: any = useRef();

  const dispatch = useAppDispatch();
  let heightt;
  useEffect(()=>{
  heightt = window.innerHeight;
  },[window.innerHeight])

  useEffect(() => {
    dispatch(fetchHome());
    galleryRef?.current?.play();
  }, [dispatch]);

  return (
    <div className="mainDiv">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="line_div">
            <div className="line"></div>
            <p>Photo Gallery</p>
            <div className="line"></div>
          </div>

          <div className="imageGalery"style={{height:`${heightt}px`}} >
            <ImageGallery
              items={Home?.map((el: any, index: number) => ({
                original: el?.image,
                thumbnail: el?.image,
                originalAlt: `Image ${index + 1}`,
                thumbnailAlt: `Image ${index + 1}`,
              }))}
              showPlayButton={true}
              autoPlay={true}
              slideInterval={2000}
              showThumbnails={true}
              showFullscreenButton={true}
              showNav={true}
              showIndex={true}
              lazyLoad={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
