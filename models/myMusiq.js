var orm = require("../config/orm.js");

var myMusiq = {
  selectAll: function(table,cols, cb) {
    orm.selectAll(table, cols,  function(res) {
      // this function(result) comes from burger.js.
      // this cb(result) goes back to burger_controller..js

      cb(res);
    });
  },
  

  insertOne: function(table, cols, vals, cb) {
    orm.insertOne(table, cols, vals, function(result) {
      // this function(result) comes from burger.js.
      // this cb(result) goes back to burger_controller..js
      cb(result);
    });
  },
  selectOne: function(table,cols, queryCond, cb) {
      orm.updateOne(table, cols, queryCond, function(result) {
      // this function(result) comes from burger.js.
      // this cb(result) goes back to burger_controller..js
      cb(result);
     });
  },
    getUserId: function(userFld, table, emailFld, emailVal, pswdFld, pswdVal,  cb) {
      console.log("got to here in models/getUserid ")
      orm.getUserId(userFld, table, emailFld, emailVal, pswdFld, pswdVal, function(data) {
      // this function(result) comes from mymusiq.js.
      // this cb(result) goes back to mymusiq_controller..js
      cb(data);
     });
  },

  getMusicInfo: function(userFld, table, keyFld, keyFldVal, cb) {
    console.log("got to here in models/getMusicInfo");
    orm.getMusicInfo(userFld, table, keyFld, keyFldVal, function(data) {
    // this function(result) comes from mymusiq.js.
    // this cb(result) goes back to mymusiq_controller..js
    cb(data);
   });
  },

  getSongInfo: function(userFld, table, plKeyFld, plKeyVal, keyFld, keyFldVal, cb) {
    console.log("got to here in models/getSongInfo");
    orm.getSongInfo(userFld, table, plKeyFld, plKeyVal, keyFld, keyFldVal, function(data) {
    // this function(result) comes from mymusiq.js.
    // this cb(result) goes back to mymusiq_controller..js
    cb(data);
   });
  }
    



};

// Export the database functions for the controller (catsController.js).
module.exports = myMusiq;