import React from 'react'
import clockCss from './clock.module.css'

const Clock = () => {
    return (
        <div className={clockCss.clock_bg}>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    HOURS
                </p>
                <div className={clockCss.box}>
                    <div className={clockCss.digit}>1</div>
                    <div className={clockCss.digit}>7</div>
                </div>
            </div> <span className={`${clockCss.separator} ${clockCss.gray}`}><strong>:</strong></span>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    MINUTES
                </p>
                <div className={clockCss.box}>
                    <div className={clockCss.digit}>1</div>
                    <div className={clockCss.digit}>7</div>
                </div>
            </div> <span className={`${clockCss.separator} ${clockCss.gray}`}><strong>:</strong></span>
            <div className={clockCss.container}>
                <p className={`${clockCss.title} ${clockCss.gray}`}>
                    SECONDS
                </p>
                <div className={clockCss.box}>
                    <div className={clockCss.digit}>1</div>
                    <div className={clockCss.digit}>7</div>
                </div>
            </div>
        </div>
    )
}

export default Clock
