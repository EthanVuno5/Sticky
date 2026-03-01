import { useState } from "react";
export default function AddCard({ addCard }) {
	const [newCard, setCard] = useState({
		title: "",
		coordinates: null,
		isHide: false,
		taskList: [],
	});
	function getCardTitle(e) {
		setCard({ ...newCard, title: e.target.value });
	}
	function addNewCard() {
		if (newCard.title !== "") {
			setCard({ ...newCard, title: "" });
			addCard({ ...newCard, coordinates: { x: 30, y: 10 } });
		}
	}
	return (
		<div className="newCardInputContainer">
			<div className="newCardInputForm">
				<input
					type="text"
					onChange={getCardTitle}
					value={newCard.title}
					placeholder="Add a new card"
				/>
				<i
					className="fa-solid fa-plus"
					onClick={() => {
						addNewCard();
					}}></i>
			</div>
		</div>
	);
}
