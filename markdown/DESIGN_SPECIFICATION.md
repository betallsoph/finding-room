# 📐 Taskio - Design Specification Document

## Tổng quan
Tài liệu này mô tả chi tiết toàn bộ giao diện, styling, và design system của ứng dụng Taskio - một task management application với phong cách thiết kế hiện đại, playful và có tính tương tác cao.

---

## 🎨 Design System

### Typography

#### Font Family
- **Primary Font**: `Outfit` (Google Fonts)
  - Import: `@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");`
  - Weight range: 100-900
  - Style: Sans-serif, modern, clean

#### Font Sizes
- **Hero Title**: `text-4xl sm:text-5xl md:text-6xl` (36px - 60px)
- **Section Heading**: `text-3xl` (30px)
- **Card Title**: `text-xl` (20px)
- **Body Text**: `text-sm` (14px) hoặc `text-[14px]`
- **Small Text**: `text-xs` (12px) hoặc `text-[10px]`
- **Tiny Text**: `text-[10px]`

#### Font Weights
- **Extra Bold**: `font-extrabold` (800)
- **Bold**: `font-bold` (700)
- **Medium**: `font-medium` (500)
- **Base**: `font-base` (400)

---

### Color Palette

#### Primary Colors
- **Primary Blue**: `rgb(147, 197, 253)` / `bg-blue-300`
- **Primary Blue Dark**: `bg-blue-400`
- **Primary Blue Light**: `bg-blue-100`, `bg-blue-200`
- **Primary Text**: `text-blue-400`, `text-blue-600`

#### Background Colors
- **Main Background**: `bg-white`
- **Page Background**: `bg-sky-100` (Dashboard)
- **Section Background**: `bg-blue-100` (Key Features)
- **Gradient Background**: `bg-gradient-to-br from-blue-50 to-blue-100`

#### Status Colors
- **Red (Urgent/Important)**: 
  - Background: `bg-red-50`, `bg-red-100`, `bg-red-600`
  - Border: `border-red-500`, `border-red-800`
  - Text: `text-red-600`
- **Yellow (Important)**: 
  - Background: `bg-yellow-50`, `bg-yellow-100`, `bg-yellow-500`
  - Border: `border-yellow-200`, `border-yellow-800`
  - Text: `text-yellow-600`, `text-yellow-800`
- **Green (Completed)**: 
  - Background: `bg-green-50`, `bg-green-100`, `bg-green-500`
  - Border: `border-green-500`, `border-green-800`
  - Text: `text-green-600`
- **Blue (Not Urgent/Important)**: 
  - Background: `bg-blue-50`, `bg-blue-100`
  - Border: `border-blue-200`, `border-blue-800`
  - Text: `text-blue-600`
- **Gray (Not Urgent/Not Important)**: 
  - Background: `bg-gray-50`, `bg-gray-100`, `bg-gray-200`
  - Border: `border-gray-200`, `border-gray-700`
  - Text: `text-gray-500`, `text-gray-600`, `text-gray-700`

#### Category Colors
- **Pink (Study)**: `bg-pink-100`, `text-pink-600`
- **Lime (Hobby)**: `bg-lime-100`, `text-lime-600`
- **Amber (Work)**: `bg-amber-100`, `text-amber-600`
- **Sky (Personal)**: `bg-sky-100`, `text-sky-600`
- **Zinc (Other)**: `bg-zinc-100`, `text-zinc-600`

#### Neutral Colors
- **Black**: `border-black`, `text-black`
- **White**: `bg-white`, `text-white`
- **Zinc**: `text-zinc-600`, `text-zinc-700`, `bg-zinc-100`

---

### Shadows & Effects

#### Box Shadows
- **Primary Shadow**: `shadow-primary` = `5px 6px 0px -1px #000000`
- **Secondary Shadow**: `shadow-secondary` = `3px 3px 0px -1px #000000`
- **Secondary Opposite**: `shadow-secondary-opposite` = `-3px 3px 0px -1px #000000`

#### Hover Effects
- **Button Hover**: `hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none`
- **Scale on Hover**: `hover:scale-105`, `hover:scale-[1.02]`
- **Rotate on Hover**: `hover:rotate-45`

---

### Borders

#### Border Styles
- **Standard Border**: `border-2 border-black` (2px solid black)
- **Rounded Corners**: 
  - Small: `rounded-sm` (2px)
  - Medium: `rounded-md` (6px)
  - Large: `rounded-lg` (8px)
  - XL: `rounded-xl` (12px)
  - 2XL: `rounded-2xl` (16px)
  - Full: `rounded-full` (9999px)
  - Custom: `rounded-[30px]`, `rounded-[2.5rem]`

