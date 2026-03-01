import { useState } from "react";

export default function TaskNavBar({ hideCard, isHide, deleteCard }) {
	const [hide, setHide] = useState(isHide);
	function hiding(e) {
		e.stopPropagation();
		hideCard(!hide);
		setHide(!hide);
	}
	return (
		<div className="taskNavBar">
			<button className="hideCard" onClick={hiding}>
				<i
					className={
						hide ? "expandBtn fa-solid fa-chevron-down" : "fa-solid  fa-minus"
					}></i>
			</button>
			<button
				className="deleteCard"
				onClick={(e) => {
					deleteCard(), e.stopPropagation();
				}}>
				{!hide && <i className="fa-solid fa-xmark"></i>}
			</button>
		</div>
	);
}
