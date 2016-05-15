var request = require('request');
var express = require('express');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP

app.use(express.static('site'));

var appid = 730;
var key = '3003C3C2F7BF7CC640CCF7974CAFDEAC';
var api = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/';
var infoapi = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/';

/* requestnutí a vyplnění daty z api na požadované url, na kterou je přistoupeno přes datascript.js*/
app.get('/steam/stats/:steamId', function(req, res){ 
  var steamId = req.params.steamId;
  var url = api + '?appid='+ appid +'&key='+ key +'&steamid=' + steamId;
  request.get(url, function(error, response, body) {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
  });
}); 
app.get('/steam/playerstats/:steamId', function(req, res){ 
  var steamId = req.params.steamId;
  var url = infoapi + '?key=' + key + '&steamids=' + steamId + '&format=json';
  request.get(url, function(error, response, body) {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
  });
}); 

app.listen(server_port); 