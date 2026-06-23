require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const authRoutes = require('./src/routes/auth');
const memberRoutes = require('./src/routes/members');
const teamRoutes = require('./src/routes/teams');
const eventRoutes = require('./src/routes/events');
const blogRoutes = require('./src/routes/blog');
const collaborationRoutes = require('./src/routes/collaborations');
const recognitionRoutes = require('./src/routes/recognitions');

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'AWS BZU Portfolio API is running.',
    env: process.env.NODE_ENV,
  });
});

// ─── API Routes (match spec exactly) ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/collaborations', collaborationRoutes);   // /collaborations/portfolios|partners|universities
app.use('/api/recognitions', recognitionRoutes);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found.` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
