// 1. Load environment variables first
require('dotenv').config();

// 2. Import required modules
const express = require('express');
const cors = require('cors');
const app = express(); // ✅ This MUST come BEFORE app.use(...)
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Register Routes (after app is initialized)
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// 5. Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
