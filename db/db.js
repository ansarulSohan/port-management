const mongoose = require('mongoose');

/**
 * connect to Database
 */

const connecDB = () => {
  mongoose.connect('mongo://localhost/port-management').then(() => {
    console.log('connected to database').catch((err) => {
      console.error(error);
    });
  });
};

module.exports = { connecDB };
