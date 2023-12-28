import React, { useState, useEffect } from 'react'
import clockCss from './clock.module.css'

const Clock = () => {
    const dateobj = new Date();
    const [time, setTime] = useState({ hours: dateobj.getHours(), minutes: dateobj.getMinutes(), seconds: dateobj.getSeconds() })

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setTime({
                minutes: date.getMinutes(),
                hours: date.getHours(),
                seconds: date.getSeconds()
            })
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className={clockCss.clock_bg}>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    HOURS
                </p>
                <div className={clockCss.box}>
                    <div className={clockCss.digit}>{Math.trunc(time.hours / 10)}</div>
                    <div className={clockCss.digit}>{time.hours % 10}</div>
                </div>
            </div> <span className={`${clockCss.separator} ${clockCss.gray}`}><strong>:</strong></span>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    MINUTES
                </p>
                <div className={clockCss.box}>
                <div className={clockCss.digit}>{Math.trunc(time.minutes / 10)}</div>
                    <div className={clockCss.digit}>{time.minutes % 10}</div>
                </div>
            </div> <span className={`${clockCss.separator} ${clockCss.gray}`}><strong>:</strong></span>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    SECONDS
                </p>
                <div className={clockCss.box}>
                <div className={clockCss.digit}>{Math.trunc(time.seconds / 10)}</div>
                    <div className={clockCss.digit}>{time.seconds % 10}</div>
                </div>
            </div>
        </div>
    )
}

export default Clock
