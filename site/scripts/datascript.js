var SteamID;
var data_json1;
var weapon_switch = true;
var weaponsList = [
    "total_kills_knife",
    "total_kills_hegrenade",
    "total_kills_glock",
    "total_kills_deagle",
    "total_kills_elite",
    "total_kills_fiveseven",
    "total_kills_xm1014",
    "total_kills_mac10",
    "total_kills_p90",
    "total_kills_awp",
    "total_kills_ak47",
    "total_kills_aug",
    "total_kills_famas",
    "total_kills_g3sg1",
    "total_kills_m249",
    "total_kills_m4a1",
    "total_kills_hkp2000",
    "total_kills_p250",
    "total_kills_sg556",
    "total_kills_scar20",
    "total_kills_ssg08",
    "total_kills_mp7",
    "total_kills_mp9",
    "total_kills_nova",
    "total_kills_negev",
    "total_kills_sawedoff",
    "total_kills_bizon",
    "total_kills_tec9",
    "total_kills_mag7",
    "total_kills_galilar",
    "total_kills_molotov"
];
var weaponNames = [
    "knife",
    "grenade",
    "glock",
    "deagle",
    "elites",
    "five seven",
    "xm1014",
    "mac10",
    "p90",
    "awp",
    "ak 47",
    "AUG",
    "famas",
    "g3sg1",
    "m249",
    "m4a1",
    "hkp2000",
    "p250",
    "sg556",
    "scar20",
    "ssg08",
    "mp7",
    "mp9",
    "nova",
    "negev",
    "sawed off",
    "bizon",
    "tec9",
    "mag7",
    "galil",
    "molotov"
];
var weaponPics = [
    '&#xE1F4',
    '&#xE02C',
    '&#xE004',
    '&#xE001',
    '&#xE002',
    '&#xE003',
    '&#xE019',
    '&#xE011',
    '&#xE024',
    '&#xE009',
    '&#xE007',
    '&#xE008',
    '&#xE00A',
    '&#xE027',
    '&#xE03C',
    '&#xE010',
    '&#xE013',
    '&#xE020',
    '&#xE00B',
    '&#xE026',
    '&#xE028',
    '&#xE021',
    '&#xE022',
    '&#xE023',
    '&#xE01C',
    '&#xE01D',
    '&#xE01A',
    '&#xE01E',
    '&#xE01B',
    '&#xE00D',
    '&#xE02E'
];
var weaponsData = new Array(weaponsList.length);
for (var i = 0; i < weaponsList.length; i++) {
    weaponsData[i] = new Array(3);
    weaponsData[i][0] = weaponsList[i];
    weaponsData[i][2] = weaponNames[i];
    weaponsData[i][3] = weaponPics[i];
}



$(document).ready(function() {
    SteamID = $.urlParam('SteamID');
   
    parseData_json();
    
    console.log($('#fav_weapons')[0].scrollHeight)
    $('#show_more_weapons, #fav_weapons').click(function(){
        switch(weapon_switch){
            case true:
                $('#fav_weapons').animate({
                    height: $('#fav_weapons')[0].scrollHeight
                });   
                $('#show_more_weapons').text("show less");
                weapon_switch = false;
            break;
            case false:
                $('#fav_weapons').animate({
                    height: '170px'
                });
                $('#show_more_weapons').text("show more");
                weapon_switch = true;
            break;
        }            
    });
});


function parseData_json() {
    $.getJSON( '/steam/stats/' + SteamID, function(data_json) {
        
        var deathratio = (search("total_kills", data_json) / search("total_deaths", data_json)).toFixed(2);
        $('#killdeathratio_inner').html('<h3 id="killdeathratio_number">' + deathratio + '</h3>')
        
        var accuracy = (search("total_shots_hit", data_json) * 100 / search("total_shots_fired", data_json)).toFixed(1);;
        $('#accuracy').html('<h2>Accuracy</h2><h1>' + accuracy + '%</h1>')
        
        $('#totalkills').html('<h2>Total Kills</h2><h1>' + search("total_kills", data_json) + '</h1>');
        
        $('#headshot').html('<h2>Headshots</h2><h1>' + search("total_kills_headshot", data_json) + '</h1>');
        
        var timeplayed = (search("total_time_played", data_json) / 3600).toFixed(0);
        $('#timeplayed').html('<h2>Time Played</h2><h1>' + timeplayed + 'h</h1>');
        
        var winrate = (search("total_matches_won", data_json) * 100 / search("total_matches_played", data_json)).toFixed(1);
        $('#winrate').html('<h2>Winrate</h2><h1>' + winrate + '%</h1>');

        var totkd = (search("total_kills", data_json) * 100)/(search("total_kills", data_json) + search("total_deaths", data_json));
        $('#killdeathratio_inner').css({width: totkd+"%"});
        
        getWeaponsStats(data_json);
        weaponsData.sort(sortLists);
        console.log(weaponsData)
        for(i = weaponsData.length-1; i>=0; i--){
            $('#fav_weapons').append('<div class="fav_weapon"><div class="weaponnumber"><h2>'+(weaponsData.length-i)+'</h2></div><div class="weaponinfo"><h3>'+weaponsData[i][2]+'</h3><div class="weapon_kills">'+ weaponsData[i][1] +'<img src="/res/hitmarker.png" class="hitmarker"></div></div><div class="icon">' + weaponsData[i][3] + '</div></div>');
        }
        
        
        
     });
      $.getJSON( '/steam/playerstats/' + SteamID, function(player_json) {
          $('#profilename h1').text(player_json.response.players[0].personaname);
          $('#profilepic').css({background: 'url("' + player_json.response.players[0].avatarfull + '")', backgroundSize: "cover"})
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
function getWeaponsStats(json){
            for(var i = 0; i<weaponsList.length; i++){
            weaponsData[i][1] = search(weaponsList[i], json);
        }
}
function sortLists(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}