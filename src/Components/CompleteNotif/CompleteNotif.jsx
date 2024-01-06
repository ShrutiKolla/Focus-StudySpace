import React from 'react'

import neko from '../../assets/neko.svg'
import NotifCss from './complete.module.css'

const CompleteNotif = ({ resetTimer, setComplete, setShowModal, setShowStart }) => {
    return (
        <div className={NotifCss.notifDiv}>
            <div className={NotifCss.notifBody}>
                <div className={NotifCss.content}>
                    <img className={NotifCss} src={neko} alt="" />
                    <p>Great job completing your task...</p>
                </div>
                <div className={NotifCss.btns}>
                    <button className={NotifCss.btn} onClick={() => { setShowModal(false); setShowStart(false) }}>Leave the timer</button>
                    <button className={NotifCss.btn} onClick={() => { resetTimer(); setComplete(false) }}>Start Again</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteNotif