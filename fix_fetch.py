import glob

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if "fetch('https://jfla.com.pk/api/data')" in content:
        content = content.replace("fetch('https://jfla.com.pk/api/data')", "fetch('/api/data')")
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
