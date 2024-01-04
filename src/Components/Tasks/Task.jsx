import React, { useRef, useState } from 'react'
import cross from '../../assets/cross.svg'
import dot from '../../assets/dot.svg'
import FocusPage from '../FocusPage/FocusPage'

import taskCss from './task.module.css'

const Task = ({ task, id, hrs, mins, secs, deleteTask }) => {

    const startRef = useRef();
    const [showModal, setShowModal] = useState(false)
    const [showStart, setShowStart] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    function handleStart() {
        setShowModal(true)
    }

    function handleMenu() {
        setShowMenu(prev => !prev)
    }
    return (
        <div className={taskCss.single_task}
            onMouseLeave={() => { if (!showModal) setShowStart(false) }}
            onMouseOver={() => { if (!showModal) setShowStart(true) }}
        >
            <div className={taskCss.content}>
                <div ref={startRef}
                    onClick={handleStart}
                    className={taskCss.id}
                >{showStart ? 'Start' : id + 1}</div>
                <p className={taskCss.name}>{task}</p>
            </div>
            <div className={taskCss.delete} onClick={() => deleteTask(id)} ><img src={cross} alt="" /></div>
            {showModal && <div className={`${taskCss.myModal} ${showStart ? taskCss.start : taskCss.id}`}><FocusPage
                hrs={hrs}
                mins={mins}
                secs={secs}
                setShowModal={setShowModal}
                setShowStart={setShowStart}
            /></div>}
            <div className={taskCss.menu} onClick={() => handleMenu}>
                <img src={dot} alt="" />
                <img src={dot} alt="" />
                <img src={dot} alt="" />
            </div>
        </div>
    )
}

export default Task