#### Border Radius Variables
- `--radius`: `0.625rem` (10px)
- `--radius-sm`: `calc(var(--radius) - 4px)` = 6px
- `--radius-md`: `calc(var(--radius) - 2px)` = 8px
- `--radius-lg`: `var(--radius)` = 10px
- `--radius-xl`: `calc(var(--radius) + 4px)` = 14px

---

## 🧩 Component Specifications

### 1. Header Component

#### Structure
```
┌─────────────────────────────────────────┐
│ [Banner: "From messy to ready!" + Logo] │
│ ┌─────────────────────────────────────┐ │
│ │ Logo | Nav Items | Sign In Button  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Styling
- **Banner Bar**:
  - Height: `h-10`
  - Background: `bg-blue-300`
  - Border: `border-2 border-black rounded-lg`
  - Content: Text "From messy to ready!" với arrow icon
  - Logo images ở hai bên

- **Main Header**:
  - Height: `h-16`
  - Background: `bg-white`
  - Border: `border-2 border-black rounded-lg`
  - Padding: `px-4 sm:px-5 lg:px-20`
  - Sticky: `sticky z-40`
  - Scroll behavior: Khi scroll, header di chuyển lên (`-top-12 md:-top-10`)

- **Logo**:
  - Desktop: ComicText component với fontSize 2.5
  - Mobile: Chỉ hiển thị chữ "T" + "askio!"
  - Background: `var(--color-blue-300)`
  - Dot color: `white`

- **Navigation Items**:
  - Border: `border-b-2 border-black` (mobile), `border-r-2 border-l-2` (desktop)
  - Active state: `bg-blue-100 font-bold`
  - Hover: `hover:bg-blue-100`
  - Padding: `py-5 px-6`

- **Mobile Menu**:
  - Slide-in từ bên phải: `translate-x-full` → `translate-x-0`
  - Width: `w-4/5`
  - Background: `bg-white`
  - Border: `border-l-2 border-black`
  - Overlay: `bg-white/40`

---

### 2. Hero Section

#### Layout
```
┌─────────────────────────────────────┐
│ [Interactive Grid Pattern Background]│
│ ┌─────────────────────────────────┐ │
│ │ Badge: "100% free no ads!"      │ │
│ │                                  │ │
│ │ Title: "Navigate your life with │ │
│ │         Taskio!" (SparklesText)  │ │
│ │                                  │ │
│ │ Subtitle: "Turn your daily..."  │ │
│ │                                  │ │
│ │ [Get Started] [Watch Demo]      │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Marquee: Scrolling text banner  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Styling
- **Container**: 
  - Padding: `px-10 sm:px-30 py-10 sm:py-15 xl:py-20`
  - Background: Interactive grid pattern với hover effect
  - Gradient overlay: `bg-gradient-to-b from-white to-transparent` ở top

- **Badge**:
  - Border: `border-2 border-black rounded-[30px]`
  - Shadow: `shadow-secondary`
  - Padding: `px-4 py-1`
  - Icons: Star và Sparkle icons
  - Font: `font-bold text-sm`

- **Title**:
  - Size: `text-4xl sm:text-5xl md:text-6xl`
  - Weight: `font-extrabold`
  - Alignment: `text-center`
  - SparklesText: Màu `text-blue-400` với animation sparkles

- **Subtitle**:
  - Color: `text-zinc-600`
  - Size: `text-[14px] sm:text-[18px]`
  - Alignment: `text-center whitespace-nowrap`

- **Buttons**:
  - Gap: `gap-4`
  - Layout: `flex-row sm:flex-row`

- **Marquee**:
  - Border: `border-b-2 border-t-2 border-black`
  - Background: `bg-white`
  - Animation: `animate-marquee` và `animate-marquee2`
  - Text: `text-xl py-5`

---

### 3. Key Features Section

