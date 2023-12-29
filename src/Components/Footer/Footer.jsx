import React from 'react'
import footerCss from './foot.module.css'

const Footer = ({ focus }) => {
  return (
    <div className={footerCss.footerDiv}>
      {focus &&
        <p>Song name : Meadows</p>
      }
      {focus &&
        <div className={footerCss.player}>
          <div className={footerCss.prev}>prev</div>
          <div className={footerCss.play}>play</div>
          <div className={footerCss.next}>next</div>
        </div>
      }
      <p className={footerCss.author}>Made By: Shruti Kolla</p>
    </div>
  )
}

export default Footer