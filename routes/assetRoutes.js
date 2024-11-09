const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// Create new asset
router.post('/', async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// Get single asset by ID
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

// Update asset by ID
router.put('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (asset) {
      await asset.update(req.body);
      res.json(asset);
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update asset' });
  }
});

// Delete asset by ID
router.delete('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (asset) {
      await asset.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

module.exports = router;
