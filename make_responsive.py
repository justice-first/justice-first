import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Hero text sizes
    content = content.replace("text-6xl md:text-8xl", "text-4xl sm:text-5xl md:text-6xl lg:text-8xl")
    content = content.replace("text-5xl md:text-7xl", "text-3xl sm:text-4xl md:text-5xl lg:text-7xl")
    content = content.replace("text-4xl md:text-6xl", "text-2xl sm:text-3xl md:text-4xl lg:text-6xl")
    
    # Heights
    content = content.replace("min-h-screen", "min-h-[100dvh]")
    if file == 'admin.html':
        content = content.replace("h-screen", "h-[100dvh]")
        
    # General scaling fixes
    # Make sure maximum width is bounded on containers
    content = content.replace("max-w-7xl mx-auto", "max-w-7xl mx-auto w-full")
    content = content.replace("max-w-4xl", "max-w-4xl w-full")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {file}')
