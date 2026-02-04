# 🎨 Hướng Dẫn Chi Tiết: Interactive Grid Pattern

## 📖 Tổng Quan

**Interactive Grid Pattern** là một kỹ thuật tạo background pattern với các ô vuông có thể tương tác. Khi người dùng di chuột qua các ô vuông, chúng sẽ thay đổi màu sắc (tô đậm) để tạo hiệu ứng tương tác thú vị.

### Kỹ Thuật Sử Dụng

Kỹ thuật này kết hợp:
1. **SVG (Scalable Vector Graphics)** - Để vẽ grid pattern
2. **React State Management** - Để track ô vuông đang được hover
3. **Mouse Events** - Để detect khi người dùng di chuột vào/ra khỏi ô vuông
4. **Conditional Styling** - Để thay đổi style dựa trên state

---

## 🔍 Phân Tích Kỹ Thuật

### 1. SVG Grid Pattern

**Tại sao dùng SVG?**
- SVG là vector graphics, không bị mờ khi zoom
- Có thể tương tác với từng element (rect) riêng lẻ
- Performance tốt với nhiều elements
- Dễ dàng style và animate

**Cấu trúc:**
```jsx
<svg width={totalWidth} height={totalHeight}>
  {squares.map((square, index) => (
    <rect 
      key={index}
      x={xPosition}
      y={yPosition}
      width={squareWidth}
      height={squareHeight}
    />
  ))}
</svg>
```

### 2. State Management

**React State để track hover:**
```jsx
const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
```

- `null`: Không có ô nào đang được hover
- `number`: Index của ô đang được hover

### 3. Mouse Events

**onMouseEnter**: Khi chuột vào ô vuông
```jsx
onMouseEnter={() => setHoveredSquare(index)}
```

**onMouseLeave**: Khi chuột rời khỏi ô vuông
```jsx
onMouseLeave={() => setHoveredSquare(null)}
```

### 4. Conditional Styling

**Thay đổi fill color dựa trên state:**
```jsx
className={cn(
  hoveredSquare === index 
    ? "fill-gray-300/30"  // Đang hover: tô màu
    : "fill-transparent"  // Không hover: trong suốt
)}
```

---

## 💻 Implementation Chi Tiết

### Bước 1: Tạo Component Cơ Bản

```tsx
"use client";

import React, { useState } from "react";

interface InteractiveGridPatternProps {
  width?: number;        // Chiều rộng mỗi ô vuông
  height?: number;       // Chiều cao mỗi ô vuông
  squares?: [number, number]; // [số ô ngang, số ô dọc]
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 60,
  height = 60,
  squares = [25, 25],
  className,
  squaresClassName,
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      {/* Render các ô vuông */}
    </svg>
  );
}
```

### Bước 2: Tính Toán Vị Trí Các Ô Vuông

**Công thức tính vị trí:**

```tsx
{Array.from({ length: horizontal * vertical }).map((_, index) => {
  // Tính x: vị trí ngang = index % số ô ngang * chiều rộng
  const x = (index % horizontal) * width;
  
  // Tính y: vị trí dọc = floor(index / số ô ngang) * chiều cao
  const y = Math.floor(index / horizontal) * height;
  
  return (
    <rect
      key={index}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
})}
```

**Giải thích:**
- `index % horizontal`: Lấy phần dư để biết ô ở cột nào (0 đến horizontal-1)
- `Math.floor(index / horizontal)`: Lấy phần nguyên để biết ô ở hàng nào
- Nhân với `width`/`height` để có tọa độ pixel

**Ví dụ:**
- Grid 5x5, ô index = 7
- `x = 7 % 5 = 2` → Cột thứ 3 (0-indexed)
- `y = floor(7 / 5) = 1` → Hàng thứ 2 (0-indexed)
- `x = 2 * 60 = 120px`
- `y = 1 * 60 = 60px`

### Bước 3: Thêm Mouse Events

```tsx
<rect
  key={index}
  x={x}
  y={y}
  width={width}
  height={height}
  onMouseEnter={() => setHoveredSquare(index)}
  onMouseLeave={() => setHoveredSquare(null)}
/>
```

**Cách hoạt động:**
1. Khi chuột vào ô: `onMouseEnter` → set state = index của ô đó
2. Khi chuột rời: `onMouseLeave` → set state = null

