var express = require("express");

var router = express.Router();

// Import the model (myMusiq.js) to use its database functions.
var myMusiq = require("../models/myMusiq.js");

//  gets the user ID based upon the id and pssword
router.post("/api/getUserId", function(req, res) {
  //--------------------------------------------
  // retrieves the data from the database..
  //--------------------------------------------
      // calls the index page and sends the object
      //console.log("got to get u ser id " + req.body.user);
      //console.log(" got to  pswd   " + req.body.pswd);

      myMusiq.getUserId( ["user_key","email"],"users","email", req.body.user,"password", req.body.pswd, function(data){
         // need to send a response back to the calling ajax..
         // this res goes back to the ajax call in the main.handler..
         var userInfo= {
           userId : data
         }
         //console.log(" from mymusiq_controller as the response " + JSON.stringify(data));
         res.status(200).json(userInfo);
         //res.json(result)
       })
       
  });

  router.get("/", function(req, res) {
    //--------------------------------------------
    // retrieves the data from the database..
    //--------------------------------------------
      console.log("from original get for index");
        res.render("index");
    });
// Create all our routes and set up logic within those routes where required.
router.get("/:Id", function(req, res) {
  //--------------------------------------------
  // retrieves the data from the database..
  //--------------------------------------------
      userId = req.params.Id;
      // calls the index page and sends the object
      console.log("xx " + userId + ' running index ');
      res.render("index", { userId: userId });
  });
  router.get("/api/addNewUser/", function(req, res) {
    //--------------------------------------------
    // retrieves the data from the database..
    //--------------------------------------------
        // calls the playlist page and sends the object
        console.log("got to add new u ser");
        res.render("addNewUser");
    });

    router.get("/api/playlist/:Id", function(req, res) {
      //--------------------------------------------
      // retrieves the data from the database..
      //--------------------------------------------
          // calls the playlist page and sends the object
          userId = req.params.Id;
          res.render("addNewPlayList", {userId: userId});
      });   

    // loads the add song page  
    router.get("/api/addNewSong/:Id/:plId", function(req, res) {
      //--------------------------------------------
      // retrieves the data from the database..
      //--------------------------------------------
          // calls the playlist page and sends the object
          userId = req.params.Id;
          plId   = req.params.plId
          res.render("addNewSongs", {userId: userId, playListId: plId});
      });   

router.post("/api/addNewUser", function(req, res) {
  //--------------------------------------------
  // inserts the data for the User 
  // 1. inserts into the email and first name and last name and pswd fields
  //--------------------------------------------
     myMusiq.insertOne("users",
         ["email","first_name","last_name","password"],
         [req.body.email,req.body.fName,req.body.lName,req.body.pswd],
         function(result){
          result["email"] = req.body.email;
          result["fName"] = req.body.fName;
          result["lName"] = req.body.lName;          
          // need to send a response back to the calling ajax..
          // this res goes back to the ajax call in the main.handler..
          console.log(JSON.stringify(result));
          res.status(200).json(result);

        })
    });
router.post("/api/addPlaylist", function(req, res) {


//--------------------------------------------
// inserts the data for the playlist
// 1. inserts inoto user_key and pl_name fiels
//--------------------------------------------
// insertOne: function(table, fields, val,cb) {
   myMusiq.insertOne("playlist",
       ["user_key","pl_name"],
       [req.body.userId,req.body.pl_name],
       function(result){
        result["pl_name"] = req.body.pl_name;
        result["user_key"] = req.body.userId;
        // need to send a response back to the calling ajax..
        // this res goes back to the ajax call in the main.handler..
        res.status(200).json(result);
        //res.json(result)
      })

});

router.post("/api/addSong", function(req, res) {

  console.log(req.body);
  //--------------------------------------------
  // inserts the data for the playlist
  // 1. inserts inoto user_key , pl_key and song_name fields
  //--------------------------------------------
  // insertOne: function(table, fields, val,cb) {
     myMusiq.insertOne("playlist_songs",
         ["pl_key","user_key","song_name","song_url"],
         [req.body.plId,req.body.userId,req.body.songName, req.body.songURL],
         function(result){
          result["song_name"] = req.body.songName;
          result["song_url"]  = req.body.songURL;
          result["user_key"] = req.body.userId;
          // need to send a response back to the calling ajax..
          // this res goes back to the ajax call in the main.handler..
          res.status(200).json(result);
          //res.json(result)
        })
  
  });

    // retrieve the playlists

    router.post("/api/getPlayLists", function(req, res) {
      //--------------------------------------------
      // inserts the data for the playlist
      // 1. inserts inoto user_key , pl_key and song_name fields
      //--------------------------------------------
      console.log("got to api/gePlayLists, line 147 in mymusic_controllers.js: id= " + req.body.id);
        myMusiq.getMusicInfo( ["pl_key","user_key","pl_name"],"playlist","user_key", req.body.id, function(data){
              // need to send a response back to the calling ajax..
              // this res goes back to the ajax call in the main.handler..
              var userInfo= {
                userId : data
              }
              //console.log(" from mymusiq_controller as the response " + JSON.stringify(data));
              res.status(200).json(userInfo);
              //res.json(result)
            })
      });
    
      router.post("/api/getSongs", function(req, res) {
        //--------------------------------------------
        // inserts the data for the playlist
        // 1. inserts inoto user_key , pl_key and song_name fields
        //--------------------------------------------
        // insertOne: function(table, fields, val,cb) {
          console.log("from line 166 in mymusic_controllers " + req.body.plId);
          console.log("from line 167 in mymusic_controllers " + req.body.id);
          
          myMusiq.getSongInfo( ["ps_key","pl_key","user_key","song_name","song_url"],"playlist_songs","pl_key", req.body.plId, "user_key", req.body.id, function(data){
            
            var userInfo= {
              userId : data
            }
            //console.log(" from mymusiq_controller as the response " + JSON.stringify(data));
            res.status(200).json(userInfo);
            //res.json(result)
          })    
        });
  

// Export routes for server.js to use.
module.exports = router;
