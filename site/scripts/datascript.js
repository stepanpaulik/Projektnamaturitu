var SteamID;
var data_json1;
$( document ).ready(function() {
    SteamID = $.urlParam('SteamID');
    parseData_json();
});


function parseData_json() {
    $.getJSON( '/steam/stats/' + SteamID, function(data_json) {
        
        var deathratio = (search("total_kills", data_json) / search("total_deaths", data_json)).toFixed(2);
        $('#killdeathratio_inner').html('<h3 id="killdeathratio_number">' + deathratio + '</h3>')
        
        var accuracy = (search("total_shots_hit", data_json) * 100 / search("total_shots_fired", data_json)).toFixed(1);
        $('#accuracy').html('<h2>Accuracy</h2><h1>' + accuracy + '%</h1>')
        
        $('#totalkills').html('<h2>Total Kills</h2><h1>' + search("total_kills", data_json) + '</h1>');
        
        $('#headshot').html('<h2>Headshots</h2><h1>' + search("total_kills_headshot", data_json) + '</h1>');
        
        var timeplayed = (search("total_time_played", data_json) / 3600).toFixed(0);
        $('#timeplayed').html('<h2>Time Played</h2><h1>' + timeplayed + 'h</h1>');
        
        var winrate = (search("total_matches_wons", data_json) * 100 / search("total_matches_played", data_json)).toFixed(1);
        $('#winrate').html('<h2>Winrate</h2><h1>' + winrate + '%</h1>');

        var totkd = (search("total_kills", data_json) * 100)/(search("total_kills", data_json) + search("total_deaths", data_json));
        $('#killdeathratio_inner').css({width: totkd+"%"})
        
        console.log(data_json);
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
function search(val, json){
        for(var i = 0; i<=json.playerstats.stats.length; i++){
            if(val === undefined || val === null){
                return 0;
            }else if(val == json.playerstats.stats[i].name){
                return json.playerstats.stats[i].value;
            }
        }
        return 0;
}