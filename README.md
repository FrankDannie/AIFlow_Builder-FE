# 🧠 AIFlow Builder – Frontend

This is the frontend UI for **AIFlow Builder**, built with **React + Vite**. It provides a simple interface for users to log in, sign up, and build AI workflows.

---

## 🌐 Tech Stack

- **React 18+**
- **TypeScript**
- **Vite**
- **React Router**
- **SCSS Modules**
- **JWT Auth (localStorage)**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/FrankDannie/AIFlow_Builder-FE.git
```
2. Install Dependencies
```bash
npm install
# or
yarn
```
3. Configure Environment Variables
Create a .env file:

```env
VITE_API_BASE=http://localhost:8000
```
Ensure the backend is running on this URL/port.

🔧 Run Development Server
```bash
npm run dev
# or
yarn dev
```
App will open at: http://localhost:5173

📁 Folder Structure
```bash
src/
├── pages/         # Login, Signup, Dashboard
├── components/    # UI elements
├── services/      # API handlers
├── styles/        # Global and modular SCSS
└── main.tsx       # App entry point
```
🛡 Auth Flow
JWT token stored in localStorage

Auto-redirect to /dashboard after login

/signup → /login → /dashboard

🧪 Linting & Formatting
```bash
npm run lint
```
