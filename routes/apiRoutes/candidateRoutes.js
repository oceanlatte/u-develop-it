const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


/* These routes were all originally '/api/candidates'
bc we refactored on server.js to require('./routes/apiRoutes)..
we no longer need to declare /api/ .. before /candidates
because it's hard coded onto the server.js file */

// GET --ALL-- candidates
// originally /api/candidates
router.get('/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;

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

// GET --single-- candidate
// originally /api/candidates/:id
router.get('/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
  AS party_name
  FROM candidates
  LEFT JOIN parties
  ON candidates.party_id = parties.id 
  WHERE candidates.id = ?`;
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

// Create a candidate
// originally /api/candidate
router.post('/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Delete a candidate
// originally /api/candidate/:id
router.delete('/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    }
    else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    }
    else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: params
      });
    }
  });
});

module.exports = router;