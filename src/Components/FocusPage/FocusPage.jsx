import React from 'react'
import Navbar from '../Navbar/Navbar'
import focusCss from './focus.module.css'
import Footer from '../Footer/Footer'

const FocusPage = ({ hrs, mins, secs, setShowModal, setShowStart }) => {
  return (
    <div className={focusCss.focusDiv}>
      <Navbar focus={true} setShowModal={setShowModal} setShowStart={setShowStart} />
      {hrs} : {mins} : {secs}
      <Footer focus={true}/>
    </div>
  )
}

export default FocusPage
