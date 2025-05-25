const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = await prisma.task.create({
      data: { title }
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.task.delete({
      where: { id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('DELETE /api/tasks/:id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
