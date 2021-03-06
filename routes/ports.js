const router = require('express').Router();
const { Port } = require('../models/Port');
const {check, validationResult} = require('express-validator');

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
      check('state').trim().notEmpty().withMessage('State is required').isString().withMessage('State must be a valid string'),
    check('lattitude')
      .not()
      .isEmpty()
      .withMessage('Lattitude is required')
      .isNumeric()
      .withMessage('Lattitude must be a number'),
    check('longtitude')
      .not()
      .isEmpty()
      .withMessage('longtitude is required')
      .isNumeric()
      .withMessage('longtitude must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const {port, city, state, country, lattitude, longtitude} = req.body;
    const newPort = new Port({
      port, city, state, country, geolocation:{lat: lattitude, lng: longtitude}
    });
    const savedData = await newPort.save();
    return res.status(201).send(savedData);
  }
);

module.exports = router;
