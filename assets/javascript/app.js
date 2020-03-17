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
var trainTime = "";
var trainFirstTimeArray = [];

// Capture "Submit" button click
$("#add-train-submit").on("click", function () {

  // Store user input
  trainName = $("#train-name").val().trim();
  trainDestination = $("#destination").val().trim();
  trainFrequency = $("#frequency").val().trim();
  trainTime = $("#first-train").val().trim();

console.log(trainDestination);

  // Push to database
  database.ref().push({

    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    time: trainTime

  });
});

// Firebase watcher + initial loader
database.ref().on("child_added", function (childSnapshot) {

  // console.log(childSnapshot.val().name);
  // console.log(childSnapshot.val().destination);
  // console.log(childSnapshot.val().frequency);

var tFrequency = childSnapshot.val().frequency;
  var time = childSnapshot.val().time;
  console.log(time + "   -----trainTime");

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  nextTrainTime = moment(nextTrain).format("hh:mm");

  // Here we append the new train's information to the list
  $("#train-list").append("<tr><td class='name'>" +
    childSnapshot.val().name +
    " </td><td class='destination'> " + childSnapshot.val().destination +
    " </td><td class='frequency'> " + childSnapshot.val().frequency +
    " </td><td class='next-arrival'> " + nextTrainTime +
    " </td><td class='minutes-away'> " + tMinutesTillTrain +
    " </td></tr>");

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
