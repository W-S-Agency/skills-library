---
name: "Figma Handoff"
description: "Pixel-perfect design implementation from Figma with exact positioning and styling"
globs: ["**/components/**/*.tsx", "**/sections/**/*.tsx"]
alwaysAllow: ["mcp__figma__get_design_context", "mcp__figma__get_screenshot", "Read", "Edit", "Write"]
---

# Figma Handoff - Pixel-Perfect Implementation

This skill ensures **pixel-perfect** design implementation from Figma to code.

## 🎯 Core Principle

**ALWAYS compare implementation with Figma design** at every step. Never guess - always verify.

## 📋 Workflow

### 1. Initial Analysis

**MANDATORY before ANY coding:**

```typescript
// Step 1: Get screenshot for visual reference
mcp__figma__get_screenshot({
  nodeId: "14-148",
  clientLanguages: "typescript",
  clientFrameworks: "react,nextjs"
})

// Step 2: Get design context for exact specs
mcp__figma__get_design_context({
  nodeId: "14-148",
  clientLanguages: "typescript",
  clientFrameworks: "react,nextjs"
})
```

**Why both?**
- Screenshot = Visual reference (colors, layout, spacing)
- Design context = Exact values (coordinates, font sizes, colors in hex)

### 2. Analysis Phase

Study the design context output carefully:

```tsx
// Example from Figma design context:
<p className="absolute font-['Instrument_Serif'] text-[150px] left-[709px] top-[1260px]">
  Dolce Vita
</p>
```

**Extract:**
- ✅ Positioning: `left-[709px] top-[1260px]` = absolute positioning needed
- ✅ Font size: `text-[150px]`
- ✅ Font family: `font-['Instrument_Serif']`
- ✅ Colors: Extract exact hex codes
- ✅ Spacing: Extract margins, paddings, gaps

### 3. Layout Strategy

**Decision tree:**

```
Is design using absolute positioning in Figma?
├─ YES → Use absolute positioning in code
│   └─ Match exact left/top coordinates
│
└─ NO → Use Flexbox/Grid
    └─ Calculate relative spacing
```

**Red flags for absolute positioning:**
- Elements overlap
- Text positioned over images
- Precise alignment between non-adjacent elements
- Figma shows specific `left`/`top` values

### 4. Implementation

**Font Setup:**
```tsx
// layout.tsx
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
      },
    },
  },
};
```

**Responsive Approach:**

```tsx
// Desktop: Exact Figma positioning
<div className="hidden lg:block">
  <div className="absolute left-[709px] top-[1260px]">
    <h1 className="text-[150px] font-serif">Dolce Vita</h1>
  </div>
</div>

// Mobile: Flexible layout
<div className="lg:hidden px-6">
  <h1 className="text-6xl font-serif">Dolce Vita</h1>
</div>
```

### 5. Verification Checklist

Before showing to user, verify:

- [ ] Font family matches Figma
- [ ] Font size matches (use exact px values from Figma)
- [ ] Colors match (use hex codes, not approximations)
- [ ] Spacing matches (margins, paddings, gaps)
- [ ] Positioning matches (absolute vs relative)
- [ ] Line height matches (`leading-[0.84]` = line-height: 84%)
- [ ] Responsive behavior works on mobile

### 6. Git Workflow

```bash
# 1. Commit with descriptive message
git add -A && git commit -m "Implement [Section] from Figma with pixel-perfect positioning

- Match exact font sizes from Figma spec
- Use absolute positioning for [elements]
- Add responsive mobile layout
- Colors: #667e77, #d6bc97

Co-Authored-By: Craft Agent <agents-noreply@craft.do>"

# 2. Push to trigger Vercel deployment
git push
```

## 🚨 Common Mistakes to Avoid

### ❌ DON'T:
- Use generic Tailwind classes when Figma shows exact values
  - Bad: `text-7xl` (96px)
  - Good: `text-[150px]` (when Figma shows 150px)

- Use relative positioning when Figma uses absolute
  - Bad: `grid grid-cols-2` (when elements overlap)
  - Good: `absolute left-[X] top-[Y]`

- Guess colors
  - Bad: `text-yellow-500`
  - Good: `text-[#d6bc97]` (from Figma)

