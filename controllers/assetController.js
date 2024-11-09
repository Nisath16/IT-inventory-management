const { Asset } = require('../models');

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other CRUD functions (create, update, delete)
