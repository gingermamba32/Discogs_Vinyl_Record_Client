var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
var cookie = require('cookie-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = new Discogs().database();  //define the database

//get the release data of the id 176126
db.release(176126, function(err, data){
    //console.log(data);
});

var dis = new Discogs('MyUserAgent/1.0');


var collection = new Discogs().user().collection();
collection.releases('mpmonter', 0, {page: 1, per_page: 75}, function(err, data){
    //console.log(data); testing to see if this collection shows up
});


//set the output format of the data to HTML
var dis = new Discogs().setConfig({outputFormat: 'html'});


// Authenticate by user token
var dis = new Discogs({userToken: 'iQIvxFAHoCXkKvCWrzzOGJNIXNumtSFoTwKvdBiF'});

// Authenticate by consumer key and secret
var dis = new Discogs({
    consumerKey: 'FTxlBjxbqGnyKJBpHDIs', 
    consumerSecret: 'aoVHjxXQhJjucSoJctZmNMTmNOuJkgAw'
});

var dis = new Discogs('MyUserAgent/1.0', {userToken: 'iQIvxFAHoCXkKvCWrzzOGJNIXNumtSFoTwKvdBiF'});

router.get('/authorize', function(req, res){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        'FTxlBjxbqGnyKJBpHDIs', 
        'aoVHjxXQhJjucSoJctZmNMTmNOuJkgAw', 
        'http://your-script-url/callback', 
        function(err, requestData){
            // Persist "requestData" here so that the callback handler can  
            // access it later after returning from the authorize url 
            res.redirect(requestData.authorizeUrl);
        }
    );
});

router.get('/callback', function(req, res){
    var oAuth = new Discogs(requestData).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs 
        function(err, accessData){
            // Persist "accessData" here for following OAuth calls  
            res.send('Received access token!');
        }
    );
});


router.get('/identity', function(req, res){
    var dis = new Discogs(accessData);
    dis.identity(function(err, data){
        //res.send(data);
    });
});


//create a router POST request to take the data from the 
//form and return the information that i need

//get the release data of the id 176126...test id

router.post('/', function(req, res){
	var searchFeature = Number(req.body.id); 
	db.release(searchFeature, function(err,data){
        var record = data;
		// console.log(record);
        console.log(JSON.stringify(record.artists));
        res.render('index', {title: 'express', records: record.artists});
	}); 
});

//Change search result to include serial number



//would like to have a few search queries through forms  
//like all record releases by artist or specific record by catalogue number
//must take the data that I query and print it back onto the page

//need to print the results back on the page
////How to access and image
// var db = new Discogs(accessData).database();
// db.release(176126, function(err, data){
//     var url = data.images[0].resource_url;
//     db.image(url, function(err, data, rateLimit){
//         // Data contains the raw binary image data 
//         require('fs').writeFile(file, data, 'binary', function(err){
//             console.log('Image saved!');
//         });
//     });
// });


//*************************OAUTH TOKENS**************
//Current token: iQIvxFAHoCXkKvCWrzzOGJNIXNumtSFoTwKvdBiF

//Consumer Key	FTxlBjxbqGnyKJBpHDIs
// Consumer Secret	aoVHjxXQhJjucSoJctZmNMTmNOuJkgAw
// Request Token URL	http://api.discogs.com/oauth/request_token
// Authorize URL	http://www.discogs.com/oauth/authorize
// Access Token URL	http://api.discogs.com/oauth/access_token

module.exports = router;
