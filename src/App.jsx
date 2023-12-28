import React, { useState, useRef } from "react"
import Navbar from "./Components/Navbar/Navbar";
import Clock from "./Components/Clock/Clock";
import Task from "./Components/Tasks/Task";
const App = () => {

  const data = [{
    title: "natural language processing",
    hrs: "1",
    mins: "23",
    secs: "10"
  },
  {
    title: "database management system",
    hrs: "1",
    mins: "23",
    secs: "10"
  }]
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ task: '', hrs: 0, mins: 0, secs: 0 })
  const inpRef = useRef()

  console.log(newTask);
  console.log(tasks);
  const taskElements = tasks.map((task, key) => {
    return <Task key={key}
      id={key}
      task={task.task}
      hrs={task.hrs}
      mins={task.mins}
      secs={task.secs}
    />
  })

  function handleAdd() {
    inpRef.current.style.display = 'block'
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewTask(prev => {
      const curr = { ...prev }
      curr[name] = value;
      return curr;
    })
  }

  function handleSave() {
    setTasks(prev => {
      const curr = [...prev];
      curr.unshift(newTask);
      return curr;
    });
    setNewTask({ task: '', hrs: 0, mins: 0, secs: 0 });
    inpRef.current.style.display = 'none'
  }

  return (
    <div className="fullPage">
      <header>
        <Navbar />
      </header>
      <main>
        <Clock />
        <div className="tasks">
          <div className="addForm" ref={inpRef}>
            <input type="text" placeholder="task" name="task" onChange={handleChange} value={newTask.task} />
            <div className="input">
              <input className="number-input" type="number" max="24" min="0" name="hrs" onChange={handleChange} value={newTask.hrs} />
              <span>hour</span>
              <input className="number-input" type="number" max="60" min="0" name="mins" onChange={handleChange} value={newTask.mins} />
              <span>min</span>
              <input className="number-input" type="number" max="60" min="0" name="secs" onChange={handleChange} value={newTask.secs} />
              <span>sec</span>
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
          <div className="head">Your Tasks</div>
          {taskElements.length > 0 ?
            <>
              <button className="add" onClick={handleAdd}>+</button>
              {taskElements}
            </>
            :
            <div>
              <p>No items to show</p>
              <button className="add" onClick={handleAdd}>+</button>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default App;