### Bước 4: Conditional Styling

```tsx
<rect
  className={cn(
    // Base styles
    "stroke-gray-400/20",
    "transition-all duration-100 ease-in-out",
    "[&:not(:hover)]:duration-1000", // Khi không hover, transition chậm hơn
    
    // Conditional fill
    hoveredSquare === index 
      ? "fill-gray-300/30"  // Đang hover: tô màu
      : "fill-transparent",  // Không hover: trong suốt
    
    // Custom className từ props
    squaresClassName
  )}
/>
```

**Giải thích classes:**
- `stroke-gray-400/20`: Viền mỏng, màu xám nhạt (20% opacity)
- `transition-all duration-100`: Smooth transition khi hover
- `[&:not(:hover)]:duration-1000`: Khi không hover, transition chậm hơn (1s) để tạo hiệu ứng fade out mượt
- `fill-transparent`: Mặc định trong suốt
- `fill-gray-300/30`: Khi hover, tô màu xám (30% opacity)

---

## 🎨 Customization Options

### 1. Thay Đổi Màu Sắc

**Option 1: Dùng Tailwind classes**
```tsx
squaresClassName="hover:fill-blue-200/30"
```

**Option 2: Dùng inline style**
```tsx
<rect
  fill={hoveredSquare === index ? "rgba(147, 197, 253, 0.3)" : "transparent"}
/>
```

**Option 3: Dùng CSS variables**
```tsx
// Trong CSS
:root {
  --grid-hover-color: rgba(147, 197, 253, 0.3);
}

// Trong component
<rect
  fill={hoveredSquare === index ? "var(--grid-hover-color)" : "transparent"}
/>
```

### 2. Thay Đổi Kích Thước Ô Vuông

```tsx
<InteractiveGridPattern
  width={40}   // Ô nhỏ hơn
  height={40}
  squares={[30, 30]}  // Nhiều ô hơn
/>
```

### 3. Thay Đổi Số Lượng Ô Vuông

```tsx
<InteractiveGridPattern
  squares={[20, 15]}  // 20 ô ngang, 15 ô dọc
/>
```

### 4. Thay Đổi Animation Speed

```tsx
// Nhanh hơn
className="transition-all duration-50"

// Chậm hơn
className="transition-all duration-300"

// Không có animation
className="" // Bỏ transition
```

### 5. Thay Đổi Border Style

```tsx
// Border dày hơn
strokeWidth={1}

// Border màu khác
className="stroke-blue-400/30"

// Không có border
strokeWidth={0}
```

---

## 📝 Code Hoàn Chỉnh

### Version 1: Basic (TypeScript + React)

```tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // hoặc dùng clsx

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 60,
  height = 60,
  squares = [25, 25],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      )}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            strokeWidth={0.3}
            className={cn(
              "stroke-gray-400/20 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
```

### Version 2: JavaScript (Không TypeScript)

```jsx
"use client";

import React, { useState } from "react";

export function InteractiveGridPattern({
  width = 60,
  height = 60,
  squares = [25, 25],
  className = "",
  squaresClassName = "",
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`absolute inset-0 h-full w-full border border-gray-400/30 ${className}`}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            strokeWidth={0.3}
            className={`
              stroke-gray-400/20 
              transition-all 
              duration-100 
              ease-in-out
              ${hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent"}
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
```

### Version 3: Với Nhiều Customization Options

```tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
  // Custom options
  strokeColor?: string;
  hoverColor?: string;
  strokeWidth?: number;
  transitionDuration?: number;
  fadeOutDuration?: number;
}

