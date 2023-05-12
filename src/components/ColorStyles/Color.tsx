import React, { useEffect, useState } from 'react'
import { fetchMirrorColors } from '../../store/action/MirrorColorsAction';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './Color.scss'

export function Color() {

  const [name, setName] = useState('Mirror Colors');
  const dispatch = useAppDispatch();

  const { MirrorColors }: any = useAppSelector(state => state.MirrorColors)

  useEffect(() => {
    dispatch(fetchMirrorColors(name))
  }, [dispatch])

  return (
    <div className='color'>
      <div className='line_div'>
        <div className='line'></div>
        <p>{MirrorColors[0]?.title_div}</p>
        <div className='line'></div>
      </div>
      <div className='color_option'>
      {
        MirrorColors?.map((el: any) =>
          <div key={el.id} className='color_div'>
            <div className='color_div_image'>
              <img src={el.image} />
              <span></span>
              <p>{el.title}</p>
            </div>
            <p>{el.text}</p>
          </div>

        )
      }
      </div>
    </div>
  )
}