#### Layout
```
┌─────────────────────────────────────┐
│ [Section Label: "Why choose Taskio?"]│
│                                      │
│ Heading: "Key Features"              │
│                                      │
│ Description text                     │
│                                      │
│ ┌──────┐ ┌──────┐                   │
│ │Card 1│ │Card 2│                   │
│ └──────┘ └──────┘                   │
│ ┌──────┐ ┌──────┐                   │
│ │Card 3│ │Card 4│                   │
│ └──────┘ └──────┘                   │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Background: `bg-blue-100`
  - Padding: `pt-12 pb-30 px-5`
  - Gradient overlay: `bg-gradient-to-t from-white to-transparent` ở bottom

- **Section Label**:
  - Border: `border-2 border-black rounded-sm`
  - Background: `bg-white`
  - Shadow: `shadow-secondary`
  - Size: `text-[10px] font-medium`
  - Padding: `px-3 py-1`

- **Heading**: `text-3xl font-bold`

- **Description**: 
  - Size: `text-[12px] sm:text-sm`
  - Color: `text-zinc-600`
  - Max width: `max-w-md`
  - Alignment: `text-center`

- **Feature Cards Grid**:
  - Layout: `grid gap-10 sm:grid-cols-2 md:grid-cols-2`
  - Max width: `max-w-6xl`
  - Padding: `px-5 md:px-20 lg:px-40 xl:px-60`

#### Feature Card (CardIcon)
- **Container**:
  - Border: `border-2 border-black rounded-lg`
  - Background: `bg-white`
  - Shadow: `shadow-secondary-opposite`
  - Padding: `py-10 px-5`

- **Icon Badge**:
  - Position: `absolute -top-6 left-3`
  - Size: `px-4 py-4`
  - Border: `border-2 border-black rounded-sm`
  - Background: Dynamic (red-600, yellow-500, green-500, blue-500)
  - Icon: `w-5 h-5 text-white`

- **Content**:
  - Title: `font-bold text-xl`
  - Description: `text-sm font-medium`
  - Gap: `gap-3`

---

### 4. How It Works Section

#### Layout
```
┌─────────────────────────────────────┐
│ [Section Label: "Get started..."]   │
│                                      │
│ Heading: "How It Works"              │
│                                      │
│ Description                          │
│                                      │
│ [1] → [2] → [3] → [4]               │
│ Step  Step  Step  Step               │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Padding: `py-30 px-5`
  - Background: Interactive grid pattern
  - Gradient overlays: Top và bottom

- **Steps Layout**:
  - Mobile: `flex-col` (vertical)
  - Desktop: `flex-row` (horizontal)
  - Gap: `gap-8`
  - Max width: `max-w-4xl`

- **Step Item**:
  - **Number Circle**:
    - Size: `w-10 h-10`
    - Background: `bg-black`
    - Text: `text-white font-bold`
    - Shape: `rounded-full`
    - Margin: `mb-3`

  - **Content**:
    - Title: `font-bold text-lg`
    - Description: `text-sm text-zinc-700 max-w-[200px]`
    - Alignment: `text-center`

  - **Connector Line** (Desktop only):
    - Position: `absolute top-5 left-full`
    - Size: `w-20 h-[2px]`
    - Color: `bg-black`
    - Display: `hidden md:block`

---

### 5. Preview Section

#### Layout
```
┌─────────────────────────────────────┐
│ [Section Label: "Sneak peek"]      │
│                                      │
│ Heading: "Preview"                  │
│                                      │
│ ┌──────────┐  ┌──────────┐         │
│ │  Mobile  │  │ Desktop  │         │
│ │  Mockup  │  │  Mockup  │         │
│ └──────────┘  └──────────┘         │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Background: `bg-gradient-to-br from-blue-50 to-blue-100`
  - Padding: `py-30`
  - Gradient overlays: Top và bottom

- **Grid Layout**:
  - Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12`
  - Max width: `max-w-7xl mx-auto`
  - Padding: `px-4 sm:px-6 lg:px-8`

#### Mobile Mockup
- **Frame**:
  - Border: `border-2 border-black rounded-[2.5rem]`
  - Shadow: `shadow-secondary-opposite`
  - Padding: `p-2`
  - Max width: `max-w-sm`

- **Screen**:
  - Border: `rounded-[2rem]`
  - Background: `bg-white`
  - Overflow: `overflow-hidden`

- **Header**:
  - Background: `bg-gradient-to-r from-blue-400 to-blue-600`
  - Padding: `p-6`
  - Text: `text-white`

- **Content Cards**:
  - Border: `border-l-4` với màu tương ứng
  - Background: Color-coded (blue-50, green-50, red-50)
  - Border color: Matching (blue-500, green-500, red-500)
  - Text: Matching colors
  - Padding: `p-4`
  - Border radius: `rounded-xl`

#### Desktop Mockup
- **Container**:
  - Border: `border-2 border-black rounded-2xl`
  - Shadow: `shadow-secondary-opposite`
  - Background: `bg-white`

