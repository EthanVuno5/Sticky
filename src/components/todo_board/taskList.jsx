import { useState } from "react";

export default function TaskList({
  list,
  editTask,
  deleteTask,
  checkTask,
  updateCards,
}) {
  return (
    <ul className="taskList">
      {list.map((task) => (
        <Task
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          checkTask={checkTask}
        />
      ))}
    </ul>
  );
}

function Task({ task, editTask, deleteTask, checkTask }) {
  const [isEditing, setEdit] = useState(false);
  const [edited, setEdited] = useState(task);
  const [editBtn, setEditBtn] = useState("fa-solid fa-pen");
  const content = isEditing ? (
    <input type="text" value={edited.title} onChange={editing} />
  ) : (
    <p>{edited.title}</p>
  );
  function editing(e) {
    setEdited({ ...task, title: e.target.value });
  }
  function handleEdit() {
    if (isEditing) {
      setEditBtn("fa-solid fa-pen");
      setEdit(false);
      editTask(edited);
    } else {
      setEditBtn("fa-solid fa-check");
      setEdit(true);
    }
  }
  const [nextCheck, setCheck] = useState(task.checked);
  function handleCheck() {
    setCheck(!nextCheck);
    checkTask(task.id, !nextCheck);
  }
  return (
    <li className={nextCheck ? "task checked" : "task"}>
      <input type="checkbox" onChange={handleCheck} checked={nextCheck} />
      <div className="taskContent">{content}</div>
      <div className="funcBtnContainer">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
        >
          <i className={editBtn}></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(edited.id);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
