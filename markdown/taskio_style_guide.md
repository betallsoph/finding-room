
# Taskio Style Guide

## 1. Color Palette

### Primary Colors
- **Primary Blue:** `#6CA8FF`
- **Primary Darker Blue:** `#4A8DFF`
- **Accent Purple:** `#CA86FF`
- **Accent Pink:** `#F7A6FF`

### Neutrals
- Background: `#F6FAFF`
- White: `#FFFFFF`
- Border Soft: `#E2E8F0`
- Text Primary: `#0B0B0B`
- Text Secondary: `#4A5568`

---

## 2. Typography

### Recommended Fonts
- Manrope (primary)
- Inter or Poppins (alternatives)

### Heading Styles
```
h1 { font-family: 'Manrope'; font-size: 72px; font-weight: 800; }
h2 { font-size: 48px; font-weight: 700; }
h3 { font-size: 32px; font-weight: 700; }
```

### Body
```
body { font-size: 18px; font-weight: 400; color: #4A5568; }
```

---

## 3. Components

### Buttons
```
.btn-primary {
  background: #6CA8FF;
  color: white;
  font-weight: 600;
  padding: 14px 26px;
  border-radius: 14px;
  border: 2px solid #000;
  box-shadow: 3px 3px 0 #000;
  transition: 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 #000;
}
```

### Card
```
.card {
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 3px solid #000;
  box-shadow: 6px 6px 0 #0002;
}
```

### Layout
```
.section { width: 100%; padding: 80px 0; }
.wrapper { max-width: 1200px; margin: auto; padding: 0 24px; }
```

---

## 4. Sparkle Animation

### HTML
```
<div class="sparkle-text">
  Taskio!
  <span class="sparkle"></span>
  <span class="sparkle"></span>
  <span class="sparkle"></span>
</div>
```

### CSS
```
.sparkle-text {
  position: relative;
  font-size: 80px;
  font-weight: 800;
  color: #6CA8FF;
  font-family: 'Manrope';
}
.sparkle {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #F7A6FF;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 
                     68% 57%, 79% 91%, 50% 70%, 
                     21% 91%, 32% 57%, 2% 35%, 
                     39% 35%);
  animation: floatSparkle 2s infinite ease-in-out;
  opacity: 0.8;
}
.sparkle:nth-child(2) { left: 20px; top: -20px; background: #CA86FF; animation-delay: 0.3s; }
.sparkle:nth-child(3) { left: 120px; top: 30px; background: #F7A6FF; animation-delay: 0.6s; }

@keyframes floatSparkle {
  0%   { transform: scale(0.6) translateY(0); opacity: 1; }
  50%  { transform: scale(1) translateY(-10px); opacity: 0.9; }
  100% { transform: scale(0.6) translateY(0); opacity: 1; }
}
```

---

## 5. Background Grid
```
.bg-grid {
  background-image: 
    linear-gradient(#e2e8f050 1px, transparent 1px),
    linear-gradient(90deg, #e2e8f050 1px, transparent 1px);
  background-size: 60px 60px;
  background-color: #F6FAFF;
}
```

---

## End of File
