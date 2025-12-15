const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnection = require('./src/config/db.config');
const path = require('path'); // Import the built-in 'path' module for .env loading

// Pre-register models to prevent population errors
require('./src/model/Product.model');
require('./src/model/User.model');
require('./src/model/Address.model');

// Load .env variables from the root project directory
// Load .env variables from the server directory
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const adminRoutes = require('./src/routes/admin.routes');
app.use('/admin', adminRoutes);

const userRoutes = require('./src/routes/user.routes');
app.use('/user', userRoutes);

const productRoutes = require('./src/routes/product.routes');
app.use('/product', productRoutes);

const cartRoutes = require('./src/routes/cart.routes');
app.use('/cart', cartRoutes);

const vtonRoutes = require('./src/routes/vton.routes');
app.use('/api/vton', vtonRoutes);

const orderRoutes = require('./src/routes/order.routes');
app.use('/order', orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB and start server
// This ensures the server only starts after a successful DB connection

dbConnection().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to DB', err);
});