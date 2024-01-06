import React, { useState, useRef } from "react"
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Clock from "./Components/Clock/Clock";
import Task from "./Components/Tasks/Task";
const App = () => {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])
  const [newTask, setNewTask] = useState({ task: '', hrs: 0, mins: 0, secs: 0 })
  const inpRef = useRef()

  const taskElements = tasks.map((task, key) => {
    return <Task key={key}
      id={key}
      task={task.task}
      hrs={task.hrs}
      mins={task.mins}
      secs={task.secs}
      deleteTask={deleteTask}
    />
  })

  function handleAdd() {
    inpRef.current.style.display = 'flex'
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
    let currTasks = [];
    if (localStorage.getItem("tasks")) {
      currTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    currTasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(currTasks));
    setTasks(currTasks)
    setNewTask({ task: '', hrs: 0, mins: 0, secs: 0 });
    inpRef.current.style.display = 'none'
  }

  function handleBack() {
    inpRef.current.style.display = 'none'
  }

  function deleteTask(id) {
    setTasks(prev => {
      let currTasks = [...prev]
      currTasks.splice(id, 1);
      localStorage.setItem("tasks", JSON.stringify(currTasks));
      return currTasks
    })
  }
  return (
    <div className="fullPage">
      <header>
        <Navbar />
      </header>
      <main>
        <Clock />
        <div className="tasks">
          <div className="head">Your Tasks</div>
          <div className="upperDiv">
            <button className="add" onClick={handleAdd}>+</button>
            <div className="addForm" ref={inpRef}>
              <input className="taskInp" type="text" placeholder="ENTER YOUR TASK TITLE" name="task" onChange={handleChange} value={newTask.task} />
              <div className="inputDiv">
                <section className="input">
                  <input className="numberInput" type="number" max="24" min="0" name="hrs" onChange={handleChange} value={newTask.hrs} />
                  <span>HOURS</span>
                </section>
                <section className="input">
                  <input className="numberInput" type="number" max="60" min="0" name="mins" onChange={handleChange} value={newTask.mins} />
                  <span>MINS</span>
                </section>
                <section className="input">
                  <input className="numberInput" type="number" max="60" min="0" name="secs" onChange={handleChange} value={newTask.secs} />
                  <span>SECS</span>
                </section>
              </div>
              <div className="btns">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleBack}>Back</button>
              </div>
              <hr />
            </div>
          </div>
          <div className="lowerDiv">
            {taskElements.length > 0 ?
              <>
                {taskElements}
              </>
              :
              <div>
                <p>No items to show</p>
              </div>
            }

          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;