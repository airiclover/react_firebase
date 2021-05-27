import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";

const App = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const newTask = () => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo App by React/firebase</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button disabled={!input} onClick={newTask}>
        Click!
      </button>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;
