
import "../css/artisansprofile_add.css";
import "../css/style.css";
import "./index_form.js";
 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'


import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
var artisansregister= contract(artisansregister_artifacts);


window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	artisansregister.setProvider(web3.currentProvider);
 	console.log('reload artisanprofile js');

 	var size=-1;
 	artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.getaccountlength({from:web3.eth.accounts[0]}).then(function(res){
			size=Number(res)*1;
			console.log("sizeee blah: "+size);
		});
	});

 	console.log("start: size = "+size);


 	var variable="uname";
  	var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (pair[0] == variable) {
			break;	} }

		console.log("uname is "+pair[1]);
		document.getElementById("name").innerHTML=pair[1];

		artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.get_details_name(pair[1],{from:web3.eth.accounts[0]}).then(function(res){
			
			console.log(res);
			document.getElementById("name").innerHTML=res[0];
			document.getElementById("uname").innerHTML=pair[1];
			document.getElementById("exp").innerHTML=res[4];
			document.getElementById("latitude").innerHTML=res[1];
			document.getElementById("longitude").innerHTML=res[2];
			document.getElementById("contact").innerHTML=res[5];
			document.getElementById("skills").innerHTML=res[3]
			document.getElementById("add").innerHTML=res[6];
			
		});
	});

}

window.redirect_translist=function()
{
	var variable="uname";
  	var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (pair[0] == variable) {
			break;	} }

		console.log("uname is "+pair[1]);

		window.location="artisansearch.html?uname="+pair[1];

}