const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const { generateKeyPair } = require('crypto');
const _ = require('lodash');
const { check, validationResult } = require('express-validator');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const users = await User.find()
    .select('-__v -password -signature.privateKey')
    .skip((page - 1) * 10)
    .limit(10);
  res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send('The user with the given ID was not found.');
  res.status(200).send(user);
});

router.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name is required')
      .isString({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be valid'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // let userPublicKey, userPrivateKey;
    // generateKeyPair(
    //   'rsa',
    //   {
    //     modulusLength: 4096,
    //     publicKeyEncoding: {
    //       type: 'spki',
    //       format: 'pem',
    //     },
    //     privateKeyEncoding: {
    //       type: 'pkcs8',
    //       format: 'pem',
    //     },
    //   },
    //   (err, publicKey, privateKey) => {
    //     if (err) throw err;
    //     (async () => {
    //       userPublicKey = publicKey;
    //       userPrivateKey = privateKey;
    //     })();
    //   }
    // );
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      // signature: {
      //   publicKey: userPublicKey,
      //   privateKey: userPrivateKey,
      // },
    });
    const savedData = await user.save();
    return res
      .status(201)
      .send(
        _.pick(savedData, [
          '_id',
          'name',
          'email' /* , 'signature.publicKey' */,
        ])
      );
  }
);

module.exports = router;
