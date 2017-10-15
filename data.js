 var config = {
     apiKey: "AIzaSyA4OQPBpDxmIdSYWChKc8Q3ZjoRdyUiwvQ",
     authDomain: "virtual-me-ee71d.firebaseapp.com",
     databaseURL: "https://virtual-me-ee71d.firebaseio.com",
     projectId: "virtual-me-ee71d",
     storageBucket: "virtual-me-ee71d.appspot.com",
     messagingSenderId: "1053982035282"
 };
 firebase.initializeApp(config);

 firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         // User is signed in.
     } else {
         // No user is signed in.
     }
 });




 function loginSubmit(form) {
     firebase.auth().signInWithEmailAndPassword(form.email.value, form.psw.value).catch(function (error) {
         var errorCode = error.code;
         var errorMessage = error.message;


     });
     return false;

 }


 function matchlanguages() {
     var language = "german"
     var userId = firebase.database().ref("tag/languages/" + language);
     userId.once("value").then(function (snapshot) {
         var languageMap = snapshot.val();
         var languageList = Object.keys(languageMap);
         var usersP = languageList.map(function (userId) {
             var userP = firebase.database().ref("users/" + userId).once("value");
             return userP;

         })
         Promise.all(usersP).then(function (users) {
             users = users.map((snapshot) => snapshot.val())
             console.log(users); // maybe needs fixing ?!?!
         });


     });
 }



 function matchHobby() {
     hobby = "coding"
     var userIdH = firebase.database().ref("tag/hobbys/" + hobby);
     userIdh.once("value").then(function (snapshot) {
         var hobbyMap = snapshot.val();
         var hobbyList = Object.keys(hobbyMap);
         var userP = hobbyList.map(function (userIdH) {
             var userP = firebase.database().ref("user/" + userIdH).once("value");
             return userP;
         })
         Promise.all(usersP).then(function (users) {
             users = users.map((snapshot) => snapshot.val())
             console.log(users); // maybe needs fixing ?!?!
         });

     })
 }



 function createNewUser(form) {
     try {

         firebase.auth().createUserWithEmailAndPassword(form.email.value, form.psw.value).catch(function (error) {
             var errorCode = error.code;
             var errorMessage = error.message;
         });
     } catch (e) {
         console.log(e)
     }
     return false;
 }




 function submitUserData(form) {
     try {

         var userID = firebase.auth().currentUser.uid;
         var userData = firebase.database().ref("users/" + userID);
         var hobbies = $(form.hobbies).tagsinput("items");
         var languages = $(form.languages).tagsinput("items");
         var lg = languages.reduce(function (res, item) {
             res[item] = true;
             return res;

         }, {});
         var hb = hobbies.reduce(function (res, item) {
             res[item] = true;
             return res;

         }, {});

         /* var hbT = hobbies.reduce(function(res, item){
                return res;
                
            }, {}); */
         firebase.database().ref("users/" + userID + "/hobbies").on("child_added", function (hbadded) {
             var userData = firebase.database().ref("tag/hobbies/" + hbadded.key + "/" + userID).set(true);
         });
         firebase.database().ref("users/" + userID + "/languages").on("child_added", function (ladded) {
             var userData = firebase.database().ref("tag/languages/" + ladded.key + "/" + userID).set(true);
         });
         firebase.database().ref("users/" + userID + "/hobbies").on("child_removed", function (hbremoved) {
             var userData = firebase.database().ref("tag/hobbies/" + hbremoved.key + "/" + userID).set(true);
         });
         firebase.database().ref("users/" + userID + "/languages").on("child_removed", function (lremoved) {
             var userData = firebase.database().ref("tag/languages/" + lremoved.key + "/" + userID).set(true);
         });
         userData.update({
                 name: form.uname.value,
                 age: form.age.value,
                 languages: lg,
                 hobbies: hb


             }


         );
     } catch (e) {
         console.log(e)
     }

     return false;
 }




 firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         // User is signed in.
         document.getElementById('home').style.display = 'block'
         document.getElementById('signinpage').style.display = 'none'
     } else {
         // No user is signed in.
         document.getElementById('home').style.display = 'none'
         document.getElementById('signinpage').style.display = 'block'
     }
 });

 function showMenu() {
     document.getElementById("menu").classList.toggle("show");
 }

 window.onclick = function (event) {
     if (!event.target.matches('.dropbtn')) {

         var dropdowns = document.getElementsByClassName("dropdown-content");
         var i;
         for (i = 0; i < dropdowns.length; i++) {
             var openDropdown = dropdowns[i];
             if (openDropdown.classList.contains('show')) {
                 openDropdown.classList.remove('show');
             }
         }
     }
 }


 function logout() {
     firebase.auth().signOut().then(function () {
         // Sign-out successful.
     }).catch(function (error) {
         // An error happened.
     });
     return false;
 }

 function profile() {
     var userID = firebase.auth().currentUser.uid;
     var name = firebase.database().ref("users/" + userID)

     name.once("value").then(function (snapshot) {
         var user = snapshot.val();
         var name = user.name;

         var age = user.age;

         var languages = Object.keys(user.languages).join(",");
         document.write(age);
         document.write(name);
         document.write(languages);
         document.write();
     })
 }

 function profileEdit() {

    document.getElementById("profileEdit").style.display = 'none'; 
     document.getElementById("editProfileButton").addEventListener("click", function () {
         document.getElementById('home').style.display = 'none';
         document.getElementById("Profile") = "block";
     })
 }
/*
var currentSeite = home;
var seiten = [profileEdit, home, signinpage]
seiten.forEach(function(seite){
    
    if(currentSeite==seite) {
        seite.style.display="block";
    }
    else{
        seite.style.display="none";
    }
})
*/

function showMenu() {
    document.getElementById("menu").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}