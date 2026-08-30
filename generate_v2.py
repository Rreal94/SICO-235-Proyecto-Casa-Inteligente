#!/usr/bin/env python3
"""Generate app.js by injecting SVG floor plans and docsContent from backup into template."""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
backup_path = os.path.join(BASE, 'assets', 'old_app_backup.js')

with open(backup_path, 'r', encoding='utf-8') as f:
    old_js = f.read()

# Extract PB SVG function
pb_fn = old_js[old_js.find('function getGroundFloorSVG()'):old_js.find('function getUpperFloorSVG()')].strip()

# Extract PA SVG function
pa_fn = old_js[old_js.find('function getUpperFloorSVG()'):old_js.find('function getExteriorRoofSVG()')].strip()

# Extract EXT SVG function
ext_start = old_js.find('function getExteriorRoofSVG()')
end_marker = '`;\n  }\n'
ext_end = old_js.find(end_marker, ext_start)
ext_fn = old_js[ext_start:ext_end + len(end_marker)].strip()

# Extract docsContent
docs_start = old_js.find('const docsContent =')
docs_end   = old_js.find('\n// ====', docs_start)
docs_block = old_js[docs_start:docs_end].strip()
docs_block = docs_block.replace('const docsContent', 'var docsContent', 1)

print(f'PB SVG: {len(pb_fn):,} chars')
print(f'PA SVG: {len(pa_fn):,} chars')
print(f'EXT SVG: {len(ext_fn):,} chars')
print(f'docsContent: {len(docs_block):,} chars')

template_path = os.path.join(BASE, 'app_v2_template.js')
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

result = (template
    .replace('// __GROUND_FLOOR_SVG__', pb_fn)
    .replace('// __UPPER_FLOOR_SVG__', pa_fn)
    .replace('// __EXTERIOR_ROOF_SVG__', ext_fn)
    .replace('// __DOCS_CONTENT__', docs_block))

out_path = os.path.join(BASE, 'assets', 'js', 'app.js')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(result)

print(f'const docsContent remaining: {result.count("const docsContent")} (must be 0)')
print(f'SUCCESS: {len(result):,} chars ({len(result)//1024} KB) written to assets/js/app.js')
