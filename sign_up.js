// Login js package.

//Gloabl variable of the weights of the user.
var weight = [];


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

    var password = document.getElementById("inputPassword").value;
    var confirm_password = document.getElementById("comfirmPassword").value;
    var email = document.getElementById("inputEmail").value;
    Parse.User.logOut();

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
                gameScore.set("weights", []);
                gameScore.set("user", email);
                gameScore.save(null, {
                    success: function (gameScore) {
                        // Execute any logic that should take place after the object is saved.
                        alert("New account created!");
                        form.submit
                        window.location.href = "index.html";
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