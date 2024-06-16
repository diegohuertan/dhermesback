const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyA1JELCRHVtZdsNSDImfBwILWSt-c_qtBE",
  authDomain: "dhermes.firebaseapp.com",
  projectId: "dhermes",
  storageBucket: "dhermes.appspot.com",
  messagingSenderId: "986796665030",
  appId: "1:986796665030:web:3ba596ebf66b472dd6cfc7"
};

const app = initializeApp(firebaseConfig);

module.exports = app;