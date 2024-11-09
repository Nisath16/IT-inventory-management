const { Branch } = require('../models');

exports.getAllBranch = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other CRUD functions (create, update, delete)