export function InteractiveGridPattern({
  width = 60,
  height = 60,
  squares = [25, 25],
  className,
  squaresClassName,
  strokeColor = "gray-400/20",
  hoverColor = "gray-300/30",
  strokeWidth = 0.3,
  transitionDuration = 100,
  fadeOutDuration = 1000,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      )}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            strokeWidth={strokeWidth}
            className={cn(
              `stroke-${strokeColor}`,
              "transition-all ease-in-out",
              `duration-${transitionDuration}`,
              `[&:not(:hover)]:duration-${fadeOutDuration}`,
              hoveredSquare === index 
                ? `fill-${hoverColor}` 
                : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
```

---

## 🚀 Cách Sử Dụng

### 1. Import Component

```tsx
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
```

### 2. Sử Dụng Cơ Bản

```tsx
<div className="relative min-h-screen">
  <InteractiveGridPattern />
  {/* Nội dung của bạn */}
</div>
```

### 3. Customize

```tsx
<div className="relative min-h-screen">
  <InteractiveGridPattern
    width={50}
    height={50}
    squares={[30, 20]}
    squaresClassName="hover:fill-blue-200/30"
  />
  {/* Nội dung */}
</div>
```

### 4. Với Background Color

```tsx
<div className="relative min-h-screen bg-blue-100">
  <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
  <div className="relative z-10">
    {/* Nội dung */}
  </div>
</div>
```

---

## 🎯 Use Cases

### 1. Hero Section Background

```tsx
<section className="relative min-h-screen">
  <InteractiveGridPattern />
  <div className="relative z-10 flex items-center justify-center">
    <h1>Welcome</h1>
  </div>
</section>
```

### 2. Section Background

```tsx
<section className="relative py-20 bg-blue-100">
  <InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### 3. Card Background

```tsx
<div className="relative rounded-lg p-6">
  <InteractiveGridPattern 
    width={40}
    height={40}
    squares={[10, 10]}
  />
  <div className="relative z-10">
    {/* Card content */}
  </div>
</div>
```

### 4. Full Page Background

```tsx
<div className="relative min-h-screen">
  <InteractiveGridPattern 
    width={60}
    height={60}
    squares={[25, 25]}
    className="opacity-50"
  />
  {/* Page content */}
</div>
```

---

## 🔧 Troubleshooting

### Vấn Đề 1: Grid Không Hiển Thị

**Nguyên nhân:**
- SVG không có kích thước
- Container không có `position: relative`

**Giải pháp:**
```tsx
// Đảm bảo container có position relative
<div className="relative min-h-screen">
  <InteractiveGridPattern />
</div>
```

### Vấn Đề 2: Hover Không Hoạt Động

**Nguyên nhân:**
- Element khác đang block mouse events
- Z-index không đúng

**Giải pháp:**
```tsx
// Đảm bảo grid có z-index thấp hơn content
<div className="relative">
  <InteractiveGridPattern className="z-0" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Vấn Đề 3: Performance Kém Với Nhiều Ô Vuông

**Nguyên nhân:**
- Quá nhiều elements (ví dụ: 100x100 = 10,000 ô)

**Giải pháp:**
```tsx
// Giảm số lượng ô vuông
<InteractiveGridPattern
  width={80}  // Ô lớn hơn
  height={80}
  squares={[15, 15]}  // Ít ô hơn
/>
```

### Vấn Đề 4: Animation Không Mượt

**Nguyên nhân:**
- Transition duration không phù hợp
- Browser không support

**Giải pháp:**
```tsx
// Điều chỉnh duration
className="transition-all duration-100 ease-in-out"
```

---

## 💡 Tips & Best Practices

### 1. Performance Optimization

**Sử dụng `useMemo` cho calculations:**
```tsx
const squares = useMemo(() => {
  return Array.from({ length: horizontal * vertical }).map((_, index) => ({
    index,
    x: (index % horizontal) * width,
    y: Math.floor(index / horizontal) * height,
  }));
}, [horizontal, vertical, width, height]);
```

**Sử dụng `useCallback` cho event handlers:**
```tsx
const handleMouseEnter = useCallback((index: number) => {
  setHoveredSquare(index);
}, []);

const handleMouseLeave = useCallback(() => {
  setHoveredSquare(null);
}, []);
```

### 2. Accessibility

**Thêm `aria-hidden` cho decorative element:**
```tsx
<svg
  aria-hidden="true"
  // ... other props
>
```

### 3. Responsive Design

**Điều chỉnh số lượng ô dựa trên screen size:**
```tsx
const [squares, setSquares] = useState<[number, number]>([25, 25]);

useEffect(() => {
  const updateSquares = () => {
    if (window.innerWidth < 640) {
      setSquares([15, 15]);
    } else if (window.innerWidth < 1024) {
      setSquares([20, 20]);
    } else {
      setSquares([25, 25]);
    }
  };

  updateSquares();
  window.addEventListener('resize', updateSquares);
  return () => window.removeEventListener('resize', updateSquares);
}, []);
```

### 4. Custom Hover Effects

**Thêm ripple effect:**
```tsx
const [ripples, setRipples] = useState<Array<{x: number, y: number, id: number}>>([]);

const handleMouseEnter = (index: number, event: React.MouseEvent) => {
  setHoveredSquare(index);
  const rect = event.currentTarget.getBoundingClientRect();
  setRipples([...ripples, {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    id: Date.now()
  }]);
};
```

### 5. Color Variations

**Gradient fill:**
```tsx
<defs>
  <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="rgba(147, 197, 253, 0.3)" />
    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
  </linearGradient>
</defs>

<rect
  fill={hoveredSquare === index ? "url(#hoverGradient)" : "transparent"}
/>
```

---

## 📚 Advanced Techniques

### 1. Multiple Hover States

**Cho phép hover nhiều ô cùng lúc:**
```tsx
const [hoveredSquares, setHoveredSquares] = useState<Set<number>>(new Set());

const handleMouseEnter = (index: number) => {
  setHoveredSquares(prev => new Set(prev).add(index));
};

const handleMouseLeave = (index: number) => {
  setHoveredSquares(prev => {
    const next = new Set(prev);
    next.delete(index);
    return next;
  });
};

// Trong render
className={cn(
  hoveredSquares.has(index) ? "fill-gray-300/30" : "fill-transparent"
)}
```

### 2. Click to Toggle

**Click để toggle state:**
```tsx
const [selectedSquares, setSelectedSquares] = useState<Set<number>>(new Set());

const handleClick = (index: number) => {
  setSelectedSquares(prev => {
    const next = new Set(prev);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    return next;
  });
};

<rect
  onClick={() => handleClick(index)}
  className={cn(
    selectedSquares.has(index) ? "fill-blue-300/50" : "fill-transparent"
  )}
/>
```

### 3. Animated Grid Pattern

**Thêm animation cho toàn bộ grid:**
```tsx
const [animationOffset, setAnimationOffset] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setAnimationOffset(prev => (prev + 1) % 100);
  }, 50);
  return () => clearInterval(interval);
}, []);

