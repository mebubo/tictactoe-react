const firebase = require('firebase');
const {login, logout} = require('./auth.js')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7CHMJC4RlbI8MNaplwb5_D3mUuBXo07s",
  authDomain: "tictactoe-c2dbd.firebaseapp.com",
  databaseURL: "https://tictactoe-c2dbd.firebaseio.com",
  storageBucket: "tictactoe-c2dbd.appspot.com",
  messagingSenderId: "664947495401"
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const database = firebase.database();

function loginWith(providerName = 'google') {
  switch (providerName) {
    case 'google':
      return _loginWith(new firebase.auth.GoogleAuthProvider());
    case 'github':
      return _loginWith(new firebase.auth.GithubAuthProvider());
    default:
      console.error('unknown provider name', providerName);
  }
}

function _loginWith(provider) {
  return firebaseAuth.signInWithPopup(provider).then(function (result) {
    var user = result.user;
    return getUserState(user.uid);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("signInWithPopup", errorCode, errorMessage);
  });
}

const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', e => {
  firebaseAuth.signOut().then(function () {
    // Sign-out successful.
    console.log('signout is successful');
  }, function (error) {
    // An error happened.
    console.log('logout error', error);
  });
})


function writeUserState(state) {
  const userId = firebaseAuth.currentUser.uid;
  database.ref('users/' + userId).set({
    state: state
  });
}

function getUserState(userId) {
  return database.ref('/users/' + userId).once('value').then(function (snapshot) {
    return snapshot.val().state;
  });
}

function initAuth(dispatch) {
  const userId = firebaseAuth;
  const state = getUserState(userId.uid);
  dispatch({ type: 'RECEIVE_STATE', payload: state });
}

module.exports = { writeUserState, loginWith, initAuth, firebaseAuth }

