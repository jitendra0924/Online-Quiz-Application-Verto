###  Quiz App — Online Quiz Platform

A simple full-stack **online quiz application** built using **React (frontend)** and **Node.js + Express + SQLite (backend)**.
Users can view available quizzes, attempt them within a given time limit, and view their scores after submission.

---

##  Features

* Fetch quizzes and questions dynamically from backend
* Countdown timer for each quiz (customizable per test)
* Automatic submission when time runs out
* Instant result 
* REST API with Express + SQLite

---

##  Tech Stack

**Frontend:** React (with React Router, Axios, CSS)
**Backend:** Node.js, Express.js
**Database:** SQLite

---

##  Setup Instructions

### 1️⃣ Clone the repository

```bash
https://github.com/jitendra0924/Online-Quiz-Application-Verto.git
cd Online-Quiz-Application-Verto
```

###  Backend Setup

```bash
cd backend
yarn
```


```bash
nodemon server.js
```

The server will start on
 `http://localhost:3000`

---

###  Frontend Setup

Open another terminal and run:

```bash
cd frontend
yarn
yarn run dev
```

The React app will start on
👉 `http://localhost:5173`

---


##  Design Choices & Assumptions

* Each quiz has a `duration` field in seconds (set from backend).
* Timer is handled dynamically from backend value.
* SQLite is used for simplicity — no external DB setup needed.
* REST API returns data in JSON format.
* The frontend is purely functional with React Hooks.

---

## API Endpoints

| Method | Endpoint                   | Description                        |
| ------ | -------------------------- | ---------------------------------- |
| GET    | `/quiz/tests`              | Fetch all tests                    |
| GET    | `/quiz/:id`                | Fetch questions for test           |
| POST   | `/quiz/:id`                | Submit answers and calculate score |

---

## Author

**Jitendra Prasad Sharma**