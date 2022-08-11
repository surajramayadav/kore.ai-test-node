
const mongoose = require('mongoose');
const ConnectDatabase = () => {

  // const DB = process.env.DB_URI_DEV 
  const DB = process.env.DB_URI_PRO

  mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log("Mongodb connected with server : ", data.connection.host);
    })
}
module.exports = ConnectDatabase