- **Top Bar**:
  - Background: `bg-gray-100`
  - Border: `border-b-2 border-black`
  - Padding: `px-6 py-3`
  - Dots: Red, yellow, green circles với `border border-black`

- **Content**:
  - Padding: `p-8`
  - Stats Cards: Grid 3 columns với color-coded borders

---

### 6. Call to Action Section

#### Layout
```
┌─────────────────────────────────────┐
│ [Section Label: "Start now"]         │
│                                      │
│ Heading: "Ready to take control..." │
│                                      │
│ Description                          │
│                                      │
│ [Try Now (Free) Button]              │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Padding: `py-20 px-5`
  - Background: Interactive grid pattern
  - Gradient overlays

- **Button**: Standard button với variant `default`

---

### 7. Dashboard Page

#### Layout
```
┌─────────────────────────────────────┐
│ [Add New Task Input Bar]            │
│                                      │
│ [Filter Bar: Tabs + Search]         │
│                                      │
│ ┌──────────┐  ┌──────────┐         │
│ │ Quadrant │  │ Quadrant │         │
│ │    1     │  │    2     │         │
│ └──────────┘  └──────────┘         │
│ ┌──────────┐  ┌──────────┐         │
│ │ Quadrant │  │ Quadrant │         │
│ │    3     │  │    4     │         │
│ └──────────┘  └──────────┘         │
└─────────────────────────────────────┘
```

#### Page Styling
- **Container**:
  - Background: `bg-sky-100`
  - Min height: `min-h-screen`
  - Padding: `px-2 py-10`
  - Gradient overlay: `bg-gradient-to-b from-white to-transparent` ở top

- **Content Container**:
  - Max width: Responsive padding
  - Layout: `flex flex-col gap-5`
  - Alignment: `justify-center items-center`

---

### 8. Add New Task Component

#### Input Bar
- **Container**:
  - Border: `border-2 border-black rounded-2xl`
  - Background: `bg-white`
  - Padding: `p-2`
  - Layout: `flex items-center space-x-2`

- **Input Field**:
  - Border: `rounded-xl`
  - Focus: `focus:outline-none`
  - Placeholder: "e.g: Buy milk tomorrow"

- **Buttons**:
  - **Mic Button**:
    - Shape: `rounded-full`
    - Size: `p-2`
    - States:
      - Default: `bg-gray-100 text-gray-600`
      - Listening: `bg-red-100 text-red-600 animate-pulse`
    - Hover: `hover:bg-gray-200`

  - **Add Button** (Plus):
    - Background: `bg-gradient-to-r bg-blue-400`
    - Border: `border-2 border-black`
    - Shape: `rounded-full`
    - Hover: `hover:rotate-45`

  - **Send Button**:
    - Same styling as Add Button
    - Icon: Send icon

---

### 9. Filter Bar Component

#### Layout
```
┌─────────────────────────────────────┐
│ [All] [In Progress] [Completed] ... │
│                                      │
│ [🔍 Search tasks...]                │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Border: `border-2 border-black rounded-xl`
  - Background: `bg-white`
  - Shadow: `shadow-lg`
  - Padding: `px-4 py-1`
  - Layout: `flex flex-col md:flex-row`

- **Filter Tabs**:
  - Layout: `flex space-x-2`
  - Scroll: `overflow-x-auto scrollbar-hide`
  - Width: `w-full md:w-2/3`

- **Filter Button**:
  - Padding: `px-3 py-2`
  - Size: `text-sm font-bold`
  - Border: `border-2`
  - Border radius: `rounded-md`
  - Transition: `transition-transform duration-200`
  - Hover: `hover:scale-105`
  - Active: `scale-105` + color background

- **Filter Colors**:
  - All: `bg-gray-200 hover:bg-gray-300 border-gray-800`
  - Active: `bg-green-200 hover:bg-green-300 border-green-800`
  - Completed: `bg-sky-200 hover:bg-sky-300 border-sky-800`
  - Today: `bg-pink-200 hover:bg-pink-300 border-pink-800`
  - Week: `bg-violet-200 hover:bg-violet-300 border-violet-800`

- **Search Box**:
  - Position: `relative`
  - Max width: `max-w-xs`
  - Input:
    - Background: `bg-gray-100`
    - Border: `border-2 border-black rounded-md`
    - Padding: `pl-10 pr-4 py-2`
    - Focus: `focus:ring-2 focus:ring-blue-500`
  - Icon: Search icon ở `left-3`

---

### 10. Eisenhower Matrix

