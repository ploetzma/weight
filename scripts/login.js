// Login js package.

// Initialize the page for parse processing.
$(function () {

    Parse.$ = jQuery;

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("Vd7HXeGIvM7lVyprQW06Y0JgdiZaE0cBkTDPAZKc", "YJ9fe5hYgEnLltlqk0ZtE2PC0oTNKAvcCklLT1Qk");

    //   var TestObject = Parse.Object.extend("TestObject");
    //    var testObject = new TestObject();
    //    testObject.save({
    //        foo: "bar"
    //    }).then(function (object) {
    //         alert("Successfully Connected To Parse");
    //    });
});

function alert_user() {

    alert("test alert");

}

function sign_up() {

    var password = document.getElementById("inputPassword").value;
    var confirm_password = document.getElementById("comfirmPassword").value;
    var email = document.getElementById("inputEmail").value;

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
                alert("Successfully signed up!")
                form.submit
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