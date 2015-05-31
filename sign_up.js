$(function () {

    Parse.$ = jQuery;

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("Vd7HXeGIvM7lVyprQW06Y0JgdiZaE0cBkTDPAZKc", "YJ9fe5hYgEnLltlqk0ZtE2PC0oTNKAvcCklLT1Qk");

    //   var TestObject = Parse.Object.extend("TestObject");
    //    var testObject = new TestObject();
    //    testObject.save({
    //        foo: "bar"
    //    }).then(function (object) {
    //alert("Successfully Connected To Parse");
    //    });
});


function sign_up() {

    // Setup the user variables
    var email = document.getElementById("inputEmail").value;
    var confirm_password = document.getElementById("comfirmPassword").value;
    var password = document.getElementById("inputPassword").value;
    var starting_weight = parseFloat(document.getElementById("startingWeight").value);

    // Calculate the current day of the week for the first starting point of the user graph
    var date = new Date();
    var day = date.getDay();
    var day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];

    // Log the user out to prevent any session token mishaps.
    Parse.User.logOut();

    // Check to see if the user entered a number in the weight field, if the entry is not a number, warn the user and reject the signup.
    if (isNaN(starting_weight)) {
        alert("Error: The entered weight is not a number, try again.")

    } else

    {
        // CHeck to see if the password and the confirm match. If so let Parse run. Parse will automatically check if the 
        // user email is taken or an invalid email is entered.
        if (password === confirm_password) {

            // Prevent the webpage from unloading.
            event.preventDefault();

            var user = new Parse.User();
            user.set("username", email);
            user.set("email", email);
            user.set("password", password);

            user.signUp(null, {
                success: function (user) {
                    // Submit the form if successful.
                    var GameScore = Parse.Object.extend("Weight");
                    var gameScore = new GameScore();
                    gameScore.set("weights", [starting_weight]);
                    gameScore.set("scale", [day_of_week]);
                    gameScore.set("user", email);
                    gameScore.save(null, {
                        success: function (gameScore) {
                            // Execute any logic that should take place after the object is saved.
                            window.location.href = "index.html";
                            form.submit
                        },
                        error: function (gameScore, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    });
                    // Hooray! Let them use the app now.
                },
                error: function (user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        } else {
            alert("Error: It appears your passwords don't match. Try again.")

        }
    }
}