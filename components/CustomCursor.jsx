
"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Desktop only
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let animationFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;

      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, input, textarea, select")) {
        follower.classList.add("cursor-active");
      } else {
        follower.classList.remove("cursor-active");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" />
      <div className="cursor-follower" />
    </>
  );
}
