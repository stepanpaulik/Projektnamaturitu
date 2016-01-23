var SteamID;
var data_json1;
$( document ).ready(function() {
    SteamID = $.urlParam('SteamID');
    parseData_json();
});


function parseData_json() {
    $.getJSON( '/steam/stats/' + SteamID, function(data_json) {
        
        console.log(data_json.playerstats.stats)
        
        var deathratio = (data_json.playerstats.stats[0].value / data_json.playerstats.stats[1].value).toFixed(2);
        $('#killdeathratio_inner').html('<h3 id="killdeathratio_number">' + deathratio + '</h3>')
        
        var accuracy = (data_json.playerstats.stats[44].value * 100 / data_json.playerstats.stats[45].value).toFixed(1);
        $('#accuracy').html('<h2>Accuracy</h2><h1>' + accuracy + '%</h1>')
        
        $('#totalkills').html('<h2>Total Kills</h2><h1>' + data_json.playerstats.stats[0].value + '</h1>');
        
        $('#headshot').html('<h2>Headshots</h2><h1>' + data_json.playerstats.stats[24].value + '</h1>');
        
        var timeplayed = (data_json.playerstats.stats[2].value / 3600).toFixed(0);
        $('#timeplayed').html('<h2>Time Played</h2><h1>' + timeplayed + 'h</h1>');
        
        var winrate = (data_json.playerstats.stats[118].value * 100 / data_json.playerstats.stats[119].value).toFixed(1);
        $('#winrate').html('<h2>Winrate</h2><h1>' + winrate + '%</h1>');

        var totkd = (data_json.playerstats.stats[0].value * 100)/(data_json.playerstats.stats[0].value + data_json.playerstats.stats[1].value);
        $('#killdeathratio_inner').css({width: totkd+"%"})
     });
};


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}