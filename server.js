const express = require('express');
const app = express();
const assetRoutes = require('./routes/assetRoutes');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');

app.use(express.json());
app.use('/api/assets', assetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

