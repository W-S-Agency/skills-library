---
name: ln-830-pptx-builder
description: L3 Worker for PowerPoint presentation generation. Creates pitch decks, project reviews with company branding using python-pptx.
---

# PowerPoint Builder (L3 Worker)

Creates professional PowerPoint presentations (pitch decks, strategy presentations).

## Purpose & Scope

- Generate .pptx presentations from templates
- Add slides (title, bullet, image, blank)
- Apply company branding and themes
- NOT for animations or transitions

## Dependencies

```python
python-pptx==0.6.23
Pillow==10.2.0  # For image handling
```

## Core Functions

### 1. Create Presentation

```python
from pptx import Presentation
from pptx.util import Inches, Pt

def create_pitch_deck(title: str, slides_data: list, output_path: str):
    """Generate pitch deck from slide data."""
    prs = Presentation()

    # Title slide
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    slide.shapes.title.text = title
    slide.placeholders[1].text = "Prepared by WS Agency"

    # Content slides
    for slide_info in slides_data:
        slide = prs.slides.add_slide(prs.slide_layouts[1])
        slide.shapes.title.text = slide_info['title']

        # Add bullet points
        text_frame = slide.placeholders[1].text_frame
        for bullet in slide_info['bullets']:
            p = text_frame.add_paragraph()
            p.text = bullet
            p.level = 0

    prs.save(output_path)
    return output_path
```

### 2. Apply Company Theme

```python
def apply_ws_theme(prs: Presentation):
    """Apply WS Agency branding to presentation."""
    # Set slide size, colors, fonts
    # Add logo to master slides
    return prs
```

## Slide Layouts

1. **Title Slide** - Cover with title and subtitle
2. **Title and Content** - Heading + bullet points
3. **Section Header** - Chapter dividers
4. **Two Content** - Side-by-side comparison
5. **Picture with Caption** - Image + description
6. **Blank** - Custom content

## Business Use Cases

**2Penguins:** Client pitch decks, project demos
**WS Agency:** Marketing strategy presentations, client proposals
**w&k Connect:** CRM training decks

## Definition of Done

- [ ] Presentation created with slides
- [ ] Company branding applied
- [ ] Content filled from data
- [ ] Images added (if applicable)
- [ ] Presentation saved to output path

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