#### Layout
```
┌─────────────────────────────────────┐
│ ┌──────────┐  ┌──────────┐         │
│ │ Urgent & │  │ Not Urg.│         │
│ │Important │  │Important │         │
│ │ Do First │  │ Schedule │         │
│ └──────────┘  └──────────┘         │
│ ┌──────────┐  ┌──────────┐         │
│ │ Urgent & │  │ Not Urg.│         │
│ │Not Import│  │Not Import│         │
│ │ Delegate │  │  Delete  │         │
│ └──────────┘  └──────────┘         │
└─────────────────────────────────────┘
```

#### Container Styling
- **Wrapper**:
  - Border: `border-2 border-black rounded-2xl`
  - Background: `bg-white`
  - Padding: `p-6`
  - Max width: `max-w-7xl mx-auto`

- **Grid**:
  - Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`

#### Quadrant Styling
- **Quadrant 1 (Urgent & Important)**:
  - Background: `bg-red-50`
  - Border: `border-red-200`
  - Gradient: `from-red-500 to-pink-500`

- **Quadrant 2 (Not Urgent & Important)**:
  - Background: `bg-blue-50`
  - Border: `border-blue-200`
  - Gradient: `from-blue-500 to-purple-500`

- **Quadrant 3 (Urgent & Not Important)**:
  - Background: `bg-yellow-50`
  - Border: `border-yellow-200`
  - Gradient: `from-yellow-500 to-orange-500`

- **Quadrant 4 (Not Urgent & Not Important)**:
  - Background: `bg-gray-50`
  - Border: `border-gray-200`
  - Gradient: `from-gray-500 to-gray-600`

#### Quadrant Header
- **Title**: Font bold, size medium
- **Subtitle**: Smaller text, italic hoặc lighter weight
- **Gradient Border**: Top border với gradient color

---

### 11. Task Card (MatrixTaskCard)

#### Layout
```
┌─────────────────────────────────────┐
│ ☑ Task Name          [Edit] [Delete]│
│                                      │
│ ⏰ Deadline: Today / 🔥 Overdue     │
│                                      │
│ [Category Tags]     [Subtask Count] │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Border: Dynamic based on status
    - Completed: `border-green-200 bg-green-50`
    - Overdue: `border-red-500 border-2`
    - Normal: `border-gray-200`
  - Background: `bg-white`
  - Border radius: `rounded-lg`
  - Padding: `p-3`
  - Shadow: `shadow-sm`
  - Hover: `hover:shadow-md hover:scale-[1.02]`
  - Cursor: `cursor-move` (draggable)
  - Transition: `transition-all duration-200`

- **Task Name**:
  - Font: `font-medium text-sm`
  - Completed: `line-through text-gray-500`
  - Normal: `text-gray-900`

- **Checkbox**:
  - Position: Left side
  - Size: Standard checkbox

- **Action Buttons**:
  - Edit: `text-gray-400 hover:text-blue-600`
  - Delete: `text-gray-400 hover:text-red-600`
  - Size: `p-1`
  - Icon size: `size={14}`

- **Deadline Display**:
  - Overdue: `text-red-600 font-medium` với 🔥 emoji
  - Today: `text-yellow-600 font-medium` với ⚠️ emoji
  - Normal: `text-gray-500` với Clock icon
  - Size: `text-xs`

- **Category Tags**:
  - Display: `flex flex-wrap gap-1`
  - Tag style:
    - Background: `bg-blue-100`
    - Text: `text-blue-700`
    - Size: `px-2 py-0.5 text-xs`
    - Shape: `rounded-full`

- **Subtask Count**:
  - Text: `text-xs font-semibold text-zinc-500`
  - Format: "X/Y (subtasks)"

---

### 12. Dialog/Modal Components

#### Add/Edit Task Dialog

**Container**:
- Max width: `sm:max-w-[425px]`
- Max height: `max-h-[90vh]`
- Overflow: `overflow-y-auto scrollbar-hide`
- Background: `bg-white`
- Border radius: Standard dialog radius

**Form Fields**:
- **Label**: 
  - Required indicator: `<span className="text-red-500">*</span>`
  - Font: Standard label style

- **Input**:
  - Border: Standard input border
  - Focus: Standard focus ring

- **Calendar**:
  - Width: `w-4/5`
  - Padding bottom: `pb-3`

- **Toggle Buttons** (Priority):
  - Border: `border-2 border-black`
  - Background: `bg-white`
  - Active states:
    - Important: `bg-yellow-200 text-yellow-800`
    - Urgent: `bg-red-200 text-red-800`
  - Layout: `flex gap-3`

- **Category Select**:
  - Width: `w-[180px]`
  - Options: Color-coded với icons

