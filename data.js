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


 function getusersfortag(tagmap, tagkey) {
     var tagList = Object.keys(tagmap);

     return tagList.map(function (tag) {
         var userIdinlg = firebase.database().ref("tag/" + tagkey + "/" + tag);

         return userIdinlg.once("value")


     });
 }

 function matchusers() {
     var userID = firebase.auth().currentUser.uid;
     var user = firebase.database().ref("users/" + userID)

     user.once("value").then(function (snapshot) {

         var languagesP = getusersfortag(snapshot.val().languages, "languages")
         var hobbiesP = getusersfortag(snapshot.val().hobbies, "hobbies")
         var allP = languagesP.concat(hobbiesP)
         Promise.all(allP).then(function (snapshots) {
             var userIdsList = snapshots.map((snapshot) => snapshot.val())
             var alluserIDmap = userIdsList.reduce(function (res, userids) {
                 Object.keys(userids).forEach(function (userid) {
                     res[userid] = true
                 })


                 return res;
             }, {})

             var allUserIdlist = Object.keys(alluserIDmap).filter(function (listuserid) {
                 if (userID == listuserid) {
                     return false
                 } else {
                     return true
                 }
             })
             console.log(allUserIdlist)

         });
     });

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
