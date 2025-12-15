<div align="center">

# 🌙 Lunaria
### Premium Fashion E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/Prithwiraj731/Lunaria--E-Commerce/graphs/commit-activity)

**A modern, full-stack MERN e-commerce platform for premium fashion**  
*Featuring AI-powered virtual try-on, intelligent chatbot, and stunning UI/UX*

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/Prithwiraj731/Lunaria--E-Commerce/issues) • [✨ Request Feature](https://github.com/Prithwiraj731/Lunaria--E-Commerce/issues)

</div>

---

## ✨ Features

### 🛒 E-Commerce Core
- **Premium Product Catalog** - 500+ products across Women, Men & Kids categories
- **Advanced Search & Filter** - Find products quickly with smart search
- **Shopping Cart** - Persistent cart with real-time price calculation
- **Secure Checkout** - Multi-step checkout with address and payment management
- **Order Management** - Complete order tracking and history

### 🤖 AI-Powered Innovations
- **Virtual Try-On (VTON)** - See how clothes look on you using IDM-VTON AI model
- **Intelligent Chatbot** - 24/7 automated assistance with 12+ quick actions
  - Product recommendations
  - Order tracking help
  - Policy information
  - Store navigation
  - How-to guides

### 🎨 Stunning UI/UX
- **Modern Design** - White & yellow theme with glassmorphism effects
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Responsive Layout** - Mobile-first design that works on all devices
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Dark Mode Support** - Easy on the eyes (Coming Soon)

### 🔐 Security & Authentication
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - bcrypt hashing with 10 rounds
- **Protected Routes** - Role-based access control
- **Secure Payments** - Razorpay integration (ready to use)
- **Data Privacy** - Environment variables for sensitive data

### 📦 Additional Features
- **Multiple Addresses** - Save and manage multiple shipping addresses
- **Payment Cards** - Securely save payment methods
- **Order Tracking** - Real-time order status updates
- **Admin Dashboard** - Manage products, orders, and users
- **Email Notifications** - Order confirmations (Coming Soon)
- **Wishlist** - Save products for later (Coming Soon)
- **Product Reviews** - Customer ratings and reviews (Coming Soon)

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas recommended)
- **Cloudinary** account (for image storage)

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/Prithwiraj731/Lunaria--E-Commerce.git
cd Lunaria--E-Commerce
```

2️⃣ **Install server dependencies**
```bash
cd server
npm install
```

3️⃣ **Install client dependencies**
```bash
cd ../client
npm install
```

4️⃣ **Environment Configuration**

Create a `.env` file in the **`server`** folder:

```env
# Server Configuration
PORT=3000

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/lunaria

# Authentication
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRED_IN=3h

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Replicate API (AI Virtual Try-On)
REPLICATE_API_TOKEN=your_replicate_api_token

# Razorpay (Payment Gateway)
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

5️⃣ **Start the application**

Open two terminal windows:

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:3000`

**Terminal 2 - Start Frontend Client:**
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5173`

6️⃣ **Access the application**

Open your browser and navigate to: **http://localhost:5173**

---

