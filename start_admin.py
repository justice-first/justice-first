import http.server
import socketserver
import json
import subprocess
import webbrowser
import os

PORT = 8000
DATA_FILE = 'data.json'

if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write('{}')

class AdminHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Save data to data.json
            with open(DATA_FILE, 'wb') as f:
                f.write(post_data)
            
            print("Data saved locally. Committing and pushing to GitHub...")
            
            # Git operations
            try:
                subprocess.run(["git", "add", DATA_FILE], check=True)
                subprocess.run(["git", "commit", "-m", "Auto-update website data via Admin Portal"], check=True)
                subprocess.run(["git", "push"], check=True)
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status": "success"}')
                print("Successfully pushed to GitHub!")
            except subprocess.CalledProcessError as e:
                print(f"Error pushing to GitHub: {e}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(f'{{"status": "error", "message": "Git push failed: {str(e)}"}}'.encode())
        else:
            self.send_response(404)
            self.end_headers()

Handler = AdminHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Starting Admin Server at http://localhost:{PORT}")
    print("Opening Admin Portal in your browser...")
    webbrowser.open(f"http://localhost:{PORT}/admin-login.html")
    print("Keep this window open! Press Ctrl+C to stop.")
    httpd.serve_forever()
