const express = require('express');
const Astrologer = require('../models/astrologer');
const { distributeFlow } = require('../utils/flowDistribution');

const router = express.Router();

// Endpoint to toggle top astrologer status
router.put('/:id/toggle-top', async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);
    astrologer.isTop = !astrologer.isTop;
    await astrologer.save();
    res.status(200).send(astrologer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint to distribute users to astrologers
router.post('/distribute', async (req, res) => {
  try {
    const flowAllocation = await distributeFlow();
    const users = req.body.users; // Assume users are passed in the request body

    for (let user of users) {
      const targetAstrologer = flowAllocation(user);
      targetAstrologer.currentFlow += 1;
      await targetAstrologer.save();
      user.connectedAstrologer = targetAstrologer._id;
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
