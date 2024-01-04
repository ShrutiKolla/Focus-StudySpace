import React from 'react'

import NotifCss from './complete.module.css'

const CompleteNotif = () => {
    return (
        <div className={NotifCss.notifDiv}>
            <div className={NotifCss.notifBody}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nesciunt iure mollitia tempora neque sapiente molestiae architecto hic delectus doloremque.</p>
                <button className={NotifCss.btn}>Leave the timer</button>
                <button className={NotifCss.btn}>Continue</button>
            </div>
        </div>
    )
}

export default CompleteNotif