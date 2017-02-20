
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
fs = require('fs');
var cors = require('cors');
var math = require('mathjs');

app.use(cors());

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb'}));


app.post('/', function(req, res) {
    var item = req.body;
    console.log(JSON.stringify(item));  
   
 fs.truncate("C:\\Users\\x0261631\\Desktop\\weather\\src\\jsonData\\mainData.json", 0, function() {
    fs.writeFile("C:\\Users\\x0261631\\Desktop\\weather\\src\\jsonData\\mainData.json", JSON.stringify(item), function (err) {
        if (err) {
            return console.log("Error writing file: " + err);
        }

    });
});
 res.send({"suc":true});
});

app.get('/', function (req, res) {
  var r = math.random(1,5);
  res.send({'a':r});
});
 
var server = app.listen(5000, function () {
  var host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  var port = server.address().port;
 
  console.log('listening at http://%s:%s', host, port);
});
