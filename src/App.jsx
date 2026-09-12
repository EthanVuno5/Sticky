// create unique id for boards, card, workspace
// create an emty board, emty card

import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/todo_board/board";
import Menu from "./components/Menubar/menu";
export default function App() {
  const boardsData = [
    {
      title: "Board 1",
      id: 1,
      type: "note",
      board: [],
    },
  ];
  const users = [
    {
      userInfo: {
        name: "hieu vu dep zai",
        avatar: "./app",
        key: "1",
        id: "us100",
      },
      workSpace: [
        {
          title: "workSpace1",
          boards: boardsData,
        },
      ],
    },
  ];
  const [boards, setBoardData] = useState(users[0].workSpace[0].boards);
  const [currentBoardIndex, setCurrenBoardIndex] = useState(0);
  const newBoardId = Math.random().toString(36) + Date.now().toString(36);

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
    setBoardData([
      ...boards,
      {
        title: "Untitled",
        id: newBoardId,
        type: boardType,
        board: [],
      },
    ]);
    setCurrenBoardIndex(0);
  }
  useEffect(() => {
    console.log("current board id: ", boards[currentBoardIndex].id);
  }, [boards, currentBoardIndex]);
  function delBoard(boardId) {
    if (boards.length === 1) {
      addNewBoard("note");
      // setBoardData(boards.filter((board) => board.id !== boardId));
    } else setBoardData(boards.filter((board) => board.id !== boardId));
  }

  function duplicateBoard(boardId) {
    setBoardData([
      {
        ...boards.find((board) => board.id === boardId),
        id: boards.length,
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
