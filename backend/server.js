const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Endpoint to serve produce config
app.get('/api/produce-config', (req, res) => {
  const config = require(path.join(__dirname, 'produceConfig.json'));
  res.json(config);
});

// Default port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
