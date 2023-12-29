import React from 'react'
import navCss from './nav.module.css'
import cross from '../../assets/cross.svg'

const Navbar = ({ focus, setShowModal, setShowStart }) => {
  return (
    <nav className={`${navCss['nav-bar']}`}>
      <ul className={`${navCss['nav-bar__list']}`}>
        <li className={navCss.left}>Focus</li>
        <li className={navCss.right}>Github</li>
        {focus &&
          <img className={navCss.cross} src={cross} onClick={() => { setShowModal(false); setShowStart(false) }} alt="" />
        }
      </ul>
    </nav>
  )
}

export default Navbar
