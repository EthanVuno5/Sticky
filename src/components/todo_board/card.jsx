import "./styleSheets/card.css";
import { useState } from "react";
import AddTask from "./addTask";
import TaskList from "./taskList";
import HandleMove from "../Master/handleMovement";
import TaskNavBar from "./task-navBar";
export default function Card({ card, cardIndex, handleCards, updateCards }) {
  const [currentCard, setCard] = useState(card);
  const columns = Math.floor((window.innerWidth * 0.8) / 300);
  const xRow =
    (cardIndex + 1) % columns === 0 ? columns : (cardIndex + 1) % columns;
  // not recommended as the new card always set with pre-set coordinates => used for sorting mode only
  const [coordinates, setCoordinate] = useState(
    card.coordinates === null
      ? {
          x: (xRow - 1) * 340 + 20,
          y: ((cardIndex + 1 - xRow) / columns) * 275,
        }
      : card.coordinates,
  );
  const [isHide, setHide] = useState(card.isHide);
  const [isEditTitle, setIsEditTitle] = useState(false);

  function addNewTask(newTask) {
    const newTaskList = {
      ...currentCard,
      taskList: [
        { ...newTask, id: currentCard.taskList.length + 1 },
        ...currentCard.taskList,
      ],
    };
    setCard(newTaskList);
    updateCards(newTaskList);
  }
  function editTask(editited) {
    const editedCard = {
      ...currentCard,
      taskList: currentCard.taskList.map((task) => {
        if (task.id === editited.id) {
          return editited;
        } else return task;
      }),
    };
    setCard(editedCard);
    updateCards(editedCard);
  }

  function deleteTask(delTaskId) {
    const newCard = {
      ...currentCard,
      taskList: currentCard.taskList.filter((task) => task.id !== delTaskId),
    };
    setCard(newCard);
    updateCards(newCard);
  }

  function checkTask(checkedId, nextCheck) {
    const newCard = {
      ...currentCard,
      taskList: currentCard.taskList.map((task) => {
        if (task.id === checkedId) {
          return { ...task, checked: nextCheck };
        } else return task;
      }),
    };
    setCard(newCard);
    updateCards(newCard);
  }
  const [rotateRacio, setRotate] = useState("0deg");
  function onMove(deltaX, deltaY) {
    setCoordinate({
      x: coordinates.x + deltaX,
      y: coordinates.y + deltaY,
    });
    if (coordinates.x < 0) {
      setCoordinate({
        x: 0,
        y: coordinates.y + deltaY,
      });
      setRotate("10deg");
    } else if (coordinates.y < 0) {
      setCoordinate({
        x: coordinates.x + deltaX,
        y: 0,
      });
    }
    if (deltaX < -10) {
      setRotate("-2deg");
    } else if (deltaX > 10) {
      setRotate("2deg");
    } else {
      setRotate("0deg");
    }
    const newCard = { ...currentCard, coordinates: coordinates };
    setCard(newCard);
    updateCards(newCard);
  }
  const [InstantCardTitle, setInstantCardTitle] = useState(currentCard.title);
  function getNewTitle(e) {
    e.stopPropagation();
    setInstantCardTitle(e.target.value);
  }
  function setNewTitle(e) {
    e.stopPropagation();
    const newCard = { ...currentCard, title: InstantCardTitle };
    setCard(newCard);
    updateCards(newCard);
    setIsEditTitle(isEditTitle ? false : true);
  }

  function hideCard(hide) {
    setHide(hide);
    updateCards({ ...currentCard, isHide: hide });
  }
  function deleteCard() {
    handleCards(cardIndex, true);
  }
  function setPrior() {
    handleCards(cardIndex, false);
  }
  return (
    <div
      className={isHide ? "card hide" : "card"}
      style={{
        root: {},
        transform: `translate(${coordinates.x}px,${coordinates.y}px)`,
        rotate: rotateRacio,
      }}
      onClick={setPrior}
    >
      <TaskNavBar hideCard={hideCard} isHide={isHide} deleteCard={deleteCard} />
      <HandleMove onMove={onMove} targetClassName={"moveBar"} />
      <>
        {" "}
        {isEditTitle ? (
          <div className="editTitle">
            <input
              type="text"
              onChange={getNewTitle}
              value={InstantCardTitle}
            />
            <i onClick={setNewTitle} className="fa-solid fa-check"></i>
          </div>
        ) : (
          <h2 onClick={setNewTitle}>{currentCard.title}</h2>
        )}
      </>
      <div className={"mainTaskContent"}>
        <AddTask addNewTask={addNewTask} />
        <TaskList
          list={currentCard.taskList}
          editTask={editTask}
          deleteTask={deleteTask}
          checkTask={checkTask}
        />
      </div>
      {/* <i className="settingGear fa-solid fa-gear"></i> */}
    </div>
  );
}
