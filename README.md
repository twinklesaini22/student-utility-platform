# Student Utility Platform

This is the first version of a student utility portal built with HTML, CSS, and JavaScript.

## Features included
- Student / teacher / administrator login flow
- Dashboard overview
- College announcements
- Events and workshops section
- Notes and resource sharing
- Search and filter for resources
- Assignment deadline tracker
- Student discussion board
- Data stored in `localStorage`
- Responsive layout

## Project files
- `index.html` — landing page
- `login.html` — authentication page
- `dashboard.html` — dashboard UI
- `styles.css` — styling
- `app.js` — logic for login, storage, and dashboard interactions

## Demo logins
- Student: `student@college.edu` / `student123`
- Teacher: `teacher@college.edu` / `teacher123`
- Administrator: `admin@college.edu` / `admin123`

## Deploying on GitHub Pages
1. Push this project to a GitHub repository.
2. In GitHub, open the repository.
3. Go to `Settings` → `Pages`.
4. Under `Source`, choose `Deploy from a branch`.
5. Select the `main` branch, then save.
6. GitHub will generate a live Pages URL.

## Notes
- This is a front-end demo version made for startup and easy deployment.
- For real authentication and secure storage, a backend such as Firebase, Supabase, or Node.js + Express should be added later.

## Run locally
Open `index.html` in a browser or use a local web server.

Example:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.
