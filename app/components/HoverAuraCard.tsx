"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState, useRef } from "react";

interface HoverAuraCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverAuraCard({ children, className = "" }: HoverAuraCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(110, 231, 183, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
