import React from 'react'
import Navbar from '../Navbar/Navbar'
import cross from '../../assets/cross.svg'
const TaskPage = ({ hrs, mins, secs, setShowModal, setShowStart }) => {
  return (
    <div>
      <Navbar />
      <img src={cross} onClick={() => {setShowModal(false); setShowStart(false)}} alt="" />
      {hrs} : {mins} : {secs}
    </div>
  )
}

export default TaskPage