- **Selected Categories**:
  - Display: `flex flex-wrap gap-2`
  - Tag: Rounded với icon, text, và remove button (×)

- **Subtasks**:
  - Input: Standard input với Add button
  - List item:
    - Border: `border-2 border-black`
    - Background: `bg-white`
    - Layout: `flex items-center justify-between`
    - Completed: `line-through text-gray-500`
    - Delete: Trash icon với hover effect

**Footer**:
- Layout: `flex` với Cancel và Submit buttons
- Cancel: `variant="oppositeDefault"`
- Submit: `variant="default"`

---

### 13. Profile Page

#### Layout
```
┌─────────────────────────────────────┐
│ [Interactive Grid Pattern]           │
│                                      │
│ [Information Card]                   │
│                                      │
│ [Analytics Section]                  │
│                                      │
│ [Contribute Grid]                    │
└─────────────────────────────────────┘
```

#### Page Styling
- **Container**:
  - Min height: `min-h-screen min-w-screen`
  - Padding: `py-10`
  - Layout: `flex flex-col items-center justify-start gap-5`
  - Background: Interactive grid pattern

- **Content Container**:
  - Width: `w-full`
  - Padding: `md:px-10 xl:px-60`
  - Layout: `flex flex-col items-center justify-center gap-5`
  - Z-index: `z-20`

---

### 14. Information Card (Profile)

#### Layout
```
┌─────────────────────────────────────┐
│ [Avatar Circle]  Name                │
│                  Email                │
│                  [Level Badge] XP     │
└─────────────────────────────────────┘
```

#### Styling
- **Container**:
  - Width: `w-9/10`
  - Padding: `p-4 sm:p-7`
  - Border: `border-2 border-black rounded-xl`
  - Background: `bg-blue-100`
  - Layout: `flex flex-row items-center gap-5`
  - Overflow: `overflow-hidden`

- **Avatar**:
  - Size: `w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] md:w-[115px] md:h-[115px]`
  - Border: `border-2 border-black rounded-full`
  - Background: `bg-white`
  - Text: `text-blue-500 font-bold text-4xl`
  - Padding: `p-7 sm:p-14`
  - Display: First letter of email username

- **Name**:
  - Size: `text-2xl sm:text-4xl`
  - Weight: `font-bold`

- **Email**:
  - Size: `text-sm`
  - Color: `text-zinc-600`

- **Level Badge**:
  - Background: `bg-blue-200`
  - Border: `border-2 border-black rounded-3xl`
  - Shadow: `shadow-secondary`
  - Layout: `flex flex-row gap-1 px-2`
  - Font: `font-bold text-sm`
  - Icon: Crown icon `w-4`

- **XP Display**:
  - Size: `text-sm`
  - Color: `text-zinc-700`

---

## 🎭 Interactive Elements

### Animations

#### AOS (Animate On Scroll)
- Library: `aos` (Animate On Scroll)
- Configuration:
  - Offset: `120px`
  - Duration: `600ms`
  - Easing: `ease`
  - Once: `false`
  - Mirror: `false`
  - Anchor placement: `top-bottom`

- Common animations:
  - `data-aos="fade-down"`: Fade in từ trên xuống
  - `data-aos="fade-up"`: Fade in từ dưới lên
  - `data-aos="zoom-in"`: Zoom in
  - `data-aos="fade-right"`: Fade in từ trái
  - `data-aos="fade-left"`: Fade in từ phải

#### Marquee Animation
- Animation name: `marquee` và `marquee2`
- Duration: `10s`
- Timing: `linear`
- Repeat: `infinite`
- Direction:
  - marquee: `translateX(0%)` → `translateX(-100%)`
  - marquee2: `translateX(100%)` → `translateX(0%)`

#### Sparkles Text Animation
- Library: `motion` (Framer Motion)
- Effect: Sparkles particles xung quanh text
- Colors: Default `#9E7AFF` và `#FE8BBB`
- Count: `10` sparkles
- Animation: Opacity, scale, và rotate animations

#### Interactive Grid Pattern
- Hover effect: `hover:fill-blue-200/30`
- Transition: `transition-all duration-100 ease-in-out`
- Squares: 25x25 grid (default)
- Square size: 60x60px (default)

---

### Button Variants

#### Default Button
```css
- Background: bg-blue-300
- Border: border-2 border-black
- Shadow: shadow-primary (5px 6px 0px -1px #000000)
- Hover: translate-x-[5px] translate-y-[5px] shadow-none
- Text: text-black
- Cursor: cursor-pointer
```

