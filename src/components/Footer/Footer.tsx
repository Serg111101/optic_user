import React from 'react'
import "./Footer.scss"
import { FacebookOutlined,InstagramOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <div className='footer' >
      <footer className='containerFooter' >

        <div className='linkIcons' ><a href="https://www.facebook.com/bestopticlab/"><FacebookOutlined /></a></div>
        <div className='linkIcons' ><a href="https://www.instagram.com/best_optic_lab/?__coig_restricted=1"><InstagramOutlined /></a></div>
        </footer>

    </div>
  )
}
