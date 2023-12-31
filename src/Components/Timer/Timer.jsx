import React from "react";
import { useState, useEffect } from "react";
const Timer = ({ hrs, mins, secs }) => {

    const [timerVal, setTimerVal] = useState({
        hrs: hrs,
        mins: mins,
        secs: secs
    })

    useEffect(() => {
        const dateobj = new Date();
        const deadline = new Date()
        deadline.setTime(dateobj.getTime() + hrs * 60 * 60 * 1000 + mins * 60 * 1000 + secs * 1000 + 1000);
        const intervalId = setInterval(() => {
            const currTime = new Date();
            const timeDiff = deadline - currTime;

            if (timeDiff <= 0) {
                clearInterval(intervalId);
                setTimerVal({ hrs: 0, mins: 0, secs: 0 });
            } else {
                const hours = Math.floor(timeDiff / 3600000);
                const minutes = Math.floor((timeDiff % 3600000) / 60000);
                const seconds = Math.floor((timeDiff % 60000) / 1000);

                setTimerVal({ hrs: hours, mins: minutes, secs: seconds });
            }
        }, 1000)
        return () => { clearInterval(intervalId) }
    }, [hrs, mins, secs])
    return (
        <div>
            {timerVal.hrs < 10 ?
                '0' + timerVal.hrs :
                timerVal.hrs
            }:{timerVal.mins < 10 ?
                '0' + timerVal.mins :
                timerVal.mins
            }:{timerVal.secs < 10 ?
                '0' + timerVal.secs :
                timerVal.secs
            }
        </div>
    )
}

export default Timer;