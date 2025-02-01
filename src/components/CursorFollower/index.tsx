"use client";

import { useEffect, useState } from "react";

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          window.getComputedStyle(target).cursor === "pointer"
      );

      setIsHovering(isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-[#8c1df3] opacity-70 mix-blend-screen transition-all duration-300 ease-out ${
          isHovering ? "h-8 w-8 blur-sm" : "h-3 w-3 glow"
        }`}
        style={{
          transform: `translate(${position.x - (isHovering ? 16 : 6)}px, ${
            position.y - (isHovering ? 16 : 6)
          }px)`,
        }}
      />
      {isHovering && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-white mix-blend-difference transition-all duration-200 ease-out"
          style={{
            transform: `translate(${position.x - 1}px, ${position.y - 1}px)`,
          }}
        />
      )}
    </>
  );
};

export default CursorFollower;
