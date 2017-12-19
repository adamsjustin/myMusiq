// Make sure we wait to attach our handlers until the DOM is fully loaded.

var musiqUser = "";
var musiqUserId = "";
var newPlayList = "";
var newSong = "";
var usrLoggedIn = false;

$(function () {
  // adds new user
  //------------------------------
  // tied to #addNewUser on line 52 in index.handlebars
  //------------------------------
  $("#addNewUser").on("click", function () {
    event.preventDefault();
    
    // adding captured  parametes for emial and pswd
    // for the musiqUser json  
    musiqUser = {
      email: $("#newEmail").val().trim(),
      fName: $("#newFname").val().trim(),
      lName: $("#newLname").val().trim(),
      pswd: $("#newPswd").val().trim()
    }

    $.ajax("/api/addNewUser", {

      type: "POST",
      data: musiqUser
    }).then(function (result) {
      returnedId = JSON.stringify(result);
      // $("#newUsrEmail").html(result.email);
      // $("#newFrstName").html(result.fName);
      // $("#newLastName").html(result.lName);
      // $("#newUsrId").html(result.insertId);

      $("#userId").val(result.insertId);
      // clearing out entry boxes..
    $("#newFname").val("");
    $("#newLname").val("");
    $("#newEmail").val("");
    $("#newPswd").val("");       
      // display msssg about loading mssg
      $("#newUserResult").html("Success!! '" + result.fName + " " + result.lName + "' Has been added")
      usrLoggedIn = true;
  
    }); //end.then
  });

  $("#tstBtn").on("click", function () {

    $.get("/playlist/", function (req, res) {

      console.log(usrLoggedIn + ' pl ' + holdPlayList + ' song ' + holdSongs)

    })
  })
  // gets user ID based upon email an pswd
  //------------------------------
  // tied to #tstUser on line 59 in index.handlebars
  //------------------------------

  $("#tstUser").on("click",userTest);

  function userTest() {
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
        // $("#usrEmail").html(result.userId[0].email);
        // $("#usrId").html(result.userId[0].user_key);
        
         if (usrLoggedIn) {
           getPlayList(result.userId[0].user_key);
           // not getting songs because need playlist key for the songs
//           getSongs(result.userId[0].user_key);
          } // end  if


        $("#overlay").slideUp(1500);
        $('.modal').slideUp(1500);
    
        $("#userId").val(result.userId[0].user_key);
        

      } // end then.
    ); //end.then
  };

  
  // adds playlist to table based upon the user key 
  //------------------------------
  // tied to #tstPlalyList on line 65 in index.handlebars
  //------------------------------

  $("#addPlayList").on("click", function () {

    event.preventDefault();
    // adding captured  parametes for emial and pswd
    // for the musiqUser json  
    newPlayList = {
      userId: $("#userId").val().trim(),
      pl_name: $("#playList").val().trim()
    }

    $.ajax("/api/addPlaylist", {

      type: "POST",
      data: newPlayList
    }).then(function (result) {
      console.log(" from add play list " + JSON.stringify(result));

      $("#playListId").val(result.insertId);

      // getting playlist after an insert of the playlist.
      if (result.insertId > 0) {
        //      getPlayList($("#usrId").html());
        getPlayList(newPlayList.userId);
      }

      $("#newPlaylistResult").html("Success!! '" + $("#playList").val().trim() + "' Has been added")
      $("#playList").val("");
      

    }); //end.then
  });

  // adds song to the playlist
  //------------------------------
  // tied to #tstSong on line 70 in index.handlebars
  //------------------------------

  $("#addSong").on("click", function () {
    event.preventDefault();

    // adding captured  parametes for emial and pswd
    // for the musiqUser json  
    newSong = {
      userId: $("#userId").val().trim(),
      plId: $("#playListId").val().trim(),
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

      $("#songId").val(result.insertId);
      
      // getting the playlists and songs after an insert of the songs
      if (result.insertId > 0) {
        // getPlayList($("#usrId").html());

        // getSongs($("#usrId").html());
        getPlayList(newSong.userId);
        getSongs(newSong.userId,newSong.plId);
      }

     $("#newSongResult").html("Success!! '" + $("#song").val().trim() + "' Has been added");
     $("#song").val("");
     $("#songAddress").val("");


    }); //end.then
  });

  $('#createPlaylist').on('click', function () {
    plId   = $('#playListId').val();
    userId = $('#userId').val();
    if (userId){
      window.location.href = '/api/playlist/' + userId;
    } else {

      alert("Account User is not signed in.\nPlayer is not available until User is Signed In.");
    }
    // $.ajax("/playlist/" + userId, function(response) {
    // });
  })

  $('#createNewUser').on('click', function () {
        //userId = $('#newUsrId').text();
        window.location.href = '/api/addNewUser/';
        //$.ajax("/playlist/" + userId, function(response) {
        // });
      })
    
  $('#createSong').on('click', function () {
        userId = $('#userId').val();
        plId   = $('#playListId').val();

            //userId = $('#newUsrId').text();
            window.location.href = '/api/addNewSong/'+userId+"/"+plId;
            //$.ajax("/playlist/" + userId, function(response) {
            // });
          })     
      
  $('#home').on('click', function () {
    console.log('status: ' + usrLoggedIn);
    userId = $('#userId').val();
    if (userId){
      window.location.href = '/' + userId;
    } else {

      alert("Account User is not signed in.\nPlayer is not available until User is Signed In.");
    }
    //$.ajax("/playlist/" + userId, function(response) {
    // });

  })
    
      $('#Home').on('click', function () {
        console.log('status: ' + usrLoggedIn);
        userId = $('#userId').val();
        console.log(playSongArray);
        window.location.href = '/' + userId;
        //$.ajax("/playlist/" + userId, function(response) {
        // });
      
        
      })
}); // end fcn

