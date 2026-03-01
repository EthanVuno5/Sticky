import "./styleSheets/extendedMenu.css";

export default function ExtendedMenu({
	extendedMenuCoordinate,
	delBoard,
	duplicateBoard,
	setOnHideRename,
	getBoardTitle,
	setNewTitle,
	editedTitleId,
	setTargetedTitle,
	targetedTitle,
	onHideRename,
}) {
	return (
		<div
			className="extendedMenu"
			style={{
				left: extendedMenuCoordinate[0],
				top: extendedMenuCoordinate[1],
			}}>
			{onHideRename ? (
				<ul>
					<div className="menuHeader">Settings</div>
					<li
						onClick={() => {
							duplicateBoard(editedTitleId);
						}}>
						<i className="fa-regular fa-copy"></i>Duplicate
					</li>
					<li
						onClick={(e) => {
							e.stopPropagation();
							getBoardTitle(editedTitleId);
							setOnHideRename(!onHideRename);
						}}>
						<i className="fa-solid fa-pen-to-square"></i>Rename
					</li>
					<li
						onClick={() => {
							delBoard(editedTitleId);
						}}
						className="delBoard">
						<i className="fa-solid fa-trash"></i>Delete
					</li>
				</ul>
			) : (
				<form
					action=""
					onSubmit={(e) => {
						e.preventDefault();
						setOnHideRename(!onHideRename);
					}}>
					<input
						type="text"
						onChange={(e) => {
							setTargetedTitle(e.target.value);
							setNewTitle(editedTitleId, e.target.value);
						}}
						onClick={(e) => {
							e.stopPropagation();
						}}
						value={targetedTitle}
					/>
				</form>
			)}
		</div>
	);
}
