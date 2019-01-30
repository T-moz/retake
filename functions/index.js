// here is our backend
// it's a node environment
// But the most of our function can be executed in the front end with angular


const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// we save the user in the database when he is created

exports.whenUserCreat = functions.auth.user().onCreate((user) => {
// whene a user is created it trigger a function
  const email = user.email;
  const userid = user.uid;

  admin.database().ref('users/' + userid).set({
    email: email,
    userid: userid,
    type: 'a'
  });

});