function getPlayList(usrId) {
  //-------------------------------------------
  // getting playlist if signed in successfully
  //-------------------------------------------
  musiqUsrId = {

    id: usrId
  }
  $.ajax("/api/getPlayLists", {
    type: "POST",
    data: musiqUsrId

  }).then(function (result) {
    //console.log(" from play list  " + JSON.stringify(result));
    holdPlayList.length = 0;
    // showHtml = "<ul>";
            var showHtml = "";
              for (var key in result.userId) {
                holdPlayList.push(result.userId[key]);
                showHtml = showHtml + "<li value='"+result.userId[key].pl_key+"'><button class='liBtn'>"+result.userId[key].pl_name+"</button></li>";
              }
              $("#showPlayList").empty();
              $("#showPlayList").append($("<ul/>")
              .append(showHtml)
            );

  }) //end then

} // end  getPlayList
var songCntr  = 0;
function getSongs(usrId,plId) {
  //-------------------------------------------
  // getting songs
  //-------------------------------------------
  musiqUsrId = {
    id: usrId,
    plId: plId
  }
  $.ajax("/api/getSongs", {
    type: "POST",
    data: musiqUsrId

  }).then(function (result) {
   
    console.log("from line 281 in myMusiq.js/getSong " + JSON.stringify(result));
    console.log(playSongArray);
    songCntr++;
    console.log(songCntr);
    holdSongs.length = 0;
    var showSongHtml = "";
    for (var key in result.userId) {
      holdSongs.push(result.userId[key]);
      showSongHtml = showSongHtml + "<li value= " + key + " class='songLi'><button>" + result.userId[key].song_name + "</button></li>";
    }
    $("#showSongs").empty();
    $("#showSongs").append($("<ul/>")
    .append(showSongHtml)
    );

    playSongArray.length = 0;
    for(i=0; i < holdSongs.length; i++){
      playSongArray.push(JSON.stringify(holdSongs[i].song_url));
      playSongArray[i] = playSongArray[i].replace(/"/g, "");
      playSongArray[i] = playSongArray[i].replace('https://www.youtube.com/watch?v=', "");  
      }      

  }) //end then
} // end getSongs

$('#existingUser').on('click', function(){
  window.location.href = '/'
})

$('#newUser').on('click', function(){
  window.location.href = '/api/addNewUser/';
})