## 🏗️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### External Services
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)
![Replicate](https://img.shields.io/badge/Replicate-AI-orange?style=for-the-badge)

</div>

### Detailed Stack

**Frontend:**
- React 18.x - Modern UI library with hooks
- Vite - Lightning-fast build tool with HMR
- React Router DOM - Client-side routing
- Framer Motion - Production-ready animations
- Tailwind CSS - Utility-first styling
- Axios - Promise-based HTTP client
- React Icons - Icon library

**Backend:**
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB Atlas - Cloud database
- Mongoose - MongoDB ODM
- JWT - Secure authentication
- bcrypt - Password hashing
- Multer - File upload handling
- CORS - Cross-origin resource sharing

**AI/ML:**
- Replicate API - IDM-VTON model for virtual try-on

**Cloud Services:**
- Cloudinary - Image & video management
- MongoDB Atlas - Database hosting
- Razorpay - Payment gateway

---

## 📁 Project Structure

```
Lunaria--E-Commerce/
│
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── common/              # Shared components
│   │   │   │   └── Chatbot.jsx      # Intelligent chatbot
│   │   │   └── layout/              # Layout components
│   │   │       ├── Navbar.jsx       # Navigation bar
│   │   │       └── Footer.jsx       # Footer component
│   │   ├── context/                 # React Context
│   │   │   └── UserContext.jsx      # User state management
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── About.jsx            # About page
│   │   │   ├── Contact.jsx          # Contact page
│   │   │   ├── Products.jsx         # All products
│   │   │   ├── ProductDetail.jsx    # Product details
│   │   │   ├── Women.jsx            # Women's category
│   │   │   ├── Men.jsx              # Men's category
│   │   │   ├── Kids.jsx             # Kids category
│   │   │   ├── Cart.jsx             # Shopping cart
│   │   │   ├── Checkout.jsx         # Checkout process
│   │   │   ├── Account.jsx          # User account
│   │   │   ├── Login.jsx            # User login
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── AdminLogin.jsx       # Admin login
│   │   │   ├── AdminHome.jsx        # Admin dashboard
│   │   │   └── TryOn.jsx            # Virtual try-on
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js               # Vite configuration
│   └── package.json                 # Dependencies
│
├── server/                          # Backend Node.js Application
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   └── db.config.js         # Database connection
│   │   ├── controllers/             # Route controllers
│   │   │   ├── user.controller.js   # User operations
│   │   │   ├── admin.controller.js  # Admin operations
│   │   │   ├── product.controller.js# Product CRUD
│   │   │   ├── cart.controller.js   # Cart management
│   │   │   ├── order.controller.js  # Order processing
│   │   │   └── vton.controller.js   # Virtual try-on
│   │   ├── middleware/              # Custom middleware
│   │   │   └── auth.middleware.js   # Authentication
│   │   ├── model/                   # Mongoose models
│   │   │   ├── User.model.js        # User schema
│   │   │   ├── Product.model.js     # Product schema
│   │   │   ├── Cart.model.js        # Cart schema
│   │   │   ├── Order.model.js       # Order schema
│   │   │   └── Address.model.js     # Address schema
│   │   └── routes/                  # API routes
│   │       ├── user.routes.js       # User endpoints
│   │       ├── admin.routes.js      # Admin endpoints
│   │       ├── product.routes.js    # Product endpoints
│   │       ├── cart.routes.js       # Cart endpoints
│   │       ├── order.routes.js      # Order endpoints
│   │       └── vton.routes.js       # VTON endpoints
│   ├── uploads/                     # Uploaded files
│   ├── .env                         # Environment variables
│   ├── app.js                       # Express app
│   └── package.json                 # Dependencies
│
├── .gitignore                       # Git ignore rules
├── README.md                        # You are here!
└── LICENSE                          # MIT License
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### **User Routes** `/user`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register new user | ❌ |
| POST | `/user/login` | User login | ❌ |
| GET | `/user/profile` | Get user profile | ✅ |
| PUT | `/user/profile` | Update profile | ✅ |

#### **Product Routes** `/product`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/product` | Get all products | ❌ |
| GET | `/product/:id` | Get product by ID | ❌ |
| GET | `/product/search` | Search products | ❌ |
| GET | `/product/category/:category` | Filter by category | ❌ |

#### **Cart Routes** `/cart`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | ✅ |
| POST | `/cart` | Add to cart | ✅ |
| PUT | `/cart/:itemId` | Update cart item | ✅ |
| DELETE | `/cart/:itemId` | Remove from cart | ✅ |
| POST | `/cart/clear` | Clear cart | ✅ |

#### **Order Routes** `/order`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/order` | Create order | ✅ |
| GET | `/order` | Get all orders (admin) | ✅ Admin |
| GET | `/order/:id` | Get order by ID | ✅ |
| GET | `/order/user/:userId` | Get user orders | ✅ |

#### **Admin Routes** `/admin`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/login` | Admin login | ❌ |
| POST | `/admin/product` | Create product | ✅ Admin |
| PUT | `/admin/product/:id` | Update product | ✅ Admin |
| DELETE | `/admin/product/:id` | Delete product | ✅ Admin |

#### **VTON Routes** `/api/vton`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/vton/try-on` | Generate virtual try-on | ✅ |

---

## 🎨 Design Philosophy

### Color Palette
- **Primary:** `#FACC15` (Yellow-400) - Vibrant and energetic
- **Dark:** `#1F2937` (Gray-800) - Elegant and modern
- **Light:** `#FFFFFF` (White) - Clean and minimal
- **Accent:** Gray shades for depth

### Design Principles
1. **Clarity** - Clean, uncluttered interfaces
2. **Consistency** - Uniform design language throughout
3. **Feedback** - Visual feedback for all user interactions
4. **Accessibility** - Readable fonts and good contrast
5. **Delight** - Smooth animations and micro-interactions

### Typography
- **Headings:** Bold, black weights for impact
- **Body:** Regular weights for readability
- **Accents:** Yellow highlights for emphasis

---

## 📊 Performance

### Metrics
- ⚡ **Page Load Time:** < 2 seconds
- 🔍 **Search Results:** < 1 second
- 🛒 **Cart Operations:** Real-time updates
- 📦 **Checkout Process:** Smooth multi-step flow

### Optimizations
- ✅ Vite's lightning-fast HMR
- ✅ Code splitting & lazy loading
- ✅ Cloudinary CDN for images
- ✅ Efficient MongoDB queries
- ✅ Minified production builds

---

## 🔒 Security Features

- 🔐 **JWT Authentication** - Secure token-based auth
- 🔒 **Password Hashing** - bcrypt with 10 rounds
- 🛡️ **Protected Routes** - Middleware authorization
- 🌐 **CORS Configuration** - Controlled cross-origin access
- 🔑 **Environment Variables** - Sensitive data protection
- ✅ **Input Validation** - Mongoose schema validation
- 👮 **Admin Authorization** - Role-based access control

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. **Fork the Project**
   ```bash
   # Click the 'Fork' button at the top right of this page
   ```

2. **Clone your Fork**
   ```bash
   git clone https://github.com/your-username/Lunaria--E-Commerce.git
   cd Lunaria--E-Commerce
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your Changes**
   - Write clean, commented code
   - Follow existing code style
   - Test thoroughly

5. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click 'New Pull Request'
   - Describe your changes

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Update documentation if needed
- Add tests for new features
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Lunaria

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Prithwiraj**

- GitHub: [@Prithwiraj731](https://github.com/Prithwiraj731)
- Project: [Lunaria E-Commerce](https://github.com/Prithwiraj731/Lunaria--E-Commerce)

---

## 🙏 Acknowledgments

Special thanks to:

- **React Team** - For the amazing framework
- **MongoDB** - For the powerful database
- **Cloudinary** - For seamless image hosting
- **Replicate** - For AI capabilities
- **Vite Team** - For the lightning-fast build tool
- **Framer Motion** - For beautiful animations
- **Open Source Community** - For countless packages and inspiration

---

## 📧 Support & Contact

### Need Help?

- 📖 **Documentation:** [Read the docs](#documentation)
- 🐛 **Bug Report:** [Open an issue](https://github.com/Prithwiraj731/Lunaria--E-Commerce/issues)
- 💡 **Feature Request:** [Request a feature](https://github.com/Prithwiraj731/Lunaria--E-Commerce/issues)
- 📧 **Email:** support@lunaria.com

### Connect With Us

- 💬 **Discussions:** [GitHub Discussions](https://github.com/Prithwiraj731/Lunaria--E-Commerce/discussions)
- 🐦 **Twitter:** [@LunariaStore](#)
- 📷 **Instagram:** [@lunaria.store](#)

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/Prithwiraj731/Lunaria--E-Commerce?style=social)
![GitHub forks](https://img.shields.io/github/forks/Prithwiraj731/Lunaria--E-Commerce?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Prithwiraj731/Lunaria--E-Commerce?style=social)

---

<div align="center">

### ⭐ Star this repository if you found it helpful! ⭐

**Made with ❤️ by [Prithwiraj](https://github.com/Prithwiraj731)**

© 2025 Lunaria. All rights reserved.

</div>
