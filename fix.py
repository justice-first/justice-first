import os
import glob
import re

files = glob.glob('*.html')

fetch_logic = """        document.addEventListener('DOMContentLoaded', async () => {
            let savedData = JSON.parse(localStorage.getItem('justiceFirstDataV2')) || {};
            try {
                const res = await fetch('https://jfla.com.pk/api/data');
                const fetchedData = await res.json();
                if (fetchedData && Object.keys(fetchedData).length > 0) {
                    savedData = fetchedData;
                    localStorage.setItem('justiceFirstDataV2', JSON.stringify(fetchedData));
                }
            } catch (e) { console.error('Fetch error:', e); }"""

for file in files:
    if file in ['admin.html', 'index.html', 'admin-login.html']:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    pattern = r"document\.addEventListener\('DOMContentLoaded', \(\) => \{\s+const savedData = JSON\.parse\(localStorage\.getItem\('justiceFirstDataV2'\)\) \|\| \{\};"
    
    if re.search(pattern, content):
        content = re.sub(pattern, fetch_logic, content)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
