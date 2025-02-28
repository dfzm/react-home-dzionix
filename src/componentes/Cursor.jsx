import React, { useEffect } from "react";

const BlurredCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector(".blurred-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="blurred-cursor">
      <div className="cursor-center"></div>
      <div className="cursor-blur"></div>
    </div>
  );
};

export default BlurredCursor;
