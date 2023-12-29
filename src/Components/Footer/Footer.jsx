import React, { useState, useRef, useEffect } from 'react'
import footerCss from './foot.module.css'

import play from '../../assets/play.svg'
import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'
import pause from '../../assets/pause.svg'

const Footer = ({ focus }) => {

  const [isPlaying, setIsPlaying] = useState(true);

  function handlePlay() {
    setIsPlaying(prev => !prev)
  }
  return (
    <div className={footerCss.footerDiv}>
      {focus &&
        <p>Song name : Meadows</p>
      }
      {focus &&
        <div className={footerCss.player}>
          <button className={footerCss.prev}><img src={prev} alt="" /></button>
          {isPlaying ?
            <button onClick={handlePlay} className={footerCss.play}><img src={play} alt="" /></button>
            :
            <button onClick={handlePlay} className={footerCss.play}><img src={pause} alt="" /></button>
          }
          <button className={footerCss.next}><img src={next} alt="" /></button>
        </div>
      }
      <p className={footerCss.author}>Made By: Shruti Kolla</p>
    </div>
  )
}

export default Footer