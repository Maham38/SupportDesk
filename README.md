
# SupportDesk — Mini Customer Support Ticket System

##  Project Overview

SupportDesk is a full-stack web application designed to manage customer support tickets efficiently. It allows users to create, view, filter, and manage support requests while giving admins a simple dashboard to track ticket status and priority.

The project focuses on:

* CRUD operations
* Backend validation
* REST API design
* MongoDB data modeling
* React frontend UI
* Basic analytics dashboard



##  Technology Stack

**Frontend:**

* React.js
* Axios
* React Router DOM
* Bootstrap / CSS

**Backend:**

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Express Validator
---

##  Setup Instructions


##  Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Copy connection string
5. Add it to backend `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

##  How to Run Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

##  How to Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---



##  API Endpoint Summary

### Tickets

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| GET    | `/api/tickets`     | Get all tickets (supports filters & search) |
| POST   | `/api/tickets`     | Create new ticket                           |
| GET    | `/api/tickets/:id` | Get ticket by ID                            |
| PUT    | `/api/tickets/:id` | Update ticket                               |
| DELETE | `/api/tickets/:id` | Delete ticket                               |

---

###  Dashboard

| Method | Endpoint         | Description                                            |
| ------ | ---------------- | ------------------------------------------------------ |
| GET    | `/api/dashboard` | Returns ticket stats (open, closed, in-progress, etc.) |

---

## Assumptions Made

* Each ticket is created by a customer with:

  * Name
  * Email
  * Subject
  * Description
  * Priority
  * Status
* Status defaults to **Open**
* Priority levels: Low, Medium, High
* Admin manages all tickets (no authentication implemented)

---

## Duplicate Email Decision

* Duplicate emails are **allowed**
* Reason: A single customer may submit multiple tickets for different issues
* Each ticket is treated as an independent support request

---

##  Initiative Features Implemented

*  Search tickets by name/email/subject
* Filter by status and priority
* Dashboard with ticket statistics
*  Backend validation using express-validator
*  Clean UI with responsive layout
*  Modular MVC backend structure

---

##  Known Limitations

* No authentication / authorization system
* No role-based access (admin/user separation missing)
* No real-time updates
* Basic UI (no advanced design system)
* No pagination for large datasets
* No email notification system

---

##  What I Would Build Next

*  Role-based access (Admin vs Agent vs User)


## Declaration

I confirm that I completed this challenge without using generative AI, an AI coding assistant, or an AI-enabled editor. I understand the submitted code and can explain and modify it.

