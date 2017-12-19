var connection = require("../config/connection.js");
//----------------------------------------------
// Object Relational Mapper (ORM)
//----------------------------------------------

//----------------------------------------------
// Adds  Question Marks to the IONsert String.
//----------------------------------------------
function addQuestionMarks(val){
  var arr = [];

  for (var i = 0; i < num; i++){

    arr.push("?")
  }// end for var

}// end function

function addObjToSql(obj){
  var arr = [];

  for (var key in obj){

    var val = obj[key];
    if (Object.hasOwnProperty.call(obj,key)){
       if (typeof val === "string" && val.indexOf(" ")>= 0){
          val = "'" + val + "'";
       }// end if 
       arr.push(key + "=" + val);
    }// end if(object)
  }// end for
  return arr.toString();
} // end addObjToSql


var orm = {
    selectAll: function( tableToGet, colToGet, cb) {
      // gets all data
      var queryString = "SELECT ?? FROM ??";
      //this cb is from burger.js and pass back the cb on line 56
      //this fcn is part/parcel of the connect.query.
      connection.query(queryString, [ colToGet, tableToGet], function(err, result) {
        console.log("thsi sql " + this.sql)
        if (err) {
          throw err;
        }
        cb(result)
      });
    },



    getUserId: function(  colToGet,tableToGet, emailFld, emailVal, pswdField, pswdVal, cb) {
      // gets data for one user
      var queryString = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?";
      //this cb is from burger.js and pass back the cb on line 56
      //this fcn is part/parcel of the connect.query.
      connection.query(queryString, [ colToGet, tableToGet, emailFld, emailVal, pswdField, pswdVal], function(err, result) {
        console.log("thsi sql " + this.sql)
        if (err) {
          throw err;
        }
        console.log('from orm, line 63 ' + JSON.stringify(result));
        cb(result)
      });

    },

    getMusicInfo: function(  colToGet,tableToGet, keyFld, keyFldVal, cb) {
      // gets data for one user
      console.log(" from getMusic INfo " + colToGet + " " + tableToGet + " " + keyFld + " " + keyFldVal);
      var queryString = "SELECT ?? FROM ?? WHERE ?? = ?";
      //this cb is from burger.js and pass back the cb on line 56
      //this fcn is part/parcel of the connect.query.
      connection.query(queryString, [ colToGet, tableToGet, keyFld, keyFldVal], function(err, result) {
        console.log("thsi  sql from getMusicInfo " + this.sql)
        if (err) {
          throw err;
        }
        cb(result)
      });

    },
    getSongInfo: function(  colToGet,tableToGet, plKeyFld, plKeyVal, keyFld, keyFldVal, cb) {
      // gets data for one user
      console.log(" from getSong Info " + colToGet + " " + tableToGet + " " + plKeyFld + " " + plKeyVal + " " + keyFld + " " + keyFldVal);
      var queryString = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?";
      //this cb is from burger.js and pass back the cb on line 56
      //this fcn is part/parcel of the connect.query.
      connection.query(queryString, [ colToGet, tableToGet, plKeyFld, plKeyVal, keyFld, keyFldVal], function(err, result) {
        console.log("thsi  sql from getSongInfo " + this.sql)
        if (err) {
          throw err;
        }
        cb(result)
      });

    },


  insertOne: function(table, fields, val,cb) {
    console.log(" from orm " + table + " " + fields + " " + val) 
    var queryString = "INSERT INTO ?? ( ?? ) VALUES (?)";
    //this cb is from burger.js and pass back the cb on line 56
    //this fcn is part/parcel of the connect.query.
    connection.query(queryString, [table, fields, val], function(err, result) {
      console.log("this is insert sql 2 " + this.sql)
      if (err) {
        throw err;
      }
      console.log(JSON.stringify(result));
        cb(result);
      });
  }
};

module.exports = orm;
