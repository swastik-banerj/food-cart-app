🍔 Food Cart App
A full-stack Food Cart application where users can register, log in, browse items, add to cart, and manage their cart. Built using the MERN stack with secure authentication and deployed using Vercel (frontend) and Render (backend).

🧰 Tech Stack
Frontend:

React.js

Tailwind CSS

Axios

Vercel for deployment

Backend:

Node.js + Express

MongoDB with Mongoose

JSON Web Token (JWT) for auth

Render for deployment

✨ Features
🔐 Authentication
User Signup/Login with JWT tokens

Auto-login after signup

Protected routes with token verification middleware

🛒 Cart Functionality
Add items to cart

View user’s cart after login

Delete specific item from cart

Calculate and update total price automatically

⚙️ Backend API Routes
Auth Routes:
POST /api/auth/signup – Register a new user

POST /api/auth/login – Login and receive JWT token

Cart Routes (Protected):
POST /api/cart/save – Add or update an item in cart

GET /api/cart/getCartItems – Fetch logged-in user's cart

DELETE /api/cart/deleteItem/:itemName – Remove item by name

🔐 Cart routes require Authorization header:
Authorization: Bearer <your_token>
