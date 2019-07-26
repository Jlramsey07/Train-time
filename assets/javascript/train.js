
        $(document).ready(function () {
            console.log("ready!");
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
            // Create a variable to reference the database
            var database = firebase.database();
// pulling the data from the database
            database.ref().on("child_added", function (snapshot) {
                var id = snapshot.val()
                console.log(id);
                //Putting data from the database into variables
                var name = id.name;
                var role = id.role;
                var frequency = id.frequency;
                var firstTime = id.firstTime;
                // putting the variabeles in the DOM
                var tBody = $(".table");
                var tRow = $("<tr>");
                var empName = $("<th>").text(name);
                var roleDisplay = $("<th>").text(role);
                var firstTimeDisplay = $("<th>").text(firstTime);
                var monthWorked = $("<th>").text("TBD");
                var monthtlyRateDisplay = $("<th>").text(frequency);
                var totalBilled = $("<th>").text("TBD");
                // Append the newly created table data to the table row
                tRow.append(empName, roleDisplay, firstTimeDisplay, monthWorked, monthtlyRateDisplay, totalBilled);
                // Append the table row to the table body
                tBody.append(tRow);
            });
            $("#submit").on("click", function (event) {
                event.preventDefault();
                var TrainName = $("#name").val().trim();
                var role = $("#role").val().trim();
                var firstTime = $("#start").val().trim();
                var frequency = $("#rate").val().trim();
    // empties the form after you hit the submit button //
                $('input').val("");
                console.log(TrainName),
                    console.log(role),
                    console.log(firstTime),
                    console.log(frequency),
                    database.ref().push({
                        name: TrainName,
                        role: role,
                        firstTime: firstTime,
                        frequency: frequency,
                    });
            });



            // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
  
        trainName = childSnapshot.val().trainname;
        role = childSnapshot.val().role
        firstTime = childSnapshot.val().firstTime;
        frequency = childSnapshot.val().frequency;
  
  
        var firstTimeMoment = moment(firstTime, "HH:mm");
        // console.log("TIME CONVERTED: " + firstTimeMoment);
        
        // It is Now - moment
        var currenttime = moment();
        // console.log("Now TIME: " + currenttime);
  
        var minuteArrival = currenttime.diff(firstTimeMoment, 'minutes');
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
      $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + role + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");
  
      // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
        });
    