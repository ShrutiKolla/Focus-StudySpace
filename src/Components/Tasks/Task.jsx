import React from 'react'
import taskCss from './task.module.css'
import cross from '../../assets/cross.svg'

const Task = ({ task, id }) => {
    return (
        <div className={taskCss.single_task}>
            <div className={taskCss.content}>
                <div className={taskCss.id}>{id + 1}</div>
                <p>{task}</p>
            </div>
            <div className={taskCss.delete}><img src={cross} alt="" /></div>
        </div>
    )
}

export default Task
