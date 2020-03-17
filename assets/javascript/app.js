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

  time = childSnapshot.val().time
  console.log(time + "   -----time")

var trainFirstTimeConverted = moment.unix(time).format("H:mm");
console.log(trainFirstTimeConverted);
console.log("------- ^trainFirstTimeConverted------------")

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    var tRemainder = moment().diff(moment.unix(trainFirstTimeConverted)) % trainFrequency;
    var tMinutes = trainFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var nextArrival = moment().add(tMinutes).format("HH:mm");
    console.log(nextArrival);
    console.log("------- ^nextArrival------------")




  // Here we append the new train's information to the list
  $("#train-list").append("<tr><td class='name'>" +
    childSnapshot.val().name +
    " </td><td class='destination'> " + childSnapshot.val().destination +
    " </td><td class='frequency'> " + childSnapshot.val().frequency +
    " </td><td class='next-arrival'> " + nextArrival +
    " </td></tr>");

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});