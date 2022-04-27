const router = require('express').Router();

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const users = await User.find()
    .select('-__v -password -signature.privateKey')
    .skip((page - 1) * 10)
    .limit(10);
  res.status(200).send(users);
});

router.post('/', async (req, res) => {
  const organization = new Organization({
    ...req.body,
  });
  const savedData = await organization.save();
  return res.status(201).send(savedData);
});
module.exports = router;
