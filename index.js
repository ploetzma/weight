var userWeights = [0];
var userScale = [];
var userObjectID = "";
var userGraph = "";
var userWeightUnits = "";

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function logout()

{
    Parse.User.logOut();
    alert("Successfully logged out");
    window.location.href = "login.html";
}

function submit_new_weight()

{
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();

    var day_of_week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][day];

    var weight = document.getElementById("todayWeight").value;
    if (isNaN(weight)) {
        alert("That was not a number, try again.");
    } else {
        event.preventDefault();
        var GameScore = Parse.Object.extend("Weight");
        var query = new Parse.Query(GameScore);
        query.get(userObjectID, {
            success: function (gameScore) {

                if (gameScore.get("day") === Number(day) && gameScore.get("month") === Number(month) && gameScore.get("year") === Number(year))

                {
                    var weights_array = gameScore.get("weights");
                    weights_array[weights_array.length - 1] = weight;
                    gameScore.set("weights", weights_array);

                } else

                {
                    gameScore.add("weights", weight);
                    gameScore.add("scale", day_of_week);
                    gameScore.set("day", Number(day));
                    gameScore.set("month", Number(month));
                    gameScore.set("year", Number(year));
                }
                gameScore.save();
                location.reload();
                // The object was retrieved successfully.
            },
            error: function (object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        });
    }
}

function get_user_data()

{
    {
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
            // alert("user is logged in");
            // do stuff with the user

            var GameScore = Parse.Object.extend("Weight");
            var query = new Parse.Query(GameScore);
            query.equalTo("user", currentUser.get("username"));
            query.find({
                success: function (results) {
                    // Do something with the returned Parse.Object values
                    for (var i = 0; i < 1; i++) {
                        var object = results[i];
                        userWeights = object.get('weights');
                        userScale = object.get('scale');
                        userObjectID = object.id;
                        userGraph = object.get('graph');
                    }
                },
                error: function (error) {
                    window.location.href = "login.html";
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        } else {
            window.location.href = "login.html";
        }
    }
}

function display_graph() {
    if (userGraph === "bar") {
        display_bar_graph();
    } else if (userGraph === "line") {
        display_line_graph();
    }
}

function change_graph(graph)

{
    event.preventDefault();
    var GameScore = Parse.Object.extend("Weight");
    var query = new Parse.Query(GameScore);
    query.get(userObjectID, {
        success: function (gameScore) {

            gameScore.set("graph", graph);
            gameScore.save();
            location.reload();
            // The object was retrieved successfully.
        },
        error: function (object, error) {
            alert("object error")
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
        }
    });

}

function display_bar_graph() {

    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };
    //window.alert(data_array);
    var barChartData = {
        labels: userScale,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: userWeights
   }]
    }

    window.onload = function () {
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive: true
        });

        myBarChart.update();
    }
};

function display_line_graph() {

    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };
    var lineChartData = {
        labels: userScale,
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(180,180,180,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: calculate_average()
    },
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: userWeights
    }
   ]
    }

    window.onload = function () {
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true
        });
    }

};

// Change the scale of the graph.
function change_scale() {
    event.preventDefault();

    var GameScore = Parse.Object.extend("Weight");
    var query = new Parse.Query(GameScore);
    var new_weights = [];

    query.get(userObjectID, {
        success: function (gameScore) {
            if (gameScore.get('units') === "lbs") {
                for (i = 0; i < userWeights.length; i++) {
                    new_weights.push(Number(userWeights[i] / 2.2046).toFixed(2));
                }
                userWeightUnits = "kg";
                gameScore.set("units", userWeightUnits);

            } else {
                for (i = 0; i < userWeights.length; i++) {
                    new_weights.push(Number(userWeights[i] * 2.2046).toFixed(2));
                }
                userWeightUnits = "lbs";

                gameScore.set("units", userWeightUnits);

            }
            gameScore.set("weights", new_weights);
            gameScore.save();
            location.reload();
            // The object was retrieved successfully.
        },
        error: function (object, error) {
            alert("object error")
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
        }
    });
}

function calculate_average() {
    sum = 0;
    length = userWeights.length;
    for (var i = 0; i < length; i++) {
        sum = sum + Number(userWeights[i]);
    }
    document.getElementById("average").innerHTML = 'your average weight ' + (sum / length) + ' ' + userWeightUnits;

    var average_array = [];

    for (var i = 0; i < length; i++) {
        average_array.push(sum / length);
    }
    return (average_array);
}