import React from 'react'
import navCss from './nav.module.css'

const Navbar = () => {
  return (
    <nav className={`${navCss['nav-bar']}`}>
      <ul className={`${navCss['nav-bar__list']}`}>
        <li className={navCss.left}>Focus</li>
        <li>Github</li>
      </ul>
    </nav>
  )
}

export default Navbar
