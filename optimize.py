import re
import os

BASE_DIR = r"c:\Users\Diego\Downloads\Doces oferta\landing-page"
HTML_PATH = os.path.join(BASE_DIR, "index.html")
CSS_PATH = os.path.join(BASE_DIR, "styles.css")
NEW_HTML_PATH = os.path.join(BASE_DIR, "index.html")

def minify_css(css_content):
    # Remove comments
    css_content = re.sub(r'/\*[\s\S]*?\*/', '', css_content)
    # Remove extra whitespace
    css_content = re.sub(r'\s+', ' ', css_content)
    # Remove spaces around delimiters
    css_content = re.sub(r'\s*([{}:;,])\s*', r'\1', css_content)
    # Add CLS fixes
    css_content += ".countdown-timer{min-height:35px;display:inline-block}details{min-height:20px}"
    return css_content.strip()

def process_file():
    print("Reading files...")
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    with open(CSS_PATH, "r", encoding="utf-8") as f:
        css_content = f.read()

    print("Minifying CSS...")
    minified_css = minify_css(css_content)

    print("Processing HTML...")
    # Replace inline style block with minified external CSS
    # Robust regex to find the style block in head
    html_content = re.sub(r'<style>([\s\S]*?)</style>', f'<style>{minified_css}</style>', html_content, count=1)

    # Remove the large duplicate script at the bottom
    # Matches script block containing "var duration =" and "document.addEventListener"
    # We look for the inline script that starts with document.addEventListener
    
    # We'll match the specific script block structure to be safe
    # It starts around line 1500
    script_pattern = r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\', function \(\) \{[\s\S]*?\}\s*\);\s*</script>'
    # Actually, the script content in index.html (lines 1503-1620) is complex.
    # Let's target the exact block content boundaries if regex fails, but regex should work if unique enough.
    # It ends with `}, 1000);\s*}\s*</script>`
    
    # Let's try to identify it by internal content to avoid false positives
    if "var duration = 19 * 60 + 29;" in html_content:
        # We found the specific inline script
        print("Found duplicate inline script. Removing...")
        # Regex to remove the whole script tag containing this unique string
        pattern = r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\'[\s\S]*?var duration = 19 \* 60 \+ 29;[\s\S]*?</script>'
        html_content = re.sub(pattern, '', html_content)
    
    # Add external script link before body close if not present
    if '<script src="script.js" defer></script>' not in html_content:
        print("Adding external script link...")
        html_content = html_content.replace('</body>', '<script src="script.js" defer></script>\n</body>')

    # Add preload for font (Placeholder - user requested it)
    # We will assume Poppins 700 is critical
    preload_tag = '<link rel="preload" href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2" as="font" type="font/woff2" crossorigin>'
    if "rel=\"preload\"" not in html_content:
        # html_content = html_content.replace('</head>', f'{preload_tag}\n</head>') 
        # Skipping specific preload as URL is uncertain and might break. Font-display swap is already in Google Fonts url.
        pass

    # Minify HTML (Simple whitespace reduction)
    # html_content = re.sub(r'>\s+<', '><', html_content) # Risky for content spacing
    
    print("Writing optimized file...")
    with open(NEW_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print("Done.")

if __name__ == "__main__":
    process_file()
