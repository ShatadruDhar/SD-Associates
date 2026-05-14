# SD Associates

A full-stack company website built with Next.js and TypeScript. It includes a home page, about page, contact page, signup and login pages, and an employee attendance dashboard with a live time display.

## Features         

- Responsive marketing site for the company
- Signup and login flows triggered from the header and hero buttons
- Employee dashboard protected by session cookies
- Attendance marking for the current date with live time
- Login requests restricted to approved IP addresses
- MongoDB persistence for users, sessions, and attendance records

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file and set the MongoDB connection string plus the approved login IPs:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=sd_associates
ALLOWED_LOGIN_IPS=127.0.0.1,::1,203.0.113.10
```

3. Start the app:

```bash
npm run dev
```

## Notes

- Login is blocked unless the request comes from one of the IPs listed in `ALLOWED_LOGIN_IPS`.
- Attendance is limited to one submission per employee per day.
- Data is stored in MongoDB collections for this demo setup.