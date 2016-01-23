var request = require('request');
var express = require('express');
var app = express();

app.use(express.static('site'));

var appid = 730;
var key = '3003C3C2F7BF7CC640CCF7974CAFDEAC';
var api = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/';

app.get('/steam/stats/:steamId', function(req, res){ 
  var steamId = req.params.steamId;
  var url = api + '?appid='+ appid +'&key='+ key +'&steamid=' + steamId;
  request.get(url, function(error, response, body) {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
  });
}); 

app.listen(4000); 