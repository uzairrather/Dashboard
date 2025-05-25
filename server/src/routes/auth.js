const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Ideally from .env

// Register new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, userId: user.id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
