
const assert = require('assert');
const { distributeFlow } = require('../utils/flowDistribution');
const Astrologer = require('../models/astrologer');
const mongoose = require('mongoose');
require('dotenv').config();

describe('Flow Distribution Algorithm', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Astrologer.deleteMany({});
    await Astrologer.create([{ name: 'Astro1' }, { name: 'Astro2', isTop: true }]);
  });

  it('should distribute users evenly', async () => {
    const flowAllocation = await distributeFlow();
    const user1 = { name: 'User1' };
    const user2 = { name: 'User2' };
    const targetAstrologer1 = flowAllocation(user1);
    const targetAstrologer2 = flowAllocation(user2);
    assert(targetAstrologer1._id.toString() !== targetAstrologer2._id.toString());
  });

  it('should allocate more users to top astrologers', async () => {
    const flowAllocation = await distributeFlow();
    const user1 = { name: 'User1' };
    const user2 = { name: 'User2' };
    const user3 = { name: 'User3' };
    const targetAstrologer1 = flowAllocation(user1);
    const targetAstrologer2 = flowAllocation(user2);
    const targetAstrologer3 = flowAllocation(user3);
    assert(targetAstrologer1.isTop || targetAstrologer2.isTop || targetAstrologer3.isTop);
  });
});