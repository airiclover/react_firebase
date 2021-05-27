import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import { auth } from "./firebase";
import TaskItem from "./TaskItem";

const App = (props) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });

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
      <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        Logout
      </button>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button disabled={!input} onClick={newTask}>
        Click!
      </button>
      {tasks.map((task) => (
        <h4 key={task.id}>
          <TaskItem id={task.id} title={task.title} />
        </h4>
      ))}
    </div>
  );
};

export default App;
