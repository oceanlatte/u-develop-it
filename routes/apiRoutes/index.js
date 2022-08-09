const express = require('express');
const router = express.Router();

// INDEX.JS is acting as a central hub to put use
// all the api routes needed
// Acting as a central 'route' ? 

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./voteRoutes'));


module.exports = router;