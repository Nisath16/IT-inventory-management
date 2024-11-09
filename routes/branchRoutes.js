const express = require('express');
const router = express.Router();
const { Branch } = require('../models');

// Create new branch
router.post('/', async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create branch' });
  }
});

// Get all branches
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
});

// Get single branch by ID
router.get('/:id', async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branch' });
  }
});

// Update branch by ID
router.put('/:id', async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      await branch.update(req.body);
      res.json(branch);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update branch' });
  }
});

// Delete branch by ID
router.delete('/:id', async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (branch) {
      await branch.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete branch' });
  }
});

module.exports = router;
