import os
import re

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add cache buster to fetch('data.json')
        new_content = content.replace("fetch('data.json')", "fetch('data.json?v=' + new Date().getTime())")
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file} with cache buster")
