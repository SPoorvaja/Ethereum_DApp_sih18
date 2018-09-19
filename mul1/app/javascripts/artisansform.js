// // Import the page's CSS. Webpack will know what to do with it.
 	

 //import "../assets/js/jquery.min.js";
import "../css/artisansform_add.css";
import "../css/style.css";
import "./index_form.js";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
var artisansregister= contract(artisansregister_artifacts);


window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	artisansregister.setProvider(web3.currentProvider);
 	console.log('reloadd artisansform js');
}

window.IDGenerator=function() {
         
        // console.log("ID generated");
         this.length = 8;
         this.timestamp = +new Date;
         
         var _getRandomInt = function( min, max ) {
         	//console.log("ID generated");
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
         }
         
         this.generate = function() {
         	//console.log("ID generated");
             var ts = this.timestamp.toString();
             var parts = ts.split( "" ).reverse();
             var id = "";
             
             for( var i = 0; i < this.length; ++i ) {
                var index = _getRandomInt( 0, parts.length - 1 );
                id += parts[index];     
             }
             
         console.log("ID generated"+id);
             return id;
         }

         
 }

window.newregistration= function()
{
	// e.preventDefault();

	var fname="--";
	var lname;
	var locality="--";
	var skills="--";
	var contact="--";
	var uname="--";
	var upass="--";
	var latitude,longitude,exp,address;
	
	fname=$('#fname').val().toString();
	lname=$('#lname').val().toString();
	fname=fname+" "+lname;
	latitude=$('#latitude').val();
	longitude=$('#longitude').val();
	skills=$('#skills').val().toString();
	exp=$('#experience').val().toString();
	contact=$('#contact').val().toString();
	uname=$('#uname').val().toString();
	upass=$('#upass').val().toString();
	address=$('#address').val().toString();
if(contact.length !=10){
		alert("Mobile Number Invalid");
		return;
	}
	console.log("Values to add : "+uname+" and "+upass);

	artisansregister.deployed().then(function(registerinstance) {
		registerinstance.newacc(fname,latitude,longitude,skills,{from: web3.eth.accounts[0], gas:3000000});
		});

	artisansregister.deployed().then(function(registerinstance) {
		registerinstance.newacc_2(exp,contact,uname,upass,address,{from: web3.eth.accounts[0], gas:3000000});
		});

	console.log("Added");
	document.getElementById('uname_passed').innerHTML="uname";
	alert("Registered Succesfully");
	window.location="/";//?uname="+uname;
 }

window.checking=function()
{
	var uname3=$('#uname3').val().toString();
	var pass3=$('#upass3').val().toString();

	console.log("Values to check : "+uname3+" and "+pass3);

	artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.check_account(uname3,pass3,{from:web3.eth.accounts[0]}).then(function(res){
			if(res==true)
			console.log("Valid: "+res);
			else
			console.log("Invalid: "+res);
		});
	});

}
window.getdetails=function()
{
	var uname2=$('#uname2').val().toString();
	console.log("User name entered: "+uname2);

	 
	console.log("User name entered done: "+uname2);
}

window.validate=function()
{
	var uname4=$('#uname4').val().toString();
	var upass4=$('#upass4').val().toString();
	console.log("Valuesss to check : "+uname4+" and "+upass4);
	artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.check_account(uname4,upass4,{from: web3.eth.accounts[0], gas:3000000}).then(function(res){
			if(res==true)
			{
				console.log("Valid: "+res);
				document.getElementById('uname_passed').innerHTML=res;
				window.location="artisansprofile.html?uname="+uname4;
				
			}
			else
			console.log("Invalid: "+res);
		});
	});
}

var x = document.getElementById("demo");

window.getLocation=function() {
	console.log("loca fn");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    document.getElementById("latitude").value=position.coords.latitude;
    document.getElementById("longitude").value=position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}