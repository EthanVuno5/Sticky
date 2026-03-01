import { useState } from "react";
import "./App.css";
import Board from "./components/todo_board/board";
import Menu from "./components/Menubar/menu";
export default function App() {
  const boardsData = [
    {
      title: "Board 1",
      id: 0,
      type: "note",
      board: [
        {
          id: 0,
          title: "Task1",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "hello",
              checked: true,
            },
            {
              id: 2,
              title: "hi",
              checked: false,
            },
            {
              id: 3,
              title: "halo",
              checked: false,
            },
          ],
        },
        {
          id: 1,
          title: "Greetings",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "nihao",
              checked: false,
            },
            {
              id: 2,
              title: "chao",
              checked: false,
            },
            {
              id: 3,
              title: "hola",
              checked: false,
            },
          ],
        },
        {
          id: 2,
          title: "You're welcome",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "bonjour",
              checked: false,
            },
            {
              id: 2,
              title: "konichiwa",
              checked: false,
            },
            {
              id: 3,
              title: "samwanika",
              checked: false,
            },
          ],
        },
        {
          id: 3,
          title: "Task3",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "What's up",
              checked: true,
            },
            {
              id: 2,
              title: "Hey you",
              checked: false,
            },
            {
              id: 3,
              title: "How have you been",
              checked: false,
            },
          ],
        },
        {
          id: 4,
          title: "Task4",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "I'm fine",
              checked: true,
            },
            {
              id: 2,
              title: "Nice to meet you!",
              checked: false,
            },
            {
              id: 3,
              title: "Comment cava?",
              checked: false,
            },
          ],
        },
      ],
    },
    {
      title: "Keep fit",
      id: 1,
      type: "note",
      board: [
        {
          id: 0,
          title: "Keep busy",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "yeah",
              checked: true,
            },
            {
              id: 2,
              title: "hi",
              checked: false,
            },
            {
              id: 3,
              title: "halo",
              checked: false,
            },
          ],
        },
        {
          id: 1,
          title: "Greetings",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "nihao",
              checked: false,
            },
            {
              id: 2,
              title: "chao",
              checked: false,
            },
          ],
        },
        {
          id: 2,
          title: "Jogging",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "What's up",
              checked: true,
            },
            {
              id: 2,
              title: "Hey you",
              checked: false,
            },
            {
              id: 3,
              title: "How have you been",
              checked: false,
            },
          ],
        },
      ],
    },
    {
      title: "Board 3",
      id: 2,
      type: "note",
      board: [
        {
          id: 0,
          title: "Keep busy",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "yeah",
              checked: true,
            },
            {
              id: 2,
              title: "hi",
              checked: false,
            },
            {
              id: 3,
              title: "halo",
              checked: false,
            },
          ],
        },
        {
          id: 1,
          title: "Greetings",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "nihao",
              checked: false,
            },
            {
              id: 2,
              title: "chao",
              checked: false,
            },
          ],
        },
        {
          id: 2,
          title: "Jogging",
          coordinates: null,
          isHide: false,
          taskList: [
            {
              id: 1,
              title: "What's up",
              checked: true,
            },
            {
              id: 2,
              title: "Hey you",
              checked: false,
            },
            {
              id: 3,
              title: "How have you been",
              checked: false,
            },
          ],
        },
      ],
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
      {
        title: "Untitled",
        id: boards.length,
        type: boardType,
        board: [],
      },
      ...boards,
    ]);
    setCurrenBoardIndex(0);
  }

  function delBoard(boardId) {
    setBoardData(boards.filter((board) => board.id !== boardId));
    // setCurrenBoardIndex(boards.findIndex((board) => board.id === boardId));
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
