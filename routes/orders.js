const router = require('express').Router();

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const orders = await Order.find()
    .skip((page - 1) * 10)
    .limit(10);
  res.status(200).send(orders);
});

router.post('/', async (req, res) => {
  const order = new Order({
    ...req.body,
  });
  const savedData = await order.save();
  return res.status(201).send(savedData);
});

module.exports = router;
