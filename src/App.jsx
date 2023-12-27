import React from "react"
import Navbar from "./Components/Navbar/Navbar";
import Clock from "./Components/Clock/Clock";

const App = () => {
  return (
    <div className="fullPage">
      <header>
        <Navbar />
      </header>
      <main>
        <Clock />
      </main>
    </div>
  )
}

export default App;