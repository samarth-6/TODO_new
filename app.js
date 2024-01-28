const express = require('express');
const app = express();
const Connection = require('./database/db.js');
const auth = require('./routes/auth');
const list = require('./routes/list');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

// Define your API routes
app.use('/api/v1', auth);
app.use('/api/v2', list);

// Define the catch-all route to serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

Connection();

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

