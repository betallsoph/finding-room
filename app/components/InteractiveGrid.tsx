'use client';

import React, { useState, useId } from 'react';

interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 50,
  height = 50,
  squares = [30, 20],
  className = '',
  squaresClassName = '',
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const id = useId();

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={`${id}-${index}`}
            x={x}
            y={y}
            width={width}
            height={height}
            strokeWidth={0.5}
            className={`
              stroke-gray-300/30 
              transition-all 
              duration-100 
              ease-in-out
              [&:not(:hover)]:duration-1000
              ${hoveredSquare === index ? 'fill-blue-300/20' : 'fill-transparent'}
              ${squaresClassName}
            `}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}

interface InteractiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function InteractiveGrid({ children, className = '' }: InteractiveGridProps) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <InteractiveGridPattern 
        width={50} 
        height={50} 
        squares={[40, 25]}
        className="pointer-events-auto"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
