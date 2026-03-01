import "./styleSheets/menu.css";
import "./styleSheets/mainMenu.css";
import "./styleSheets/functionMenu.css";
import { useState } from "react";
import FunctionMenu from "./functionMenu";
import MainMenu from "./mainMenu";
import ExtendedMenu from "./extendedMenu";
import BackgroundCancelling from "./backgroundCanceling";
import { HideMenuBtn } from "./MenuBtns";
import HandleMove from "../Master/handleMovement";
import UserInfo from "./userInfo";

export default function Menu({
  user,
  boardsTitle,
  switchBoard,
  currentBoardId,
  addNewBoard,
  delBoard,
  duplicateBoard,
  setNewTitle,
}) {
  const [isHide, setHide] = useState(false);
  const [preSize, setPreSize] = useState(300);
  const [size, setSize] = useState(preSize);
  function onResize(width) {
    const newSize = size + width;
    setSize(newSize);
    if (newSize > 60) {
      setHide(false);
    } else if (newSize > 5 && isHide === true) {
      setSize(100);
      setHide(false);
    } else {
      setSize(0);
      setHide(true);
    }
  }
  function onHide() {
    setHide(!isHide);
    setSize(0);
    setPreSize(size);
    if (isHide === true) {
      setSize(preSize);
    }
  }
  const [extendedMenuCoordinate, setExtendedMenuCoordinate] = useState([0, 0]);
  const [extendedMenuHide, setExtendedMenuHide] = useState(true);

  function onExtendedMenu(coordinates) {
    setExtendedMenuCoordinate(coordinates);
  }
  const [targetedTitle, setTargetedTitle] = useState(
    boardsTitle.find((title) => title.id === currentBoardId).title,
  );
  const [editedTitleId, setEditedTitleId] = useState(currentBoardId);
  const [onHideRename, setOnHideRename] = useState(true);

  function getBoardTitle(boardId) {
    setTargetedTitle(boardsTitle.find((title) => title.id === boardId).title);
    setEditedTitleId(boardId);
  }

  return (
    <div
      className={"menuSection h-screen"}
      style={{ width: `${size}px`, maxWidth: `${size}px` }}
    >
      <div className="flex h-screen flex-col justify-between">
        <FunctionMenu
          addNewBoard={addNewBoard}
          onExtendedMenu={onExtendedMenu}
        />
        <MainMenu
          boardsTitle={boardsTitle}
          currentBoardId={currentBoardId}
          switchBoard={switchBoard}
          onExtendedMenu={onExtendedMenu}
          setExtendedMenuHide={setExtendedMenuHide}
          extendedMenuHide={extendedMenuHide}
          getBoardTitle={getBoardTitle}
        />
        <UserInfo user={user} />
      </div>
      <HideMenuBtn onHide={onHide} isHide={isHide} />
      <BackgroundCancelling
        extendedMenuHide={extendedMenuHide}
        setExtendedMenuHide={setExtendedMenuHide}
        setOnHideRename={setOnHideRename}
      >
        <ExtendedMenu
          extendedMenuCoordinate={extendedMenuCoordinate}
          delBoard={delBoard}
          duplicateBoard={duplicateBoard}
          setOnHideRename={setOnHideRename}
          getBoardTitle={getBoardTitle}
          setNewTitle={setNewTitle}
          editedTitleId={editedTitleId}
          setTargetedTitle={setTargetedTitle}
          targetedTitle={targetedTitle}
          onHideRename={onHideRename}
        />
      </BackgroundCancelling>
      <HandleMove onMove={onResize} targetClassName={"addJustSizeBar"} />
    </div>
  );
}
