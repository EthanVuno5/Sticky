// create unique id for card, workspace

import { useState } from "react";
import "./App.css";
import Board from "./components/todo_board/board";
import Menu from "./components/Menubar/menu";
import { Cards } from "./dataBase/tasksData";
export default function App() {
  const boardsData = [
    {
      title: "My Board",
      id: "bID00000b",
      type: "note",
      board: Cards,
    },
  ];
  const users = [
    {
      userInfo: {
        name: "hieu vu dep zai",
        avatar: "./app",
        key: "1",
        id: "UID100",
      },
      workSpace: [
        {
          title: "My Work Space",
          boards: boardsData,
        },
      ],
    },
  ];
  const [boards, setBoardData] = useState(users[0].workSpace[0].boards);
  const [currentBoardIndex, setCurrenBoardIndex] = useState(0);
  const newBoardId = "bID" + Math.random().toString(36).slice(2, 7) + "b";
  const boardTitle = boards.map((board) => {
    return { title: board.title, id: board.id, type: board.type };
  });
  function switchBoard(boardId) {
    const newBoardIndex = boards.findIndex((board) => board.id === boardId);
    setCurrenBoardIndex(newBoardIndex);
  }
  function updateBoard(newBoard) {
    const copyBoard = boards.map((board) => {
      if (board.id === newBoard.id) {
        return { ...newBoard };
      } else return board;
    });
    setBoardData(copyBoard);
  }
  function addNewBoard(boardType) {
    const newBoards = [
      {
        title: "Untitled",
        id: newBoardId,
        type: boardType,
        board: [],
      },
      ...boards,
    ];
    setBoardData(newBoards);
    setCurrenBoardIndex(0);
  }

  function delBoard(boardId) {
    const newBoards = boards.filter((board) => board.id !== boardId);
    if (boards.length === 1) {
      newBoards.push({
        title: "Untitled",
        id: newBoardId,
        type: boards.find((board) => board.id === boardId).type,
        board: [],
      });
    }
    setBoardData(newBoards);
    setCurrenBoardIndex(0);
  }

  function duplicateBoard(boardId) {
    const copied = boards.find((board) => board.id === boardId);
    // const reconizerCopiedBoardId = Math.random().toString(36).slice(2, 4);

    // const copiedBoards = boards.filter((board) => board.title === copied.title);
    // console.log(copiedBoards);
    setBoardData([
      {
        ...copied,
        // title: copied.title + " " + boards.length,
        // id: newBoardId + reconizerCopiedBoardId,
        id: newBoardId,
      },
      ...boards,
    ]);
    setCurrenBoardIndex(0);
  }
  function setNewTitle(boardId, newTitle) {
    setBoardData(
      boards.map((board) => {
        if (board.id === boardId) {
          return { ...board, title: newTitle };
        }
        return board;
      }),
    );
  }
  return (
    <div className="app">
      <Menu
        user={users[0].userInfo}
        boardsTitle={boardTitle}
        switchBoard={switchBoard}
        currentBoardId={boards[currentBoardIndex].id}
        addNewBoard={addNewBoard}
        delBoard={delBoard}
        duplicateBoard={duplicateBoard}
        setNewTitle={setNewTitle}
      />
      <div className="boardsContainer">
        <Board
          currentBoard={boards[currentBoardIndex]}
          newBoardId={boards[currentBoardIndex].id}
          updateBoard={updateBoard}
          key={boards[currentBoardIndex].id}
        />
      </div>
    </div>
  );
}
