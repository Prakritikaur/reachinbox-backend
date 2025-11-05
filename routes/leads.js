const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Lead A', status: 'open' }]);
});

router.put('/:id', (req, res) => {
  res.json({ message: `Lead ${req.params.id} updated` });
});

module.exports = router;

