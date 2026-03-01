import { useState } from "react";
export default function AddTask({ addNewTask }) {
	const [newTask, setNewTask] = useState({ title: "" });
	function getTitle(e) {
		setNewTask({ ...newTask, title: e.target.value, checked: false });
	}
	return (
		<div className="newTaskInput">
			<input
				type="text"
				onClick={(e) => {
					e.stopPropagation();
				}}
				onChange={getTitle}
				value={newTask.title}
				placeholder="New task"
			/>
			<i
				className="fa-solid fa-plus"
				onClick={(e) => {
					e.stopPropagation();
					if (newTask.title !== "") {
						addNewTask(newTask);
						setNewTask({ ...newTask, title: "" });
					}
				}}></i>
		</div>
	);
}