- Center elements that aren't centered in Figma
  - Bad: `left-1/2 -translate-x-1/2` (when Figma shows `left-[709px]`)
  - Good: `left-[709px]`

### ✅ DO:
- Always get both screenshot AND design context
- Use exact pixel values from Figma
- Use exact hex colors from Figma
- Maintain aspect ratios for images
- Add offset borders when Figma shows them
- Create separate mobile layouts for responsiveness

## 📐 Coordinate System

**Figma coordinates are absolute within the frame:**

```
Container width: 1800px (common desktop size)
Element at left-[709px] = 709px from left edge
Element at top-[1260px] = 1260px from top edge
```

**Translation to code:**

```tsx
// Container setup
<div className="max-w-[1800px] mx-auto px-[100px] relative">
  {/* Elements with exact positioning */}
  <div className="absolute left-[609px] top-[140px]">
    {/* Content */}
  </div>
</div>
```

**Subtract container padding from Figma coordinates:**
- Figma: `left-[709px]`
- Container padding: `px-[100px]`
- Result: `left-[609px]` (709 - 100)

## 🎨 Color Extraction

Always use exact hex codes:

```tsx
// From Figma design context:
text-[#d6bc97]  // Gold color
bg-[#667e77]    // Green background
border-[#667e77] // Border color
```

## 📏 Spacing Values

Match Figma spacing exactly:

```tsx
// From Figma:
space-y-[171px]  // Gap between benefit items
mb-[194px]       // Margin bottom for description
gap-[30px]       // Gap in flex container
```

## 🔍 Debug Process

When user reports "всё криво" (everything is wrong):

1. **Get fresh Figma data**
   ```typescript
   mcp__figma__get_screenshot({ nodeId: "..." })
   mcp__figma__get_design_context({ nodeId: "..." })
   ```

2. **Read current implementation**
   ```typescript
   Read({ file_path: "components/sections/About.tsx" })
   ```

3. **Compare side-by-side:**
   - Figma coordinates vs code coordinates
   - Figma colors vs code colors
   - Figma font sizes vs code font sizes

4. **Fix discrepancies**
   - Update positioning
   - Update colors
   - Update sizes

5. **Deploy and verify**
   ```bash
   git add -A && git commit && git push
   ```

## 💡 Pro Tips

1. **Always start with design system**
   - Extract fonts first
   - Extract color palette
   - Extract spacing scale

2. **Work section by section**
   - Don't implement entire page at once
   - Get feedback after each section

3. **Use Vercel as preview**
   - Don't rely on localhost
   - Git push → auto-deploy workflow

4. **Keep Figma reference open**
   - Compare frequently
   - Zoom in to check details

## 📚 Examples

### Example 1: Heading with Offset

```tsx
// Figma shows:
// "Dolce Vita": left-[709px], top-[1260px]
// "im Alltag": left-[836px], top-[1386px]

// Implementation:
<div className="absolute left-[609px] top-[140px]">
  <h2 className="text-[150px] font-serif leading-[0.84]">
    Dolce Vita
  </h2>
  <h3 className="text-[150px] font-serif leading-[0.84] pl-[127px] text-[#d6bc97]">
    im Alltag
  </h3>
</div>

// Note: pl-[127px] = 836 - 709 (offset from parent)
```

### Example 2: Image with Offset Border

```tsx
// Figma shows:
// Image: left-[100px], top-[1592px], 640×800px
// Border: left-[110px], top-[1602px] (10px offset)

// Implementation:
<div className="absolute left-0 top-[472px]">
  {/* Offset border */}
  <div className="absolute left-[10px] top-[10px] w-[640px] h-[800px] border border-[#667e77] rounded-lg" />

  {/* Main image */}
  <div className="relative w-[640px] h-[800px] rounded-lg overflow-hidden">
    <Image src="/about.png" width={640} height={800} />
  </div>
</div>
```

## 🚀 Success Criteria

Implementation is complete when:

✅ Visual comparison shows pixel-perfect match
✅ All fonts match Figma spec
✅ All colors match Figma spec
✅ All spacing matches Figma spec
✅ Responsive mobile layout works
✅ Images load correctly
✅ User confirms "идеально!" (perfect!)

---

**Remember:** Figma is the source of truth. Always verify, never assume.
