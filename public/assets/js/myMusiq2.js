// Make sure we wait to attach our handlers until the DOM is fully loaded.

var musiqUser = "";
var musiqUserId = "";
var newPlayList = "";
var newSong = "";
var usrLoggedIn = false;
var holdPlayList = [];
var holdSongs = [];

$(function () {
    // adds new user
    //------------------------------
    // tied to #tstNewUser on line 52 in index.handlebars
    //------------------------------
    $("#tstNewUser").on("click", function () {
        event.preventDefault();

        // adding captured  parametes for emial and pswd
        // for the musiqUser json  
        musiqUser = {
            email: $("#newEmail").val().trim(),
            fName: $("#newFname").val().trim(),
            lName: $("#newLname").val().trim(),
            pswd: $("#newPswd").val().trim()
        }

        //alert(tstVar1.user)

        $.ajax("/api/addNewUser", {

            type: "POST",
            data: musiqUser
        }).then(function (result) {
            returnedId = JSON.stringify(result);
            $("#newUsrEmail").html(result.email);
            $("#newFrstName").html(result.fName);
            $("#newLastName").html(result.lName);
            $("#newUsrId").html(result.insertId);
        }); //end.then
    });


    $("#tstBtn").on("click", function () {
        $.get("/playlist/", function (req, res) {


        })
    })
    // gets user ID based upon email an pswd
    //------------------------------
    // tied to #tstUser on line 59 in index.handlebars
    //------------------------------

    $("#tstUser").on("click", function () {
        event.preventDefault();

        // adding captured  parametes for emial and pswd
        // for the musiqUser json  
        musiqUser = {
            user: $("#email").val().trim(),
            pswd: $("#pswd").val().trim()
        }

        $.ajax("/api/getUserId", {

            type: "POST",
            data: musiqUser
        }).then(function (result) {
                returnedId = JSON.stringify(result);
                // sets logged In INd = Y  
                usrLoggedIn = true;

                $("#usrEmail").html(result.userId[0].email);
                $("#usrId").html(result.userId[0].user_key);

                if (usrLoggedIn) {
                    getPlayList(result.userId[0].user_key);
                } // end  if

                if (usrLoggedIn) {
                    getSongs(result.userId[0].user_key);
                } // end  if


            } // end then.
        ); //end.then
    });

    function getPlayList(usrId) {
        //-------------------------------------------
        // getting playlist if signed in successfully
        //-------------------------------------------
        musiqUsrId = {
            id: usrId
        }
        alert(" from getPlayLisst " + JSON.stringify(musiqUsrId));
        $.ajax("/api/getPlayLists", {
            type: "POST",
            data: musiqUsrId

        }).then(function (result) {
            //console.log(" from play list  " + JSON.stringify(result));
            holdPlayList.length = 0;
            for (var key in result.userId) {
                holdPlayList.push(result.userId[key]);
            }
            console.log(" playlists " + JSON.stringify(holdPlayList));
        }) //end then
    } // end  getPlayList

    function getSongs(usrId) {
        //-------------------------------------------
        // getting songs
        //-------------------------------------------
        musiqUsrId = {
            id: usrId
        }
        $.ajax("/api/getSongs", {
            type: "POST",
            data: musiqUsrId

        }).then(function (result) {

            holdSongs.length = 0;

            for (var key in result.userId) {
                holdSongs.push(result.userId[key]);
            }
            console.log("songs " + JSON.stringify(holdSongs));

        }) //end then
    } // end getSongs


    // adds playlist to table based upon the user key 
    //------------------------------
    // tied to #tstPlalyList on line 65 in index.handlebars
    //------------------------------

    $("#tstPlayList").on("click", function () {
        event.preventDefault();

        // adding captured  parametes for emial and pswd
        // for the musiqUser json  
        newPlayList = {
            userID: $("#usrId").html(),
            pl_name: $("#playList").val().trim()
        }

        $.ajax("/api/addPlaylist", {

            type: "POST",
            data: newPlayList
        }).then(function (result) {
                console.log(" from add play list " + JSON.stringify(result));
                $("#plId").html(result.insertId);
                $("#plName").html(result.pl_name);

                // getting playlist after an insert of the playlist.
                if (result.insertId > 0) {
                    //      getPlayList($("#usrId").html());
                    getPlayList(newPlayList.userID);
                }
            } // end then/function.
        ); //end.then
    });

    // adds song to the playlist
    //------------------------------
    // tied to #tstSong on line 70 in index.handlebars
    //------------------------------

    $("#tstSong").on("click", function () {
        event.preventDefault();

        // adding captured  parametes for emial and pswd
        // for the musiqUser json  
        newSong = {
            userID: $("#usrId").html(),
            plId: $("#plId").html(),
            songName: $("#song").val().trim(),
            songURL: $("#songAddress").val().trim()
        }

        $.ajax("/api/addSong", {

            type: "POST",
            data: newSong
        }).then(function (result) {
                console.log(" from add play list " + JSON.stringify(result));
                $("#songId").html(result.insertId);
                $("#songName").html(result.song_name);
                $("#songURL").html(result.song_url)

                // getting the playlists and songs after an insert of the songs
                if (result.insertId > 0) {
                    // getPlayList($("#usrId").html());

                    // getSongs($("#usrId").html());
                    getPlayList(newSong.userID);

                    getSongs(newSong.userID);
                }
            } // end then/function
        ); //end.then
    }); /// end #tstSong

}); // end fcn


function youtube() {
    var player, currentVideoId = 0;
    
        function onYouTubeIframeAPIReady() {
            player = new YT.Player(document.getElementById('player'), {
                height: '350',
                width: '425',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
        
        function onPlayerReady(event) {
            event.target.loadVideoById(playSongArray[currentVideoId]);
        }
    
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                currentVideoId++;
                if (currentVideoId < playSongArray.length) {
                    player.loadVideoById(playSongArray[currentVideoId]);
                }
            }
        }
      };