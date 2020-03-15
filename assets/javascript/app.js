// Initialize Firebase

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAYs7CNXtw-ybwUPaGNuJue3CvEFj6PChI",
  authDomain: "train-scheduler-94644.firebaseapp.com",
  databaseURL: "https://train-scheduler-94644.firebaseio.com",
  projectId: "train-scheduler-94644",
  storageBucket: "train-scheduler-94644.appspot.com",
  messagingSenderId: "1051457723559",
  appId: "1:1051457723559:web:7c14ad5c0c231359f9cf82"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//GLOBAL VARIABLES

var trainName = "";
var trainDestination = "";
var trainFrequency = "";
var trainFirstTime = "";

// Capture "Submit" button click
$("#add-train-submit").on("click", function () {

  // Store user input
  trainName = $("#train-name").val().trim();
  trainDestination = $("#destination").val().trim();
  trainFrequency = $("#frequency").val().trim();
  trainFirstTime = $("#first-train-time").val().trim();

  // Push to database
  database.ref().push({

    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    firstTime: trainFirstTime

  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().firstTime);

  // full list of items to the well
  $("#train-list").append("<tr><td class='name'>" +
    childSnapshot.val().name +
    " </td><td class='destination'> " + childSnapshot.val().destination +
    " </td><td class='frequency'> " + childSnapshot.val().frequency +
    // " </td><td class='member-comment'> " + childSnapshot.val().firstTime +
    " </td></tr>");

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

var trainFirstTimeConverted = moment.unix(trainFirstTime).format("HH:mm");
console.log(trainFirstTimeConverted);

  // var nextArrival = moment().diff(moment(trainFirstTimeConverted));