#### Opposite Default
```css
- Background: bg-white
- Border: border-2 border-black
- Shadow: shadow-primary
- Hover: translate-x-[5px] translate-y-[5px] shadow-none
- Text: text-black
```

#### No Shadow
```css
- Background: bg-blue-300
- Border: border-2 border-black
- Hover: bg-blue-400
- Text: text-black
- Transition: transition-all duration-500
```

#### Opposite No Shadow
```css
- Background: bg-white
- Border: border-2 border-blue-400
- Hover: bg-blue-400 text-white
- Text: text-blue-400
- Transition: transition-all duration-500
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind Default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Responsive Patterns

#### Padding
- Mobile: `px-10`, `px-5`
- Tablet: `sm:px-30`, `md:px-20`
- Desktop: `lg:px-40`, `xl:px-60`, `xl:px-80`

#### Grid Layouts
- Mobile: `grid-cols-1`
- Tablet: `sm:grid-cols-2`
- Desktop: `md:grid-cols-2`, `lg:grid-cols-2`

#### Flex Direction
- Mobile: `flex-col`
- Desktop: `md:flex-row`

#### Text Sizes
- Mobile: `text-4xl`, `text-[14px]`
- Tablet: `sm:text-5xl`, `sm:text-[18px]`
- Desktop: `md:text-6xl`

#### Visibility
- Mobile only: `block sm:hidden`
- Desktop only: `hidden sm:block`, `hidden xl:block`

---

## 🎨 Special Effects

### Gradient Overlays
- **Top Fade**: `bg-gradient-to-b from-white to-transparent`
- **Bottom Fade**: `bg-gradient-to-t from-white to-transparent`
- **Section Background**: `bg-gradient-to-br from-blue-50 to-blue-100`
- **Button Gradient**: `bg-gradient-to-r bg-blue-400`

### Glass Morphism
- Not heavily used, but can be achieved với:
  - `bg-white/40` (semi-transparent white)
  - `backdrop-blur` (nếu cần)

### Scrollbar Hiding
- Class: `scrollbar-hide`
- Library: `tailwind-scrollbar-hide`
- Usage: Applied to containers với overflow scroll

---

## 🔤 Icon System

### Icon Library
- **Library**: `lucide-react`
- **Size conventions**:
  - Small: `w-4 h-4`, `size={14}`, `size={16}`
  - Medium: `w-5 h-5`, `size={20}`
  - Large: `w-7 h-7`

### Common Icons
- Navigation: `ArrowRight`, `Menu`, `X`
- Actions: `Plus`, `Edit2`, `Trash2`, `Send`
- Status: `Star`, `AlarmClock`, `CheckCircle`, `Clock`
- Categories: `Briefcase`, `Book`, `Palette`, `User`, `AlignJustify`
- UI: `Search`, `Mic`, `MicOff`, `Play`
- Profile: `Crown`
- Features: `ChartArea`, `Cloud`, `Sliders`

---

## 🎯 Design Principles

### 1. Bold Borders
- Hầu hết elements đều có `border-2 border-black`
- Tạo cảm giác chắc chắn, rõ ràng

### 2. Playful Shadows
- Box shadows tạo depth
- Hover effects với translate để tạo interactive feel

### 3. Color Coding
- Mỗi category/status có màu riêng
- Consistent color scheme across components

### 4. Spacing
- Generous padding và gaps
- `gap-5`, `gap-6`, `gap-10` thường dùng

### 5. Typography Hierarchy
- Clear size differences
- Bold headings, medium body text

### 6. Interactive Feedback
- Hover states trên mọi interactive elements
- Scale, color change, shadow changes

### 7. Responsive First
- Mobile-first approach
- Progressive enhancement cho larger screens

---

## 📦 Component Dependencies

### UI Libraries
- **Radix UI**: Dialog, Select, Checkbox, Toggle, Label, Popover, Tabs
- **Shadcn UI**: Component base
- **Tailwind CSS**: Styling framework
- **Motion (Framer Motion)**: Animations
- **AOS**: Scroll animations
- **Sonner**: Toast notifications

### Custom Components
- `InteractiveGridPattern`: Background pattern
- `SparklesText`: Animated text
- `Marquee`: Scrolling text
- `ComicText`: Styled logo text
- `CardIcon`: Feature cards
- `Button`: Custom button variants

---

## 🎨 CSS Variables

### Color Variables (OKLCH)
```css
--background: oklch(1 0 0)           /* White */
--foreground: oklch(0.145 0 0)         /* Near black */
--primary: rgb(147, 197, 253)         /* Blue-300 */
--card: oklch(1 0 0)                  /* White */
--border: oklch(0.922 0 0)            /* Light gray */
--destructive: oklch(0.577 0.245 27.325) /* Red */
```

### Shadow Variables
```css
--shadow-primary: 5px 6px 0px -1px #000000
--shadow-secondary: 3px 3px 0px -1px #000000
--shadow-secondary-opposite: -3px 3px 0px -1px #000000
```

### Animation Variables
```css
--animate-marquee: marquee 10s linear infinite
--animate-marquee2: marquee2 10s linear infinite
```

---

## 📝 Implementation Notes

### Best Practices
1. **Consistent Border Style**: Luôn dùng `border-2 border-black` cho main borders
2. **Shadow Usage**: Primary shadow cho buttons, secondary cho cards
3. **Color Consistency**: Sử dụng Tailwind color classes thay vì custom colors khi có thể
4. **Responsive**: Luôn test trên mobile, tablet, và desktop
5. **Accessibility**: Đảm bảo contrast ratios và keyboard navigation
6. **Performance**: Lazy load components khi có thể (đã implement với Suspense)

### Common Patterns
- **Section Structure**: Label → Heading → Description → Content
- **Card Pattern**: Border → Shadow → Padding → Content
- **Button Pattern**: Border → Shadow → Hover effects
- **Form Pattern**: Label → Input → Validation → Submit

---

## 🚀 Quick Reference

### Common Class Combinations

#### Card
```css
border-2 border-black rounded-lg bg-white shadow-secondary p-5
```

#### Button (Default)
```css
bg-blue-300 border-2 border-black shadow-primary hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none
```

#### Section Container
```css
relative py-20 px-5 flex flex-col gap-6 items-center justify-center
```

#### Input Field
```css
border-2 border-black rounded-xl focus:outline-none w-full
```

#### Badge/Label
```css
px-3 py-1 border-2 border-black rounded-sm shadow-secondary text-[10px] font-medium
```

---

## 📸 Visual References

### Color Swatches
- **Blue-300**: `#93C5FD` (Primary)
- **Blue-400**: `#60A5FA`
- **Blue-100**: `#DBEAFE`
- **Red-600**: `#DC2626`
- **Yellow-500**: `#EAB308`
- **Green-500**: `#22C55E`
- **Gray-200**: `#E5E7EB`
- **Black**: `#000000`
- **White**: `#FFFFFF`

