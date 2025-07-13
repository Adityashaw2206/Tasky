# 📝 Tasky - Full-Stack Task Management App

Tasky is a modern and responsive full-stack task management application that helps users create, track, prioritize, and complete their daily tasks efficiently. Built with the MERN stack, it includes user authentication, filters, priority management, drag-and-drop reordering, due date support, and inline editing.

---

## 🚀 Features

* ✅ User Authentication (Register/Login/Logout)
* ✅ Create, Edit, Delete Tasks
* ✅ Mark Tasks as Completed
* ✅ Inline Editing of Title and Description
* ✅ Filter by Status and Priority
* ✅ Sort by Created Date, Due Date, or Priority
* ✅ Drag-and-Drop Reordering
* ✅ Toast Notifications
* ✅ Mobile Responsive Design
* ✅ Protected Routes with JWT Authentication

---

## 🛠️ Tech Stack

### Frontend:

* React
* Tailwind CSS
* React Router
* Axios
* React Hot Toast
* @hello-pangea/dnd (for drag-and-drop)

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT for authentication
* Cookie-parser

---

## 📦 Folder Structure

```
client/
├── components/
├── pages/
│   ├── Home.jsx
│   ├── Tasks.jsx
├── App.jsx
├── main.jsx
└── ...

server/
├── controller/
│   └── user.controller.js
│   └── task.controller.js
├── middleware/
├── model/
│   └── user.model.js
│   └── task.model.js
├── routes/
│   └── user.routes.js
│   └── task.routes.js
├── utils/
└── index.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```
PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## 🧪 How to Run Locally

### Backend:

```bash
cd server
npm install
npm run dev
```

### Frontend:

```bash
cd client
npm install
npm run dev
```

Make sure the backend is running at `http://localhost:5500` and frontend at `http://localhost:5173`.

---

## 🌐 Deployment

* Frontend: Vercel
* Backend: Render / Railway / Cyclic / Your choice
* MongoDB: Atlas

Make sure to update the frontend `.env` or Axios base URL to point to your backend's live URL.

---

## 👨‍💻 Author

**Aditya Shaw**
3rd Year B.Tech IT Student
Skills: HTML, CSS, JavaScript, React, Node.js, Express, MongoDB

---

## 📃 License

This project is open-source and free to use for educational purposes.
