import React, { useState, useRef, useEffect } from 'react'
import footerCss from './foot.module.css'

import play from '../../assets/play.svg'
import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'
import pause from '../../assets/pause.svg'
import musicDb from './musicDb.json'

const Footer = ({ focus, genre, setGenre, audioRef, song, setSong, changeSong, volRef, initialize }) => {

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (genre !== undefined && song !== undefined) {
      audioRef.current.src = musicDb[genre][song].url;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [genre, song]);

  function handlePlay(val) {
    if (val == 1) {
      setIsPlaying(prev => {
        prev ? audioRef.current.pause() : audioRef.current.play();
        return !prev;
      })
    } else if (val == 2) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }
  return (

    <div className={footerCss.footerDiv}>
      {focus &&
        <p>Song name : {musicDb[genre][song].name}</p>
      }
      {focus &&
        <div className={footerCss.player}>
          <audio
            onPlay={() => handlePlay(2)}
            onPause={() => handlePlay(3)}
            onEnded={() => audioRef.current.play()} autoPlay
            ref={audioRef}
            onLoadedMetadata={() => initialize()}
            src={musicDb[genre][song].url}
          ></audio>
          <button className={footerCss.prev} onClick={() => { changeSong(-1); audioRef.current.play() }}><img src={prev} alt="" /></button>
          {!isPlaying ?
            <button onClick={() => {
              console.log('clicked on play')
              handlePlay(1)
            }} className={footerCss.play}><img src={play} alt="" /></button>
            :
            <button onClick={() => {
              console.log('clicked on pause')
              handlePlay(1)
            }} className={footerCss.play}><img src={pause} alt="" /></button>
          }
          <button className={footerCss.next} onClick={() => { changeSong(1); audioRef.current.play() }}><img src={next} alt="" /></button>
        </div>
      }
      <p className={footerCss.author}>Made By: Shruti Kolla</p>
    </div>
  )
}

export default Footer