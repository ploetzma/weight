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

function login() {
    Parse.User.logIn(document.getElementById("inputEmail").value, document.getElementById("inputPassword").value, {
        success: function (user) {
            alert("success");
            window.location.href = "index.html";
            // Do stuff after successful login.
        },
        error: function (user, error) {
            // The login failed. Check error to see why.
            alert("fail");

        }
    });
}