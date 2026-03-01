export default function MainMenu({
  boardsTitle,
  currentBoardId,
  switchBoard,
  onExtendedMenu,
  setExtendedMenuHide,
  getBoardTitle,
}) {
  return (
    <div className="h-full overflow-y-scroll">
      <h2 className="menuHeader">Board</h2>
      <ul className="mainMenu">
        {boardsTitle.map((boardTitle) => {
          let boardType;
          switch (boardTitle.type) {
            case "note":
              boardType = <i className="fa-solid fa-list-check"></i>;
              break;

            default:
              break;
          }
          return (
            <li
              key={boardTitle.id}
              onClick={() => {
                switchBoard(boardTitle.id);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                onExtendedMenu([e.clientX, e.clientY]);
                setExtendedMenuHide(false);
                getBoardTitle(boardTitle.id);
              }}
              className={
                boardTitle.id === currentBoardId
                  ? "boardMenuItem current"
                  : "boardMenuItem"
              }
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflowX: "hidden",
                }}
              >
                <span>{boardType}</span>
                {boardTitle.title}
              </div>
              <div className="flex">
                <button
                  className="menuItemExtendBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExtendedMenu([e.clientX, e.clientY]);
                    setExtendedMenuHide(false);
                    getBoardTitle(boardTitle.id);
                  }}
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
