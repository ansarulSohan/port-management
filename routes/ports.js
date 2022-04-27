const router = require('express').Router();
const { Port } = require('../models/Port');

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const ports = await Port.find()
    .skip((page - 1) * 10)
    .limit(10);
  res.status(200).send(ports);
});

router.post(
  '/',
  [
    check('port')
      .not()
      .isEmpty()
      .withMessage('Port is required')
      .isString({ min: 3 })
      .withMessage('Port must be at least 3 characters long'),
    check('city')
      .not()
      .isEmpty()
      .withMessage('City is required')
      .isString({ min: 3 })
      .withMessage('City must be at least 3 characters long'),
    check('country')
      .not()
      .isEmpty()
      .withMessage('Country is required')
      .isString({ min: 3 })
      .withMessage('Country must be at least 3 characters long'),
    check('latitude')
      .not()
      .isEmpty()
      .withMessage('Latitude is required')
      .isNumeric()
      .withMessage('Latitude must be a number'),
    check('longitude')
      .not()
      .isEmpty()
      .withMessage('Longitude is required')
      .isNumeric()
      .withMessage('Longitude must be a number'),
  ],
  async (req, res) => {
    const port = new Port({
      ...req.body,
    });
    const savedData = await port.save();
    return res.status(201).send(savedData);
  }
);

module.exports = router;
