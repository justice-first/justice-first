import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

replacements = {
    # Tailwind Config
    r'midnight: "#0A0F1D"': 'midnight: "#F8FAFC"',
    r'obsidian: "#05070A"': 'obsidian: "#FFFFFF"',
    
    # Custom CSS
    r'body \{ background-color: #05070A; color: #E2E8F0; \}': 'body { background-color: #FFFFFF; color: #1E293B; }',
    r'rgba\(5, 7, 10, 0\.8\)': 'rgba(255, 255, 255, 0.9)',
    r'border-bottom: 1px solid rgba\(255, 255, 255, 0\.05\)': 'border-bottom: 1px solid rgba(0, 0, 0, 0.05)',
    r'rgba\(10, 15, 29, 1\)': 'rgba(248, 250, 252, 1)',
    r'background: rgba\(255, 255, 255, 0\.03\)': 'background: rgba(0, 0, 0, 0.02)',
    r'border: 1px solid rgba\(255, 255, 255, 0\.05\)': 'border: 1px solid rgba(0, 0, 0, 0.05)',
    r'background: rgba\(255,255,255,0\.03\)': 'background: rgba(0,0,0,0.02)',
    r'border: 1px solid rgba\(255,255,255,0\.08\)': 'border: 1px solid rgba(0,0,0,0.08)',
    
    # Tailwind classes
    r'\btext-white\b': 'text-gray-900',
    r'\btext-gray-400\b': 'text-gray-600',
    r'\btext-gray-500\b': 'text-gray-700',
    r'\btext-obsidian\b': 'text-white',
    r'\bborder-white/10\b': 'border-black/10',
    r'\bborder-white/20\b': 'border-black/20',
    r'\bbg-white/5\b': 'bg-black/5',
    r'\bbg-white/10\b': 'bg-black/10',
    r'\bbg-white/20\b': 'bg-black/20',
    
    # Dropdown bg
    r'\bbg-midnight/95\b': 'bg-white/95',
    r'\bbg-obsidian/98\b': 'bg-white/98',
    
    # Max widths for 1920x1080
    r'\bmax-w-7xl\b': 'max-w-screen-2xl',
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Theme inverted successfully!")