### Spacing Scale
- `gap-2`: 8px
- `gap-4`: 16px
- `gap-5`: 20px
- `gap-6`: 24px
- `gap-10`: 40px
- `py-10`: 40px vertical
- `py-20`: 80px vertical
- `py-30`: 120px vertical

---

## ✅ Checklist for Implementation

### Design System
- [ ] Font family (Outfit) imported
- [ ] Color palette defined
- [ ] Shadow variables set up
- [ ] Border radius variables configured
- [ ] Animation keyframes defined

### Components
- [ ] Header với sticky behavior
- [ ] Hero section với sparkles text
- [ ] Feature cards với icon badges
- [ ] How it works steps với connectors
- [ ] Preview mockups
- [ ] CTA section
- [ ] Dashboard layout
- [ ] Add task input bar
- [ ] Filter bar với tabs
- [ ] Eisenhower matrix
- [ ] Task cards
- [ ] Dialogs/Modals
- [ ] Profile components

### Interactions
- [ ] AOS animations configured
- [ ] Marquee animations working
- [ ] Sparkles text animation
- [ ] Interactive grid pattern
- [ ] Hover effects on buttons
- [ ] Drag and drop (tasks)
- [ ] Toast notifications

### Responsive
- [ ] Mobile layout tested
- [ ] Tablet layout tested
- [ ] Desktop layout tested
- [ ] Breakpoints verified

---

## 📚 Additional Resources

### Libraries Used
- React 19.1.1
- React Router 7.8.2
- Tailwind CSS 4.1.13
- Radix UI components
- Motion (Framer Motion) 12.23.12
- AOS 3.0.0-beta.6
- Lucide React icons
- Sonner (toasts)

### Design Inspiration
- Playful, modern aesthetic
- Bold, confident styling
- Interactive, engaging UX
- Clean, organized layout

---

**Tài liệu này cung cấp đầy đủ thông tin để team có thể replicate design system và giao diện của Taskio. Mọi chi tiết về colors, spacing, typography, components, và interactions đều được mô tả chi tiết.**

