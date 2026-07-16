# 🏠 Rentify - Real Estate Rental Platform

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,spring,java,mysql,git,github,vscode" />
</p>

<p align="center">
  A full-stack real estate rental platform that helps users discover rental properties and allows landlords to manage their properties efficiently.
</p>

---

## 📝 Project Overview

Rentify is a modern **full-stack real estate rental platform** designed to simplify the process of finding, managing, and renting properties.

The application provides an intuitive experience for both **property seekers** and **property owners**, including property search, detailed listings, user authentication, and property management features.

This project demonstrates full-stack development using **Next.js**, **Spring Boot**, **Spring Security**, and **MySQL**, following modern software development practices with a separated frontend and backend architecture.

---

## 🌟 Key Features

### 🔍 Property Discovery

* Advanced property search
* Browse available rental properties
* Detailed property information
* Property category and location display

### 👤 User Management

* User authentication
* User profile management
* Secure authorization with Spring Security

### 🏢 Property Management

* Property listing management
* Dashboard for landlords
* Manage rental information

### 🎨 User Experience

* Responsive design
* Modern UI components
* Optimized user experience across devices

---

## 🛠 Tech Stack

## Frontend

<p>
<img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" />
</p>

* Next.js 15
* React
* TypeScript
* Tailwind CSS

---

## Backend

<p>
<img src="https://skillicons.dev/icons?i=spring,java,mysql" />
</p>

* Spring Boot
* Java
* Spring Security
* MySQL

---

## Development Tools

<p>
<img src="https://skillicons.dev/icons?i=git,github,vscode" />
</p>

* Git
* GitHub
* Visual Studio Code

---

# 🏗 System Architecture

```text id="1d4v7k"
                    User

                     │

                     ▼

            Next.js Frontend

                     │

                     ▼

              REST API

                     │

                     ▼

            Spring Boot Backend

                     │

                     ▼

                 MySQL Database
```

---

# 📂 Project Structure

```text id="3u4r6p"
Rentify
│
├── nextjs
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   └── utils
│
└── springboot
    ├── controller
    ├── service
    ├── repository
    ├── entity
    └── security
```

---

# 🚀 Getting Started

## Prerequisites

* Node.js (v18+)
* Java JDK (v17+)
* MySQL
* Maven

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/vuth9808/rentify-2.git

cd rentify-2
```

---

## 2. Setup Frontend

```bash
cd nextjs

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 3. Setup Backend

```bash
cd springboot

./mvnw spring-boot:run
```

Backend runs with Spring Boot.

---

## 4. Database Setup

Create a MySQL database and import:

```text
Rentify.sql
```

Configure database connection in Spring Boot:

```properties
spring.datasource.url=your_database_url
spring.datasource.username=your_username
spring.datasource.password=your_password
```

---

# 📸 Demo Screenshots

## 🏠 Hero Page

![Hero Page](/public/images/demo/hero.jpg)

## 🏢 Properties Page

![Properties Page](/public/images/demo/properties.jpg)

## 📄 Detail Building Page

![Detail Building Page](/public/images/demo/detail-building.jpg)

## 🛠 Services Page

![Services Page](/public/images/demo/services.jpg)

## ℹ️ About Page

![About Page](/public/images/demo/about.jpg)

## 📞 Contact Page

![Contact Page](/public/images/demo/contact.jpg)

## 📊 Dashboard Page

![Dashboard Page](/public/images/demo/dashboard.jpg)

## 🔻 Footer Page

![Footer Page](/public/images/demo/footer.jpg)

---

# 🚀 Deployment

| Service  | Platform           |
| -------- | ------------------ |
| Frontend | Next.js Deployment |
| Backend  | Spring Boot Server |
| Database | MySQL              |

---

# 📋 Available Scripts

## Frontend

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |

## Backend

| Command                  | Description                   |
| ------------------------ | ----------------------------- |
| `./mvnw spring-boot:run` | Start Spring Boot application |

---

# 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

# ✉️ Contact

**TO HOANG VU**

📧 [tohoangvu161225@gmail.com](mailto:tohoangvu161225@gmail.com)

GitHub:
https://github.com/vuth9808