// Trong render
<rect
  className={cn(
    "transition-all duration-300",
    `opacity-${(index + animationOffset) % 100 < 50 ? 30 : 10}`
  )}
/>
```

### 4. Interactive with Content

**Grid phản ứng với scroll:**
```tsx
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Trong render
<rect
  className={cn(
    scrollY > index * 10 ? "fill-blue-200/30" : "fill-transparent"
  )}
/>
```

---

## 🎨 Styling Variations

### 1. Minimal Style

```tsx
<InteractiveGridPattern
  strokeWidth={0.1}
  squaresClassName="hover:fill-gray-200/20"
/>
```

### 2. Bold Style

```tsx
<InteractiveGridPattern
  strokeWidth={1}
  squaresClassName="hover:fill-blue-400/50"
/>
```

### 3. Colorful Style

```tsx
<InteractiveGridPattern
  squaresClassName="hover:fill-blue-200/30 dark:hover:fill-purple-200/30"
/>
```

### 4. Gradient Style

```tsx
// Cần thêm defs trong SVG
<defs>
  <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="rgba(147, 197, 253, 0.3)" />
    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
  </linearGradient>
</defs>
```

---

## 📖 Tóm Tắt

### Kỹ Thuật Chính:
1. **SVG** để vẽ grid pattern
2. **React State** để track hover state
3. **Mouse Events** để detect interaction
4. **Conditional Styling** để thay đổi appearance

### Key Points:
- Mỗi ô vuông là một `<rect>` element riêng biệt
- State management đơn giản với `useState`
- Smooth transitions với CSS
- Highly customizable

### Best Practices:
- Giữ số lượng ô hợp lý để performance tốt
- Sử dụng `position: relative` cho container
- Đảm bảo z-index đúng
- Optimize với `useMemo` và `useCallback` nếu cần

---

**File này cung cấp đầy đủ thông tin để bạn có thể implement và customize Interactive Grid Pattern cho bất kỳ project nào!** 🚀

