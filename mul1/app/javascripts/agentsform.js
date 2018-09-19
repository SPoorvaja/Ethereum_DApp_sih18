import "../css/agentsform_add.css";
import "../css/style.css";
import "./index_form.js";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import agentsregister_artifacts from '../../build/contracts/agentsregister.json'
var agentsregister= contract(agentsregister_artifacts);


window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	agentsregister.setProvider(web3.currentProvider);
 	console.log('reload agentsform js');
}


window.newregistration= function()
{
	var fname="--";
	var lname;
	var contact="--";
	var uname="--";
	var upass="--";
	var latitude,longitude,address;

	fname=$('#fname').val().toString();
	lname=$('#lname').val().toString();
	fname=fname+" "+lname;
	latitude=$('#latitude').val();
	longitude=$('#longitude').val();
	contact=$('#contact').val().toString();
	uname=$('#uname').val().toString();
	upass=$('#upass').val().toString();
	address=$('#address').val().toString();
if(contact.length != 10){
		alert("Mobile Number Invalid");
		return;
	}
	console.log("Values to add : "+uname+" and "+upass);

	agentsregister.deployed().then(function(registerinstance) {
		registerinstance.newacc(fname,latitude,longitude,{from: web3.eth.accounts[0], gas:3000000});
		});

	agentsregister.deployed().then(function(registerinstance) {
		registerinstance.newacc_2(contact,uname,upass,address,{from: web3.eth.accounts[0], gas:3000000});
		});

	console.log("Registration Successful");	
	alert("Registration Successful");
	//window.location="/";
}

window.checking=function()
{
	var uname3=$('#uname3').val().toString();
	var pass3=$('#upass3').val().toString();

	console.log("Valuesss to check : "+uname3+" and "+pass3);

	agentsregister.deployed().then(function(registerinstance) {
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

	agentsregister.deployed().then(function(registerinstance) {
		return registerinstance.displaypass(uname2,{from:web3.eth.accounts[0]}).then(function(res){
			console.log("Pass : "+res);
		});
	});

	console.log("User name entered done: "+uname2);
}

window.validate=function()
{
	var uname4="--";
	var upass4="--";

	var uname4=$('#uname4').val().toString();
	var upass4=$('#upass4').val().toString();

	console.log("Valuesss to check : "+uname4+" and "+upass4);
	agentsregister.deployed().then(function(registerinstance) {
		return registerinstance.check_account(uname4,upass4,{from: web3.eth.accounts[0], gas:3000000}).then(function(res){
			if(res==true)
			{
				console.log("Valid: "+res);
				//document.getElementById('uname_passed').innerHTML=res;
				window.location="agentsprofile.html?uname="+uname4;
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