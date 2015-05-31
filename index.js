var userWeights = [];

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

    var currentUser = Parse.User.current();
    if (currentUser) {
        alert("user is logged in");
        // do stuff with the user

        var GameScore = Parse.Object.extend("Weight");
        var query = new Parse.Query(GameScore);
        query.equalTo("user", currentUser.get("username"));
        query.find({
            success: function (results) {
                alert("Successfully retrieved " + results.length + " scores.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < 1; i++) {
                    var object = results[i];
                    userWeights = object.get('weights');
                    document.getElementById("test").innerHTML = userWeights;

                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    } else {
        // show the signup or login page
    }
});