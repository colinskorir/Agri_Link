const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.get('/api/produce-config', (req, res) => {
  const config = require(path.join(__dirname, 'produceConfig.json'));
  res.json(config);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
