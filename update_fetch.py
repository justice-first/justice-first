import glob

for file in glob.glob('*.html'):
    if file == 'admin.html' or file == 'admin-login.html': 
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("fetch('/api/data')", "fetch('data.json')")
    content = content.replace("fetch('https://jfla.com.pk/api/data')", "fetch('data.json')")
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {file}')
