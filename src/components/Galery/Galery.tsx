import { useEffect, useRef } from 'react';
import { fetchHome } from '../../store/action/HomeAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loading } from '../loading';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

export function Galery() {
  const { loading, Home }: any = useAppSelector((state) => state.Home);
  const galleryRef: any = useRef();

  const dispatch = useAppDispatch();

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

          <div className="imageGalery">
            <ImageGallery
              items={Home?.map((el: any, index: number) => ({
                original: el?.image,
                thumbnail: el?.image,
                originalAlt: `Image ${index + 1}`,
                thumbnailAlt: `Image ${index + 1}`,
              }))}
              showPlayButton={false}
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
