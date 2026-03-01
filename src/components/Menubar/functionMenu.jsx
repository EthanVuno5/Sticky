export default function FunctionMenu({ addNewBoard, onExtendedMenu }) {
  return (
    <div>
      <ul className="functionMenu">
        {/* <li className="boardMenuItem functionMenuBtn bg-[var(--gray)]">
          <input type="text" className="outline-0" placeholder="Search..." />
        </li> */}
        <li
          className="boardMenuItem functionMenuBtn"
          onClick={(e) => {
            addNewBoard("note");
            onExtendedMenu([e.clientX, e.clientY]);
          }}
        >
          <div>
            <i className="fa-regular fa-clipboard"></i>
            <a href="#">New board</a>
          </div>
        </li>
        {/* <li className="boardMenuItem functionMenuBtn">
          <div>
            <i className="fa-solid fa-pen-to-square"></i>
            <a href="#">New Note</a>
          </div>
        </li> */}
      </ul>
    </div>
  );
}
