# 🚀 Trade Opportunities API

AI-powered full-stack application that analyzes market sectors in India and generates trade opportunity insights using Google Gemini.

---

## 🌐 Live Demo

🚧 Coming soon (deployment in progress)

---

## ✨ Features

* 🤖 AI-powered market analysis (Google Gemini)
* 🔍 Sector-based insights (technology, pharma, agriculture)
* 📊 Structured markdown reports
* 📥 Downloadable reports (.md)
* 🔐 Token-based authentication
* 🚦 Rate limiting + session tracking
* 🧾 Logging system
* 🎨 Interactive dashboard (React + Charts)

---

## 🏗️ Architecture

```
Frontend (React)
   ↓
FastAPI Backend (main.py)
   ↓
Data Collector (DuckDuckGo API)
   ↓
Gemini AI Analyzer
   ↓
Markdown Report Output
```

---

## ⚙️ Setup

```bash
git clone https://github.com/kandhukuri-madhu/trade-opportunities-api.git
cd trade-opportunities-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:

```
GEMINI_API_KEY=your_api_key_here
```

Run:

```
uvicorn main:app --reload
```

---

## 🔐 Authentication

```
Authorization: Bearer mysecrettoken
```

---

## 📡 API Endpoints

### 🔍 Analyze Sector

```
GET /analyze/{sector}
```

### 📥 Download Report

```
GET /analyze/{sector}/download
```

### ❤️ Health Check

```
GET /
```

---

## 🚀 Deployment

* Backend → Render
* Frontend → Vercel

---

## 📌 Tech Stack

* FastAPI
* Python
* Google Gemini API
* React.js
* Tailwind CSS
* Recharts

---

## 👨‍💻 Author

**Kandukuri Madhu**

