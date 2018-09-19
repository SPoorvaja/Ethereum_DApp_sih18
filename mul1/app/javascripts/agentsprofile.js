
import "../css/artisansprofile_add.css";
import "../css/style.css";
import "./index_form.js";
 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'


import agentsregister_artifacts from '../../build/contracts/agentsregister.json'
var agentsregister= contract(agentsregister_artifacts);

var arg;
window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	agentsregister.setProvider(web3.currentProvider);
 	console.log('reload agentprofile js');

 	var variable="uname";
  	var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (pair[0] == variable) {
			break;	} }

		console.log("uname is "+pair[1]);
		document.getElementById("name").innerHTML=pair[1];

		arg=pair[1];
		agentsregister.deployed().then(function(registerinstance) {
		return registerinstance.get_details_name(pair[1],{from:web3.eth.accounts[0]}).then(function(res){
			console.log(res);
			document.getElementById("name").innerHTML=res[0];
			document.getElementById("uname").innerHTML=pair[1];
			document.getElementById("latitude").innerHTML=res[1].toNumber();
			document.getElementById("longitude").innerHTML=res[2].toNumber();
			document.getElementById("contact").innerHTML=res[3];
			document.getElementById("add").innerHTML=res[4];
			
		});
	});


}


window.redirect_search=function()
{
	console.log("redir fn");
	window.location="agentsearch.html?uname="+arg;

}
