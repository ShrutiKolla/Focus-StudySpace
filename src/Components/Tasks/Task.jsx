import React, { useRef, useState } from 'react'
import taskCss from './task.module.css'
import cross from '../../assets/cross.svg'
import TaskPage from '../TaskPage/TaskPage'

const Task = ({ task, id, hrs, mins, secs, deleteTask }) => {

    const startRef = useRef();
    const [showModal, setShowModal] = useState(false)
    const [showStart, setShowStart] = useState(false);

    function handleStart() {
        setShowModal(true)
    }

    return (
        <div className={taskCss.single_task}
            onMouseLeave={() => {if(!showModal) setShowStart(false)}}
            onMouseOver={() => {if(!showModal) setShowStart(true)}}
        >
            <div className={taskCss.content}>
                <div ref={startRef}
                    onClick={handleStart}
                    className={taskCss.id}
                >{showStart ? 'Start' : id + 1}</div>
                <p>{task}</p>
            </div>
            <div className={taskCss.delete} onClick={() => deleteTask(id)} ><img src={cross} alt="" /></div>
            {showModal && <div className={`${taskCss.myModal} ${showStart ? taskCss.start : taskCss.id}`}><TaskPage
                hrs={hrs}
                mins={mins}
                secs={secs}
                setShowModal={setShowModal}
                setShowStart={setShowStart}
            /></div>}
        </div>
    )
}

export default Task