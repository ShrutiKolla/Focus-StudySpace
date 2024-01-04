import React, { useState, useRef, useEffect } from 'react'
import footerCss from './foot.module.css'

import play from '../../assets/play.svg'
import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'
import pause from '../../assets/pause.svg'
import musicDb from './musicDb.json'

const Footer = ({ focus, genre, setGenre, song, setSong, changeSong, volRef, audioRef, isPlaying, handlePlay, initialize }) => {


  return (
    <div className={footerCss.footerDiv}>
      {focus &&
        <p>Song name : {musicDb[genre][song].name}</p>
      }
      {focus &&
        <div className={footerCss.player}>
          <audio
            onEnded={() => audioRef.current.play()} autoPlay
            ref={audioRef}
            onLoadedMetadata={() => initialize()}
            src={musicDb[genre][song].url}
          ></audio>
          <button className={footerCss.prev} onClick={() => { changeSong(-1); audioRef.current.play() }}><img src={prev} alt="" /></button>
          {!isPlaying ?
            <button onClick={() => {console.log('clicked on play')
          handlePlay()}} className={footerCss.play}><img src={play} alt="" /></button>
            :
            <button onClick={() =>{console.log('clicked on pause')
          handlePlay()}} className={footerCss.play}><img src={pause} alt="" /></button>
          }
          <button className={footerCss.next} onClick={() => { changeSong(1); audioRef.current.play() }}><img src={next} alt="" /></button>
        </div>
      }
      <p className={footerCss.author}>Made By: Shruti Kolla</p>
    </div>
  )
}

export default Footer