/* globals $ firebase */

var userData = firebase.database().ref("users/"+UserID);

  userData.update({

        name : $("#name").val(),
        age : $("#age").val(),
        languages : $("#language").val()
    }  
      
      
  );  
