/* globals $ firebase */
var userId = firebase.auth().currentUser.uid;

var userData = firebase.database().ref("users/"+userID);

  userData.update({

        name : $("#name").val(),
        age : $("#age").val(),
        languages : $("#language").val()
    }  
      
      
  );  
