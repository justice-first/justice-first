import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

replacements = {
    # Gradients
    r'\bfrom-obsidian/80\b': 'from-white/80',
    r'\bto-obsidian\b': 'to-white',
    r'\bfrom-obsidian\b': 'from-white',
    
    # Hero text which has to be visible on white background
    r'opacity-30': 'opacity-10', # Reduce background image opacity
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Remaining dark theme artifacts fixed!")
