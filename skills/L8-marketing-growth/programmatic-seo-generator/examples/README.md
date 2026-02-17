# Programmatic SEO Generator - Examples

This directory contains example data and templates for testing the programmatic SEO generator.

## Quick Start

### 1. Test Data Loader

```bash
cd C:\Users\alexa\.ws-workspace\workspaces\my-workspace\skills\programmatic-seo-generator

python scripts/data_loader.py examples/sample_data.csv --validate
```

**Expected Output:**
```
Loading data from: examples/sample_data.csv (type: csv)
✅ Loaded 10 rows
✅ Validation passed
   Fields: id, title, description, price, category, keywords, image_url, material, dimensions, features, url_slug, base_url
```

### 2. Generate Pilot Pages (10 pages)

```bash
python scripts/template_engine.py \
    --data examples/sample_data.csv \
    --template templates/product_page.html \
    --output examples/output/ \
    --limit 10
```

**Expected Output:**
```
Loading data from: examples/sample_data.csv
✅ Loaded and normalized 10 rows

Rendering template: templates/product_page.html
Generating 10 pages...
  10/10 pages generated...

✅ Generation complete!
==================================================
GENERATION REPORT
==================================================
✅ Generated: 10 pages
❌ Errors: 0 pages
📁 Output: examples/output/
```

### 3. Quality Check

```bash
python scripts/quality_checker.py --input examples/output/
```

**Expected Output:**
```
Checking 10 pages...
  10/10 pages checked...

✅ Quality check complete!
==================================================
QUALITY REPORT
==================================================
Total Pages: 10
✅ Passed: 10 (100.0%)
❌ Failed: 0
Average Score: 9.2/10
```

### 4. SEO Validation & Sitemap Generation

```bash
python scripts/seo_validator.py \
    --input examples/output/ \
    --domain https://topholz24.de \
    --generate-sitemap
```

**Expected Output:**
```
Validating 10 pages...
  10/10 pages validated...

✅ Validation complete!
==================================================
SEO VALIDATION REPORT
==================================================
Total Pages: 10
✅ Valid: 10
❌ Invalid: 0

Generating sitemap...
✅ Sitemap generated: examples/output/sitemap.xml
   10 URLs included
```

## Example Files

### sample_data.csv
Contains 10 sample products for Topholz24:
- Furniture (desks, shelves, tables)
- Terrace boards
- Fence elements
- Garden furniture
- Kitchen accessories

**Fields:**
- `id` - Unique product ID
- `title` - Product name
- `description` - Product description
- `price` - Price in EUR
- `category` - Product category
- `keywords` - SEO keywords
- `image_url` - Path to product image
- `material` - Wood type/material
- `dimensions` - Product dimensions
- `features` - Comma-separated features
- `url_slug` - URL-friendly slug
- `base_url` - Base domain URL

### Templates

**templates/product_page.html**
- Complete product page template
- Schema.org Product markup
- Open Graph tags
- Breadcrumbs
- Responsive design
- Internal linking

**templates/category_page.html**
- Category overview page
- Product grid layout
- Filters placeholder
- SEO content section
- Related categories

**templates/location_page.html**
- Location-based landing page (Local SEO)
- Schema.org LocalBusiness markup
- Service areas section
- Benefits grid
- Map placeholder
- Nearby cities linking

## Testing Different Templates

### Test Product Template

```bash
python scripts/template_engine.py \
    --data examples/sample_data.csv \
    --template templates/product_page.html \
    --output examples/output_product/ \
    --limit 5
```

### Test Category Template

First, create category data CSV:
```csv
id,category_name,description,product_count,url_slug,base_url
1,Möbel,"Premium Holzmöbel für Wohn- und Arbeitszimmer",120,moebel,https://topholz24.de
2,Terrassendielen,"Hochwertige Terrassendielen aus verschiedenen Holzarten",85,terrassendielen,https://topholz24.de
```

Then generate:
```bash
python scripts/template_engine.py \
    --data examples/category_data.csv \
    --template templates/category_page.html \
    --output examples/output_category/
```

### Test Location Template

Create location data CSV:
```csv
id,city,region,description,districts,nearby_cities,url_slug,base_url
1,Berlin,Berlin,"Holzprodukte für Berlin und Umgebung","Mitte, Charlottenburg, Prenzlauer Berg","Potsdam, Brandenburg, Spandau",berlin,https://topholz24.de
2,Hamburg,Hamburg,"Premium Holz für Hamburg","Altona, Eimsbüttel, Harburg","Lübeck, Kiel, Bremen",hamburg,https://topholz24.de
```

Then generate:
```bash
python scripts/template_engine.py \
    --data examples/location_data.csv \
    --template templates/location_page.html \
    --output examples/output_location/
```

## Real-World Usage

### For Topholz24 Product Catalog

1. **Export products from Bitrix24** to CSV
2. **Ensure required fields** are present (id, title, description, price)
3. **Run pilot generation** (50-100 products)
4. **Quality check** and review
5. **Generate full catalog** (1000+ products)
6. **Deploy** to website

### For WS Agency Client Projects

1. **Receive client data** (products, services, locations)
2. **Create custom template** based on client design
3. **Generate pilot** for client approval
4. **Iterate** based on feedback
5. **Scale** to full site
6. **Deliver** with sitemap and SEO report

## Troubleshooting

### Issue: "Missing required fields"

**Solution:** Ensure your CSV has at minimum: `id`, `title`, `description`

### Issue: "Low quality score"

**Solution:** Enrich data source with longer descriptions (>300 words), add features, add internal links in template

### Issue: "Pages not unique"

**Solution:** Add more dynamic content blocks in template, use conditional sections based on category/material

## Dependencies

Install required Python packages:

```bash
pip install jinja2 pandas beautifulsoup4 lxml
```

Or use requirements.txt (if created):

```bash
pip install -r ../requirements.txt
```

## Next Steps

After successful testing:

1. ✅ Customize templates for your brand
2. ✅ Prepare production data source
3. ✅ Run full generation pipeline
4. ✅ Deploy to staging environment
5. ✅ Submit sitemap to Google Search Console
6. ✅ Monitor organic traffic growth

---

**Need help?** Check the main SKILL.md documentation or contact the WS Workspace team.
