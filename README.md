# ⚡ LinkVault — Modern URL Shortener & Analytics Dashboard

A professional, high-tech MERN-stack URL shortener featuring a dark-mode SaaS UI, instant link redirection, click tracking, custom alias support, and zero-configuration local file persistence.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS (CDN-powered styling)
* **Backend:** Node.js, Express.js, RESTful API architecture
* **Storage:** File-backed persistent JSON database (`links.json`)
* **Security & Utility:** CORS enabled, robust error handling, client-side routing state

---

## ✨ Key Features

* **Authentication Suite:** Built-in Sign In and Sign Up views with session state, password handling, and mock social login options (Google & GitHub).
* **Dark-Mode SaaS UI:** Modern dashboard interface with dynamic tab navigation (*Overview*, *My Links*, *Analytics*, and *Settings*).
* **Custom Short Aliases:** Option to specify custom custom short codes or auto-generate unique hashes.
* **Real-Time Click Tracking:** Instant redirection mapping with automated click-counter increments saved directly to disk.
* **Zero-Config Storage:** Lightweight file-based persistence eliminating the need for complex external database setups (MongoDB/SQL).

---

## 🚀 Getting Started & Local Setup

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have **Node.js** installed on your system.

### 1. Clone or Open the Project
Open your terminal in the root project folder (`link-vault`).

### 2. Run the Backend Server
```bash
cd backend
npm install
node server.js