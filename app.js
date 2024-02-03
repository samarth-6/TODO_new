const express = require('express');
const app = express();
const Connection = require('./database/db.js');
const auth = require('./routes/auth');
const list = require('./routes/list');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

app.use('/api/v1', auth);
app.use('/api/v2', list);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
Connection();


app.listen(1000, () => {
  console.log("Server is running on port 1000");
});

