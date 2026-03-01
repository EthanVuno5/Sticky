export function HideMenuBtn({ onHide, isHide }) {
	return (
		<button className="hideMenuBtn" onClick={onHide}>
			<i
				className={
					isHide ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-left"
				}></i>
		</button>
	);
}
