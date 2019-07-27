//Intialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCfkKBPwijIqXm2dmd88boMO35IFtbk_FA",
    authDomain: "my-project-a057a.firebaseapp.com",
    databaseURL: "https://my-project-a057a.firebaseio.com",
    projectId: "my-project-a057a",
    storageBucket: "",
    messagingSenderId: "409271990254",
    appId: "1:409271990254:web:ae86d4d97681bbc5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Create a variable to reference the database
var database = firebase.database();

//Initial Values
var trainname = "";
var destination = "";
var firsttime = "";
var frequency = "";

// Submit Button Click
$("#addtrains").on("click", function(event){
	event.preventDefault(); 
	
	// Code in the logic for storing and retrieving the most recent trains.
	trainname = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firsttime = $("#firsttrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();


    // console.log("Train name: " + trainname);
    // console.log("Destination: " + destination);
    // console.log("First time: " + firsttime);
    // console.log("Frequency: " + frequency);

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firsttrain-input").val("");
	$("#frequency-input").val("");

	database.ref().push({
		trainname: trainname,
		destination: destination,
		firsttime: firsttime,
		frequency: frequency
	});


});

// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainname = childSnapshot.val().trainname;
      destination = childSnapshot.val().destination
      firsttime = childSnapshot.val().firsttime;
      frequency = childSnapshot.val().frequency;


      var firsttimeMoment = moment(firsttime, "HH:mm");
      // console.log("TIME CONVERTED: " + firsttimeMoment);
      
      // It is Now - moment
      var currenttime = moment();
      // console.log("Now TIME: " + currenttime);

      var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
      var minuteLast = minuteArrival % frequency;
      var awayTrain = frequency - minuteLast;

      // console.log("Minutes: " + minuteArrival);
      // console.log("Minutes Last: " + minuteLast);
      // console.log("Away Train: " + awayTrain);

      var nextArrival = currenttime.add(awayTrain, 'minutes');
      var arrivaltime = nextArrival.format("HH:mm");
      // console.log("Away Arrival: " + nextArrival);
      // console.log("Arrival Time: " + arrivaltime);

      
    // full list of items to the well
	$("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });