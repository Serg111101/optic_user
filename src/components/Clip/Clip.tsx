import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchClip} from "../../store/action/ClipAction";
import {useEffect, useRef,} from "react";
import './Clip.scss'
import ImageGallery from 'react-image-gallery'

import 'react-image-gallery/styles/scss/image-gallery.scss';

export function Clip() {
  const {Clip}=useAppSelector(state=>state.Clip)
  const dispatch = useAppDispatch()
  const name='Clip Styles'
  const galleryRef:any = useRef();
  
  useEffect(() => {
    dispatch(fetchClip(name));
    galleryRef?.current?.play();
}, [dispatch]);


  

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
          <ImageGallery
              items={Clip?.map((el: any, index: number) => ({
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
  )
}
