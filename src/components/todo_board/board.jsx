import { useState } from "react";
import AddCard from "./addCard.jsx";
import "./styleSheets/board.css";
import "./styleSheets/newCardInput.css";
import Card from "./card.jsx";

export default function Board({ currentBoard, updateBoard }) {
	const [board, setBoard] = useState(currentBoard);
	function handleCards(cardIndex, isRemoved) {
		const copyBoard = board.board.filter((card, index) => index !== cardIndex);
		if (isRemoved === true) {
			const newBoard = { ...board, board: copyBoard };
			setBoard(newBoard);
			updateBoard(newBoard);
		} else {
			setBoard({
				...board,
				board: [...copyBoard, board.board[cardIndex]],
			});
			updateBoard({
				...board,
				board: [...copyBoard, board.board[cardIndex]],
			});
		}
	}
	function addCard(newCard) {
		const newId = board.board.length;
		const copyCards = [...board.board, { ...newCard, id: newId }];
		setBoard({ ...board, board: copyCards });
		updateBoard({ ...board, board: copyCards });
	}
	const [onBoardTitleEditing, setOnBoardTitleEditing] = useState(false);
	const [instantTitle, setInstantTitle] = useState(board.title);
	function getBoardTitle(e) {
		setInstantTitle(e.target.value);
	}

	function updateCards(newCard) {
		const _newCards = board.board.map((card) => {
			if (newCard.id === card.id) {
				return newCard;
			} else {
				return card;
			}
		});
		setBoard({ ...board, board: _newCards });
		updateBoard({ ...board, board: _newCards });
	}
	return (
		<div className="board">
			<div className="boardTitle">
				<h1 onClick={() => setOnBoardTitleEditing(true)}>
					{currentBoard.title}
				</h1>
				{onBoardTitleEditing && (
					<div className="boardTitleInput">
						<input value={instantTitle} onChange={getBoardTitle} />
						<i
							className="fa-regular fa-thumbs-up"
							onClick={() => {
								setOnBoardTitleEditing(!onBoardTitleEditing);
								setBoard({ ...board, title: instantTitle });
								updateBoard({ ...board, title: instantTitle });
							}}></i>
					</div>
				)}
			</div>
			<AddCard addCard={addCard} updateBoard={updateBoard} />
			<div className="mainBoard">
				{board.board.map((card, index) => (
					<Card
						card={card}
						key={card.id}
						cardIndex={index}
						cardId={card.id}
						handleCards={handleCards}
						updateCards={updateCards}
					/>
				))}
			</div>
		</div>
	);
}
