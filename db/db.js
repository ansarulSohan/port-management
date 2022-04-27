const mongoose = require('mongoose');

/**
 * connect to Database
 */

const connecDB = () => {
  mongoose
    .connect('mongodb://localhost/port-management')
    .then(() => {
      console.log('connected to database');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { connecDB };
