function check_weekends(weights, scale, average) {
    var diffs = [];
    for (var i = 0; i < weights.length; i++) {
        diffs[i] = weights[i] - average;
    }
    for (var i = 0; i < diffs.length; i++)
        {
            if (diffs[i] > 0){
              //  alert(diffs[i])
            }
        }
}