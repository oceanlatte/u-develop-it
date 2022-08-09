const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get --ALL-- voters, sorted by alphabetical last name
router.get('/voters', (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  // db object is using the 'query()' method
  // this runs the SQL query and executes callback with all 
  // the results that match the query, in this case the 'sql' variable we declared
  // in the router.get block
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get --single-- voter
router.get('/voter/:id', (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

module.exports = router;