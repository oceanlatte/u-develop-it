const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const app = express(); 

const PORT = process.env.PORT || 3001;

// --- Express Middleware ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

// default response for any request '(Not Found)'
// CATCHALL, keep at the bottom or it will override other routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// "db" is already declared at the top as one of the REQUIRED statments
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});