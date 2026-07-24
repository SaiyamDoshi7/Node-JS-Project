# 🚀 Task Management App

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Template-B4CA65?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-UI-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)

**A secure Task Management Web Application built with Node.js, Express.js, MongoDB, JWT Authentication, Cookies, and MVC Architecture.**

</div>

---

# 📌 Features

* 🔐 JWT Authentication
* 🍪 Cookie-Based Authentication
* 👥 Role-Based Access Control (Admin & User)
* ✅ Task CRUD Operations
* 📂 Category Management
* 👤 Multiuser Support
* 🔗 MongoDB Populate
* 🔍 Search Functionality
* 📄 Pagination
* 💬 Flash Messages
* 🎨 Responsive Bootstrap 5 UI
* 🧩 MVC Architecture
* 🔒 Password Encryption using bcrypt

---

# 🛠 Tech Stack

| Technology    | Usage               |
| ------------- | ------------------- |
| Node.js       | Runtime Environment |
| Express.js    | Backend Framework   |
| MongoDB       | Database            |
| Mongoose      | ODM                 |
| EJS           | Template Engine     |
| JWT           | Authentication      |
| Cookie Parser | Cookie Handling     |
| bcrypt        | Password Hashing    |
| Bootstrap 5   | User Interface      |

---

# 📂 Project Structure

```text
Task-Management-App/
│
├── config/
├── controller/
├── middleware/
├── models/
├── routes/
├── views/
│   ├── partials/
│   ├── auth/
│   ├── task/
│   └── category/
├── public/
│
├── app.js
├── package.json
└── .env
```

---

# 👤 User Roles

## 👨‍💼 Admin

* View All Tasks
* Add Tasks
* Edit Tasks
* Delete Tasks
* Manage Categories
* View All Users' Tasks

## 👤 User

* Register & Login
* View Own Tasks
* Add Own Tasks
* Edit Own Tasks
* Delete Own Tasks

---

# 🔐 Authentication Flow

```text
Register
      │
      ▼
Password Hash (bcrypt)
      │
      ▼
Store User
      │
      ▼
Login
      │
      ▼
Generate JWT
      │
      ▼
Store Token in Cookie
      │
      ▼
Protected Routes
      │
      ▼
Dashboard
      │
      ▼
Logout
      │
      ▼
Clear Cookie
```

---

# 📋 Task Flow

```text
Login
   │
   ▼
Dashboard
   │
   ▼
Add Task
   │
   ▼
Save to MongoDB
   │
   ▼
View Tasks
   │
   ▼
Edit Task
   │
   ▼
Delete Task
```

---

# 🗄 Database Models

### User

* Name
* Email
* Password
* Role
* Avatar

### Category

* Category Name
* Description
* Created By

### Task

* Title
* Description
* Status
* Priority
* Due Date
* Category
* User

---

# ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/SaiyamDoshi7/Node-JS-Project.git
```

### Move to Project Folder

```bash
cd Task-Management-App
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add:

```env
PORT=9000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=mysecretkey
```

### Run Project

```bash
npm start
```

Server:

```text
http://localhost:9000
```

---

# 🎥 Video Demo

> **Add your project demo video link here**

```text
https://drive.google.com/file/d/1cSaNY-8oyzqQe4fqnkFAMCn1HERniv_w/view?usp=sharing
```

---

# 📸 Screenshots

## 🏠 Dashboard

```
<img width="1919" height="993" alt="Screenshot 2026-07-24 142930" src="https://github.com/user-attachments/assets/ed985fc6-e78d-41bf-8041-e781f90da0f1" />

```

---

## ➕ Add Task

```
<img width="1919" height="989" alt="Screenshot 2026-07-24 143033" src="https://github.com/user-attachments/assets/9f5c56d3-88fe-4054-8466-26a4ef989217" />

```

---

## 📋 View All Tasks

```
<img width="1919" height="994" alt="Screenshot 2026-07-24 143015" src="https://github.com/user-attachments/assets/83fa5181-c083-4173-ad25-d966998f5015" />

```

---

## ✏ Edit Task

```
<img width="1919" height="992" alt="Screenshot 2026-07-24 143101" src="https://github.com/user-attachments/assets/89e5a772-b9df-4f9a-acc5-2332a4846040" />

```

---

## ➕ Add Category

```
<img width="1919" height="990" alt="Screenshot 2026-07-24 143258" src="https://github.com/user-attachments/assets/1a739c94-80e2-4d15-805a-36f68f49eba3" />


```

## 📋 View All Category 
```
<img width="1918" height="989" alt="Screenshot 2026-07-24 143244" src="https://github.com/user-attachments/assets/2ef16f78-e54f-4ca6-9ca6-bb167825a58c" />

```

---

## 🔐 Login

```
<img width="1919" height="991" alt="Screenshot 2026-07-24 142858" src="https://github.com/user-attachments/assets/25c76823-2f87-484a-a396-c4b742c9e049" />

```

---

## 📝 Register

```
<img width="1919" height="992" alt="Screenshot 2026-07-24 143318" src="https://github.com/user-attachments/assets/51fd6163-d5b6-474b-9282-d6799d5a5693" />

```

---

# 🌟 Future Improvements

* Email Notifications
* Task Reminder System
* File Attachments
* User Profile Management
* Dark Mode
* Dashboard Analytics

---

# 👨‍💻 Developer

**Saiyam Doshi**

RNW Student | Full Stack Developer

---

# ⭐ Support

If you found this project helpful, don't forget to **Star ⭐ the repository**.
