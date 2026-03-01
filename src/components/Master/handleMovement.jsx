import { useState } from "react";
export default function HandleMove({ onMove, targetClassName }) {
  const [coordinates, setCoordinate] = useState({});
  const [mouseDown, setPointerDown] = useState(false);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);

    setCoordinate({
      x: e.clientX,
      y: e.clientY,
    });
    setPointerDown(true);
  }
  function handlePointerMove(e) {
    if (mouseDown) {
      setCoordinate({
        x: e.clientX,
        y: e.clientY,
      });
      onMove(e.clientX - coordinates.x, e.clientY - coordinates.y);
    }
  }
  function handlePointerUp() {
    setPointerDown(false);
    onMove(0, 0);
  }

  return (
    <div
      className={targetClassName}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    ></div>
  );
}
