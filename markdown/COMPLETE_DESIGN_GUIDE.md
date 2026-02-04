# 🎨 Complete Design System Guide
### Hướng Dẫn Chi Tiết Xây Dựng Website với Taskio Design System

> **Tài liệu tổng hợp** - Kết hợp từ DESIGN_SPECIFICATION.md, INTERACTIVE_GRID_PATTERN_GUIDE.md, REDESIGN_SUMMARY.md, và taskio_style_guide.md

---

## 📚 Mục Lục

1. [Tổng Quan Design System](#1-tổng-quan-design-system)
2. [Typography - Font & Text](#2-typography---font--text)
3. [Color Palette - Bảng Màu](#3-color-palette---bảng-màu)
4. [Shadows & Effects](#4-shadows--effects)
5. [Borders & Radius](#5-borders--radius)
6. [Components Library](#6-components-library)
7. [Interactive Grid Pattern](#7-interactive-grid-pattern)
8. [Animations](#8-animations)
9. [Responsive Design](#9-responsive-design)
10. [Implementation Tutorial](#10-implementation-tutorial)
11. [Best Practices](#11-best-practices)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Tổng Quan Design System

### 1.1. Triết Lý Thiết Kế

Taskio Design System dựa trên các nguyên tắc:

- **Bold & Confident**: Borders đậm (2px), shadows rõ ràng
- **Playful & Interactive**: Hover effects, animations vui nhộn
- **Modern & Clean**: Typography sạch sẽ, spacing rộng rãi
- **Color-Coded**: Mỗi trạng thái/category có màu riêng
- **Accessible**: Contrast tốt, keyboard navigation support

### 1.2. Tech Stack

#### Required Libraries
```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-react": "latest",
    "framer-motion": "^12.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### Recommended Fonts
- **Primary**: Quicksand (rounded, playful, Vietnamese support)
- **Alternatives**: Inter, Outfit, Manrope, Poppins
- **Font Weights**: 400, 500, 600, 700, 800

---

## 2. Typography - Font & Text

### 2.1. Font Setup (Next.js)

#### Bước 1: Import Font trong `app/layout.tsx`

```tsx
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"], // Support tiếng Việt
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={quicksand.variable}>
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  );
}
```

**⚠️ Lưu ý**: 
- **KHÔNG** sử dụng `@import url()` trong CSS với Tailwind v4
- Sử dụng Next.js font optimization cho performance tốt hơn
- Thêm `subsets: ["vietnamese"]` cho tiếng Việt

### 2.2. Typography Scale

#### Headings
```css
h1 { 
  font-size: clamp(36px, 5vw, 60px);  /* 36px-60px responsive */
  font-weight: 800;
  line-height: 1.1;
}

h2 { 
  font-size: 48px; 
  font-weight: 700;
}

h3 { 
  font-size: 32px; 
  font-weight: 700;
}
```

#### Tailwind Classes
```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
  Hero Title
</h1>

<h2 className="text-3xl font-bold">Section Heading</h2>

<h3 className="text-xl font-bold">Card Title</h3>

<p className="text-sm font-medium">Body Text (14px)</p>

<span className="text-xs">Small Text (12px)</span>
```

### 2.3. Typography trong globals.css

```css
/* app/globals.css */
@import "tailwindcss";

* {
  font-family: var(--font-quicksand), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

body {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: #0B0B0B;
}

/* Responsive Typography */
@media (max-width: 768px) {
  body {
    font-size: 13px;
  }
}
```

---

## 3. Color Palette - Bảng Màu

### 3.1. Primary Colors

```css
:root {
  /* Blue Palette */
  --primary-blue: rgb(147, 197, 253);      /* bg-blue-300 */
  --blue-dark: rgb(96, 165, 250);          /* bg-blue-400 */
  --blue-light: rgb(219, 234, 254);        /* bg-blue-100 */
  --blue-lighter: rgb(239, 246, 255);      /* bg-blue-50 */
  
  /* Text Colors */
  --text-primary: #0B0B0B;
  --text-secondary: #4A5568;
  
  /* Neutral */
  --background: #F6FAFF;
  --white: #FFFFFF;
  --border-soft: #E2E8F0;
}
```

### 3.2. Status Colors

#### Taskio Color Coding
```tsx
// Urgent & Important (Do First)
<div className="bg-red-50 border-red-500 text-red-600">
  Red: Urgent & Important
</div>

// Not Urgent & Important (Schedule)
<div className="bg-blue-50 border-blue-500 text-blue-600">
  Blue: Not Urgent & Important
</div>

// Urgent & Not Important (Delegate)
<div className="bg-yellow-50 border-yellow-500 text-yellow-600">
  Yellow: Urgent & Not Important
</div>

// Not Urgent & Not Important (Delete)
<div className="bg-gray-50 border-gray-500 text-gray-600">
  Gray: Not Urgent & Not Important
</div>

// Completed
<div className="bg-green-50 border-green-500 text-green-600">
  Green: Completed
</div>
```

### 3.3. Category Colors

```tsx
// Study - Pink
<span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
  📚 Study
</span>

// Hobby - Lime
<span className="bg-lime-100 text-lime-600 px-3 py-1 rounded-full">
  🎨 Hobby
</span>

// Work - Amber
<span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">
  💼 Work
</span>

// Personal - Sky
<span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full">
  👤 Personal
</span>

// Other - Zinc
<span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full">
  📌 Other
</span>
```

### 3.4. Color Swatches Reference

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Blue-300 | `#93C5FD` | `rgb(147, 197, 253)` | Primary buttons, accents |
| Blue-400 | `#60A5FA` | `rgb(96, 165, 250)` | Hover states, links |
| Blue-100 | `#DBEAFE` | `rgb(219, 234, 254)` | Backgrounds, cards |
| Red-600 | `#DC2626` | - | Urgent status |
| Yellow-500 | `#EAB308` | - | Important status |
| Green-500 | `#22C55E` | - | Completed status |
| Black | `#000000` | - | Borders, text |
| White | `#FFFFFF` | - | Backgrounds |

---

## 4. Shadows & Effects

### 4.1. Shadow System

#### CSS Variables
```css
/* app/globals.css */
:root {
  --shadow-primary: 5px 6px 0px -1px #000000;
  --shadow-secondary: 3px 3px 0px -1px #000000;
  --shadow-secondary-opposite: -3px 3px 0px -1px #000000;
}
```

#### Tailwind Config (nếu cần)
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'primary': '5px 6px 0px -1px #000000',
        'secondary': '3px 3px 0px -1px #000000',
        'secondary-opposite': '-3px 3px 0px -1px #000000',
      }
    }
  }
}
```

#### Usage Examples
```tsx
// Primary shadow - For buttons
<button className="shadow-[var(--shadow-primary)]">
  Click Me
</button>

// Secondary shadow - For cards
<div className="shadow-[var(--shadow-secondary)]">
  Card content
</div>

// Opposite shadow - For left-aligned elements
<div className="shadow-[var(--shadow-secondary-opposite)]">
  Left card
</div>
```

### 4.2. Hover Effects

#### Standard Button Hover
```css
.btn-primary {
  box-shadow: var(--shadow-primary);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translate(5px, 5px);
  box-shadow: none;
}
```

#### Tailwind Implementation
```tsx
<button className="
  shadow-[var(--shadow-primary)]
  hover:translate-x-[5px] 
  hover:translate-y-[5px] 
  hover:shadow-none
  transition-all 
  duration-200
">
  Hover Me
</button>
```

#### Card Hover Effect
```tsx
<div className="
  shadow-[var(--shadow-secondary)]
  hover:-translate-y-1
  hover:shadow-lg
  transition-all 
  duration-300
">
  Hover Card
</div>
```

### 4.3. Scale Effects

```tsx
// Subtle scale
<button className="hover:scale-105 transition-transform">
  Subtle
</button>

// More noticeable
<button className="hover:scale-110 transition-transform">
  Noticeable
</button>

// Combined with translate
<div className="hover:scale-[1.02] hover:translate-y-[-4px]">
  Combined
</div>
```

---

## 5. Borders & Radius

### 5.1. Border System

#### Standard Borders
```css
/* Consistent 2px black borders */
.border-standard {
  border: 2px solid #000000;
}
```

#### Tailwind Classes
```tsx
// Standard border
<div className="border-2 border-black">Content</div>

// Colored borders
<div className="border-2 border-blue-500">Blue border</div>
<div className="border-2 border-red-500">Red border</div>

// Specific sides
<div className="border-b-2 border-black">Bottom border</div>
<div className="border-l-4 border-blue-500">Left thick border</div>
```

### 5.2. Border Radius

#### CSS Variables
```css
:root {
  --radius: 0.625rem;                           /* 10px */
  --radius-sm: calc(var(--radius) - 4px);       /* 6px */
  --radius-md: calc(var(--radius) - 2px);       /* 8px */
  --radius-lg: var(--radius);                   /* 10px */
  --radius-xl: calc(var(--radius) + 4px);       /* 14px */
}
```

#### Tailwind Classes
```tsx
// Small - Inputs, badges
<input className="rounded-sm" />        // 2px

// Medium - Buttons
<button className="rounded-md" />       // 6px
<button className="rounded-lg" />       // 8px

// Large - Cards
<div className="rounded-xl" />          // 12px
<div className="rounded-2xl" />         // 16px

// Extra Large - Hero sections
<section className="rounded-[2.5rem]" /> // 40px

// Full - Circles, pills
<span className="rounded-full" />       // 9999px
```

#### Component-Specific Radius
```tsx
// Buttons: 14px
<button className="rounded-[14px]">Button</button>

// Cards: 20px
<div className="rounded-[20px]">Card</div>

// Mobile mockup: 40px
<div className="rounded-[2.5rem]">Mockup</div>

// Badges: 30px (pill shape)
<span className="rounded-[30px]">Badge</span>
```

---

## 6. Components Library

### 6.1. Button Components

#### Primary Button
```tsx
// Component
export function ButtonPrimary({ children, ...props }) {
  return (
    <button
      className="
        bg-blue-300
        text-black
        font-semibold
        px-6 py-3
        rounded-xl
        border-2 border-black
        shadow-[var(--shadow-primary)]
        hover:translate-x-[5px]
        hover:translate-y-[5px]
        hover:shadow-none
        transition-all
        duration-200
        cursor-pointer
      "
      {...props}
    >
      {children}
    </button>
  );
}

// Usage
<ButtonPrimary>Click Me</ButtonPrimary>
```

#### CSS Class Version (globals.css)
```css
.btn-primary {
  background-color: rgb(147, 197, 253);
  color: #000;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #000;
  box-shadow: var(--shadow-primary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translate(5px, 5px);
  box-shadow: none;
}
```

#### Secondary Button (White)
```tsx
<button className="
  bg-white
  text-black
  font-semibold
  px-6 py-3
  rounded-xl
  border-2 border-black
  shadow-[var(--shadow-primary)]
  hover:translate-x-[5px]
  hover:translate-y-[5px]
  hover:shadow-none
  transition-all
">
  Secondary
</button>
```

#### Icon Button
```tsx
import { Plus } from "lucide-react";

<button className="
  p-3
  bg-blue-300
  rounded-full
  border-2 border-black
  hover:rotate-45
  transition-transform
">
  <Plus className="w-5 h-5" />
</button>
```

### 6.2. Card Components

#### Standard Card
```tsx
export function Card({ children, className = "" }) {
  return (
    <div className={`
      bg-white
      p-6
      rounded-xl
      border-2 border-black
      shadow-[var(--shadow-secondary)]
      hover:-translate-y-1
      hover:shadow-lg
      transition-all
      duration-300
      ${className}
    `}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-sm text-zinc-600">Card content goes here</p>
</Card>
```

#### Feature Card with Icon
```tsx
import { Star } from "lucide-react";

export function FeatureCard({ icon: Icon, title, description, color = "blue" }) {
  return (
    <div className="relative bg-white p-6 pt-12 rounded-xl border-2 border-black shadow-[var(--shadow-secondary)]">
      {/* Icon Badge */}
      <div className={`
        absolute -top-6 left-3
        p-4
        bg-${color}-500
        border-2 border-black
        rounded-sm
      `}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  );
}

// Usage
<FeatureCard
  icon={Star}
  title="Amazing Feature"
  description="This feature is really cool"
  color="red"
/>
```

#### Status Card with Border
```tsx
export function StatusCard({ status = "active", children }) {
  const colors = {
    active: "border-green-500 bg-green-50",
    pending: "border-yellow-500 bg-yellow-50",
    urgent: "border-red-500 bg-red-50",
    normal: "border-blue-500 bg-blue-50",
  };

  return (
    <div className={`
      p-4
      rounded-xl
      border-l-4
      ${colors[status]}
      shadow-sm
      hover:shadow-md
      transition-shadow
    `}>
      {children}
    </div>
  );
}

// Usage
<StatusCard status="urgent">
  <h4 className="font-bold text-red-700">Urgent Task</h4>
  <p className="text-sm text-red-600">Complete ASAP</p>
</StatusCard>
```

### 6.3. Input Components

#### Text Input
```tsx
export function Input({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className="
          px-4 py-2
          border-2 border-black
          rounded-xl
          focus:outline-none
          focus:ring-2
          focus:ring-blue-300
          transition-all
        "
        {...props}
      />
    </div>
  );
}

// Usage
<Input 
  label="Email"
  required
  type="email"
  placeholder="your@email.com"
/>
```

#### Textarea
```tsx
<textarea className="
  w-full
  px-4 py-3
  border-2 border-black
  rounded-xl
  focus:outline-none
  focus:ring-2
  focus:ring-blue-300
  resize-none
  transition-all
" 
  rows={4}
  placeholder="Enter description..."
/>
```

### 6.4. Badge Components

#### Category Badge
```tsx
export function Badge({ children, color = "blue", className = "" }) {
  return (
    <span className={`
      inline-flex items-center
      px-3 py-1
      text-xs font-medium
      bg-${color}-100
      text-${color}-700
      border-2 border-black
      rounded-full
      shadow-sm
      ${className}
    `}>
      {children}
    </span>
  );
}

// Usage
<Badge color="pink">📚 Study</Badge>
<Badge color="green">✅ Completed</Badge>
```

#### Level Badge
```tsx
import { Crown } from "lucide-react";

<div className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-blue-200
  border-2 border-black
  rounded-full
  shadow-[var(--shadow-secondary)]
">
  <Crown className="w-4 h-4" />
  <span className="font-bold text-sm">Level 5</span>
</div>
```

### 6.5. Section Components

#### Section Header
```tsx
export function SectionHeader({ label, title, description }) {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      {/* Label Badge */}
      {label && (
        <span className="
          px-3 py-1
          text-xs font-medium
          border-2 border-black
          rounded-sm
          bg-white
          shadow-[var(--shadow-secondary)]
        ">
          {label}
        </span>
      )}
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-center">
        {title}
      </h2>
      
      {/* Description */}
      {description && (
        <p className="text-sm text-zinc-600 text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}

// Usage
<SectionHeader
  label="Why choose us?"
  title="Key Features"
  description="Discover what makes our platform special"
/>
```

---

## 7. Interactive Grid Pattern

### 7.1. Concept & Kỹ Thuật

**Interactive Grid Pattern** là background pattern với ô vuông có thể tương tác - khi hover sẽ đổi màu.

#### Kỹ Thuật Sử Dụng:
1. **SVG** - Để vẽ grid pattern
2. **React State** - Track ô đang hover
3. **Mouse Events** - Detect interaction
4. **Conditional Styling** - Thay đổi appearance

### 7.2. Implementation

#### File: `components/ui/interactive-grid-pattern.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // hoặc clsx

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;        // Chiều rộng mỗi ô (px)
  height?: number;       // Chiều cao mỗi ô (px)
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
        // Tính vị trí x, y
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
              "stroke-gray-400/20",
              "transition-all duration-100 ease-in-out",
              "[&:not(:hover)]:duration-1000", // Fade out chậm hơn
              hoveredSquare === index 
                ? "fill-gray-300/30"  // Đang hover
                : "fill-transparent", // Không hover
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

### 7.3. Usage Examples

#### Hero Section Background
```tsx
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Grid Background */}
      <InteractiveGridPattern />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-extrabold">Welcome!</h1>
      </div>
    </section>
  );
}
```

#### Colored Grid Variant
```tsx
<div className="relative bg-blue-100">
  <InteractiveGridPattern 
    squaresClassName="hover:fill-blue-200/30"
  />
  <div className="relative z-10 p-20">
    Content
  </div>
</div>
```

#### Small Grid for Cards
```tsx
<div className="relative rounded-xl overflow-hidden">
  <InteractiveGridPattern 
    width={40}
    height={40}
    squares={[10, 10]}
    className="opacity-50"
  />
  <div className="relative z-10 p-6">
    Card Content
  </div>
</div>
```

### 7.4. Customization

#### Thay đổi màu hover
```tsx
// Blue theme
<InteractiveGridPattern squaresClassName="hover:fill-blue-200/30" />

// Pink theme
<InteractiveGridPattern squaresClassName="hover:fill-pink-200/30" />

// Green theme
<InteractiveGridPattern squaresClassName="hover:fill-green-200/30" />
```

#### Điều chỉnh kích thước ô
```tsx
// Ô nhỏ hơn (40x40px), nhiều ô hơn
<InteractiveGridPattern 
  width={40}
  height={40}
  squares={[30, 30]}
/>

// Ô lớn hơn (80x80px), ít ô hơn
<InteractiveGridPattern 
  width={80}
  height={80}
  squares={[15, 15]}
/>
```

---

## 8. Animations

### 8.1. Hover Animations

#### Button Hover (Translate + Shadow)
```css
/* CSS Version */
.btn-hover {
  box-shadow: 5px 6px 0px -1px #000;
  transition: all 0.2s ease;
}

.btn-hover:hover {
  transform: translate(5px, 5px);
  box-shadow: none;
}
```

```tsx
// Tailwind Version
<button className="
  shadow-[5px_6px_0px_-1px_#000]
  hover:translate-x-[5px]
  hover:translate-y-[5px]
  hover:shadow-none
  transition-all
  duration-200
">
  Hover Me
</button>
```

#### Card Hover (Lift Up)
```tsx
<div className="
  hover:-translate-y-1
  hover:shadow-lg
  transition-all
  duration-300
">
  Hover Card
</div>
```

#### Icon Rotation
```tsx
<button className="
  hover:rotate-45
  transition-transform
  duration-200
">
  <PlusIcon />
</button>
```

### 8.2. Keyframe Animations

#### Float Sparkle (CSS)
```css
@keyframes floatSparkle {
  0% {
    transform: scale(0.6) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scale(1) translateY(-10px);
    opacity: 0.9;
  }
  100% {
    transform: scale(0.6) translateY(0);
    opacity: 1;
  }
}

.sparkle {
  animation: floatSparkle 2s infinite ease-in-out;
}
```

#### Pulse (Tailwind)
```tsx
<div className="animate-pulse">
  Loading...
</div>
```

#### Spin (Tailwind)
```tsx
<div className="animate-spin">
  <LoaderIcon />
</div>
```

### 8.3. Marquee Animation

#### CSS Setup
```css
@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 10s linear infinite;
}
```

#### Component
```tsx
export function Marquee({ children, speed = 10 }) {
  return (
    <div className="relative flex overflow-hidden border-y-2 border-black bg-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {children}
      </div>
      <div className="absolute flex animate-marquee2 whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

// Usage
<Marquee>
  <span className="mx-4 text-xl font-bold">✨ Feature 1</span>
  <span className="mx-4 text-xl font-bold">🚀 Feature 2</span>
  <span className="mx-4 text-xl font-bold">💎 Feature 3</span>
</Marquee>
```

### 8.4. Fade In Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

---

## 9. Responsive Design

### 9.1. Breakpoints

```css
/* Tailwind Default Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### 9.2. Responsive Patterns

#### Padding Scale
```tsx
// Mobile → Tablet → Desktop
<section className="
  px-5           /* Mobile: 20px */
  sm:px-10       /* Tablet: 40px */
  md:px-20       /* Desktop: 80px */
  lg:px-40       /* Large: 160px */
  xl:px-60       /* XL: 240px */
">
  Content
</section>
```

#### Grid Columns
```tsx
// 1 column → 2 columns → 3 columns
<div className="
  grid
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns */
  lg:grid-cols-3     /* Desktop: 3 columns */
  gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### Flex Direction
```tsx
// Vertical → Horizontal
<div className="
  flex
  flex-col          /* Mobile: vertical */
  md:flex-row       /* Desktop: horizontal */
  gap-4
">
  <div>Left</div>
  <div>Right</div>
</div>
```

#### Font Sizes
```tsx
// Responsive heading
<h1 className="
  text-4xl        /* Mobile: 36px */
  sm:text-5xl     /* Tablet: 48px */
  md:text-6xl     /* Desktop: 60px */
  font-extrabold
">
  Hero Title
</h1>

// Responsive body
<p className="
  text-sm         /* Mobile: 14px */
  md:text-base    /* Desktop: 16px */
">
  Body text
</p>
```

#### Hide/Show Elements
```tsx
// Mobile only
<div className="block md:hidden">
  Mobile Menu
</div>

// Desktop only
<div className="hidden md:block">
  Desktop Navigation
</div>

// Tablet and up
<div className="hidden sm:block">
  Tablet+ Content
</div>
```

### 9.3. Responsive Component Example

```tsx
export function ResponsiveCard() {
  return (
    <div className="
      /* Padding */
      p-4 md:p-6 lg:p-8
      
      /* Width */
      w-full md:w-1/2 lg:w-1/3
      
      /* Flex direction */
      flex flex-col md:flex-row
      
      /* Gap */
      gap-3 md:gap-4 lg:gap-6
      
      /* Border radius */
      rounded-lg md:rounded-xl
      
      /* Shadow */
      shadow-sm md:shadow-md lg:shadow-lg
    ">
      <div className="
        /* Image size */
        w-full md:w-32 lg:w-40
        h-32 md:h-32 lg:h-40
      ">
        Image
      </div>
      <div className="flex-1">
        <h3 className="
          text-lg md:text-xl lg:text-2xl
          font-bold
        ">
          Title
        </h3>
        <p className="
          text-sm md:text-base
          text-zinc-600
        ">
          Description
        </p>
      </div>
    </div>
  );
}
```

---

## 10. Implementation Tutorial

### 10.1. Project Setup

#### Bước 1: Tạo Next.js Project
```bash
npx create-next-app@latest my-taskio-app
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No

cd my-taskio-app
```

#### Bước 2: Install Dependencies
```bash
npm install lucide-react framer-motion clsx tailwind-merge
```

#### Bước 3: Setup Utilities
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 10.2. Thiết Lập Design System

#### app/globals.css
```css
@import "tailwindcss";

/* ===== CSS Variables ===== */
:root {
  /* Colors */
  --primary-blue: rgb(147, 197, 253);
  --text-primary: #0B0B0B;
  --text-secondary: #4A5568;
  --background: #F6FAFF;
  
  /* Shadows */
  --shadow-primary: 5px 6px 0px -1px #000000;
  --shadow-secondary: 3px 3px 0px -1px #000000;
  --shadow-secondary-opposite: -3px 3px 0px -1px #000000;
  
  /* Border Radius */
  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* ===== Global Styles ===== */
* {
  font-family: var(--font-quicksand), -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: var(--text-primary);
}

/* ===== Button Components ===== */
.btn-primary {
  background-color: var(--primary-blue);
  color: #000;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #000;
  box-shadow: var(--shadow-primary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translate(5px, 5px);
  box-shadow: none;
}

.btn-secondary {
  background-color: #fff;
  color: #000;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #000;
  box-shadow: var(--shadow-primary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  transform: translate(5px, 5px);
  box-shadow: none;
}

/* ===== Card Component ===== */
.card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid #000;
  box-shadow: var(--shadow-secondary);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.13);
}

/* ===== Animations ===== */
@keyframes floatSparkle {
  0% {
    transform: scale(0.6) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scale(1) translateY(-10px);
    opacity: 0.9;
  }
  100% {
    transform: scale(0.6) translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes marquee {
  from { transform: translateX(0%); }
  to { transform: translateX(-100%); }
}

@keyframes marquee2 {
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 10s linear infinite;
}

/* ===== Responsive Typography ===== */
@media (max-width: 768px) {
  body {
    font-size: 13px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
```

#### app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Taskio App",
  description: "Built with Taskio Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={quicksand.variable}>
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  );
}
```

### 10.3. Tạo Component Library

#### components/ui/button.tsx
```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ 
  variant = "primary", 
  children, 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-secondary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### components/ui/card.tsx
```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("card", className)}>
      {children}
    </div>
  );
}
```

#### components/ui/badge.tsx
```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "red" | "green" | "yellow" | "pink" | "purple";
  className?: string;
}

export function Badge({ children, color = "blue", className }: BadgeProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border-2 border-black",
      colorClasses[color],
      className
    )}>
      {children}
    </span>
  );
}
```

### 10.4. Tạo Landing Page

#### app/page.tsx
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Star, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <InteractiveGridPattern />
        
        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        
        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 border-2 border-black rounded-full shadow-[var(--shadow-secondary)]">
            <Star className="w-4 h-4" />
            <span className="font-bold text-sm">100% Free, No Ads!</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Navigate your life with{" "}
            <span className="text-blue-400">Taskio!</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-zinc-600 mb-10 max-w-2xl mx-auto">
            Turn your daily chaos into organized brilliance. Simple, beautiful task management.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary">
              Get Started
            </Button>
            <Button variant="secondary">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-blue-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-white border-2 border-black rounded-sm shadow-[var(--shadow-secondary)]">
              Why choose us?
            </span>
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              Everything you need to stay organized and productive
            </p>
          </div>
          
          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="relative bg-white p-6 pt-12 rounded-xl border-2 border-black shadow-[var(--shadow-secondary)] hover:-translate-y-1 transition-all">
              <div className="absolute -top-6 left-3 p-4 bg-red-600 border-2 border-black rounded-sm">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Easy to Use</h3>
              <p className="text-sm text-zinc-600">
                Intuitive interface that anyone can master in minutes
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="relative bg-white p-6 pt-12 rounded-xl border-2 border-black shadow-[var(--shadow-secondary)] hover:-translate-y-1 transition-all">
              <div className="absolute -top-6 left-3 p-4 bg-yellow-500 border-2 border-black rounded-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Lightning Fast</h3>
              <p className="text-sm text-zinc-600">
                Optimized performance for smooth experience
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="relative bg-white p-6 pt-12 rounded-xl border-2 border-black shadow-[var(--shadow-secondary)] hover:-translate-y-1 transition-all">
              <div className="absolute -top-6 left-3 p-4 bg-green-500 border-2 border-black rounded-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Secure & Private</h3>
              <p className="text-sm text-zinc-600">
                Your data is encrypted and always protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <InteractiveGridPattern />
        
        <div className="relative z-20 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-white border-2 border-black rounded-sm shadow-[var(--shadow-secondary)]">
            Start now
          </span>
          <h2 className="text-3xl font-bold mb-4">
            Ready to take control?
          </h2>
          <p className="text-sm text-zinc-600 mb-8">
            Join thousands of users who transformed their productivity
          </p>
          <Button variant="primary">
            Try Now (Free)
          </Button>
        </div>
      </section>
    </main>
  );
}
```

---

## 11. Best Practices

### 11.1. Performance

#### 1. Font Optimization
```tsx
// ✅ GOOD: Use Next.js font optimization
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin", "vietnamese"] });

// ❌ BAD: Direct @import in CSS with Tailwind v4
@import url("https://fonts.googleapis.com/css2?family=Quicksand");
```

#### 2. Image Optimization
```tsx
// ✅ GOOD: Use Next.js Image
import Image from "next/image";
<Image src="/image.jpg" alt="..." width={500} height={300} />

// ❌ BAD: Regular img tag
<img src="/image.jpg" alt="..." />
```

#### 3. Component Lazy Loading
```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

### 11.2. Accessibility

#### 1. Semantic HTML
```tsx
// ✅ GOOD
<button onClick={handleClick}>Click me</button>
<nav>...</nav>
<main>...</main>
<article>...</article>

// ❌ BAD
<div onClick={handleClick}>Click me</div>
<div className="nav">...</div>
```

#### 2. ARIA Labels
```tsx
<button aria-label="Close menu">
  <X />
</button>

<nav aria-label="Main navigation">
  ...
</nav>

<svg aria-hidden="true">
  ...
</svg>
```

#### 3. Focus States
```tsx
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-400
  focus:ring-offset-2
">
  Focus me
</button>
```

### 11.3. Code Organization

#### File Structure
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── home/
│   └── page.tsx
├── profile/
│   └── page.tsx
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── input.tsx
│   └── interactive-grid-pattern.tsx
lib/
├── utils.ts
└── constants.ts
```

#### Component Naming
```tsx
// ✅ GOOD: PascalCase for components
export function Button() {}
export function InteractiveGridPattern() {}

// ✅ GOOD: camelCase for utilities
export function cn() {}
export function formatDate() {}
```

### 11.4. CSS Best Practices

#### 1. Use CSS Variables
```css
/* ✅ GOOD */
:root {
  --primary-blue: rgb(147, 197, 253);
}
.btn { background: var(--primary-blue); }

/* ❌ BAD */
.btn { background: rgb(147, 197, 253); }
```

#### 2. Tailwind Over Custom CSS
```tsx
// ✅ GOOD: Use Tailwind utilities
<div className="px-6 py-3 bg-blue-300 rounded-xl">...</div>

// 🤔 OKAY: Custom class when reused often
<div className="btn-primary">...</div>

// ❌ BAD: Inline styles
<div style={{ padding: "12px 24px", background: "#93C5FD" }}>...</div>
```

---

## 12. Troubleshooting

### 12.1. CSS Parsing Error

#### Error: "@import rules must precede all rules"

**Nguyên nhân:**
- Tailwind CSS v4 không cho phép `@import url()` sau `@import "tailwindcss"`

**Giải pháp:**
```tsx
// ❌ BAD: In globals.css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Outfit");

// ✅ GOOD: In layout.tsx
import { Outfit } from "next/font/google";
```

### 12.2. Vietnamese Font Issues

#### Error: Chữ tiếng Việt hiển thị sai (ư, ê, ơ, â)

**Nguyên nhân:**
- Font không support Vietnamese subset

**Giải pháp:**
```tsx
// ✅ Thêm vietnamese subset
const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"], // Thêm vietnamese
  weight: ["400", "500", "600", "700"],
});

// Thay đổi lang attribute
<html lang="vi"> {/* Đổi từ "en" */}
```

**Fonts hỗ trợ tiếng Việt:**
- ✅ Quicksand, Inter, Open Sans, Roboto
- ❌ Outfit (limited Vietnamese support)

### 12.3. Nested <a> Tag Error

#### Error: `<a> cannot be descendant of <a>`

**Nguyên nhân:**
- Next.js `<Link>` render ra `<a>` tag
- Không được nest `<a>` trong `<a>`

**Giải pháp:**
```tsx
// ❌ BAD
<Link href="/listing/1">
  <a href="tel:+1234567890">Call</a>
</Link>

// ✅ GOOD: Use button + onClick
<Link href="/listing/1">
  <button onClick={(e) => {
    e.stopPropagation();
    window.location.href = "tel:+1234567890";
  }}>
    Call
  </button>
</Link>
```

### 12.4. Grid Pattern Not Showing

#### Grid background không hiện

**Nguyên nhân:**
- Container không có `position: relative`
- SVG bị che bởi content

**Giải pháp:**
```tsx
// ✅ Đảm bảo z-index đúng
<div className="relative min-h-screen">
  <InteractiveGridPattern className="z-0" />
  <div className="relative z-10">
    Content here
  </div>
</div>
```

### 12.5. Port Already in Use

#### Error: EADDRINUSE: port 3000 already in use

**Giải pháp:**
```bash
# Option 1: Kill process
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
npm run dev -- -p 3005

# Option 3: Set in package.json
"dev": "next dev -p 3005"
```

### 12.6. Cache Issues

#### Thay đổi CSS/Font không có hiệu lực

**Giải pháp:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules cache (nếu cần)
rm -rf node_modules .next
npm install

# Restart dev server
npm run dev
```

---

## 🎯 Quick Start Checklist

Khi bắt đầu project mới với Taskio Design System:

### Setup (15 phút)
- [ ] Create Next.js project với TypeScript + Tailwind
- [ ] Install dependencies: `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`
- [ ] Setup `lib/utils.ts` với `cn()` function
- [ ] Import Quicksand font trong `layout.tsx`
- [ ] Copy `globals.css` với CSS variables và components

### Components (30 phút)
- [ ] Tạo `Button` component
- [ ] Tạo `Card` component
- [ ] Tạo `Badge` component
- [ ] Tạo `Input` component
- [ ] Tạo `InteractiveGridPattern` component

### First Page (1 giờ)
- [ ] Tạo Hero section với grid background
- [ ] Thêm Feature cards
- [ ] Thêm CTA section
- [ ] Test responsive trên mobile/tablet/desktop

### Polish (30 phút)
- [ ] Verify font loading (Vietnamese characters)
- [ ] Test hover animations
- [ ] Check accessibility (keyboard navigation)
- [ ] Optimize images
- [ ] Clear cache và test final build

---

## 📚 Tài Liệu Tham Khảo

### Design Tokens
- **Colors**: Blue-300 `rgb(147, 197, 253)` là primary
- **Shadows**: `5px 6px 0px -1px #000` (primary), `3px 3px 0px -1px #000` (secondary)
- **Border**: `2px solid #000` (standard)
- **Radius**: `10px` (base), `14px` (buttons), `20px` (cards)
- **Font**: Quicksand, weights 400-700

### Key CSS Classes
- `.btn-primary` - Primary blue button
- `.btn-secondary` - White button
- `.card` - Standard card with shadow
- `shadow-[var(--shadow-primary)]` - Primary shadow
- `shadow-[var(--shadow-secondary)]` - Secondary shadow

### Common Patterns
```tsx
// Button
<button className="btn-primary">Text</button>

// Card
<div className="card">Content</div>

// Grid Background
<div className="relative">
  <InteractiveGridPattern />
  <div className="relative z-10">Content</div>
</div>

// Badge
<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full border-2 border-black">
  Badge
</span>
```

---

## 🎉 Kết Luận

Taskio Design System cung cấp:

✨ **Modern Design** - Playful, interactive, engaging
🎨 **Consistent Colors** - Blue-300 palette với color coding
💎 **Clean Typography** - Quicksand font với Vietnamese support
🚀 **Smooth Animations** - Hover effects, transitions
📱 **Fully Responsive** - Mobile-first approach
♿ **Accessible** - WCAG compliant
⚡ **Performant** - Optimized với Next.js

**Happy coding!** 🚀

---

_Tài liệu này được tổng hợp từ DESIGN_SPECIFICATION.md, INTERACTIVE_GRID_PATTERN_GUIDE.md, REDESIGN_SUMMARY.md, và taskio_style_guide.md để cung cấp một hướng dẫn đầy đủ về việc sử dụng Taskio Design System._

**Last Updated**: 2024
**Version**: 1.0.0
