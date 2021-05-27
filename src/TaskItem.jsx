import React, { useState } from "react";
import { db } from "./firebase";

const TaskItem = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title });
  };

  const deletTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={editTask}>Edit</button>
      <button onClick={deletTask}>Delet</button>
    </div>
  );
};

export default TaskItem;
