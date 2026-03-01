export default function BackgroundCancelling({
	children,
	extendedMenuHide,
	setExtendedMenuHide,
	setOnHideRename,
}) {
	return (
		<div
			className="backgroundToCancel"
			style={{
				display: `${extendedMenuHide ? "none" : "block"}`,
			}}
			onClick={(e) => {
				e.stopPropagation();
				setExtendedMenuHide(true);
				setOnHideRename(true);
			}}>
			{children}
		</div>
	);
}
