 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'

import "../css/agentsearch_add.css";

import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
var artisansregister= contract(artisansregister_artifacts);



var size=0;
var uname="NIL";
window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	artisansregister.setProvider(web3.currentProvider);
 	console.log('reload agent search js');
	
 	artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.getaccountlength({from:web3.eth.accounts[0]}).then(function(res){
			size=Number(res)*1;
			console.log("sizeee blah: "+size);
		});
	});

 	console.log("start: size = "+size);
	//document.getElementById("size_list_div").value()=size;
	var url_string = document.URL;
      console.log(url_string);
 //window.location.href
      var url = new URL(url_string);
      uname=url.searchParams.get("uname");


 	listView();
 	
		
 }

function sleep(milliseconds) {
  	var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var answers=[];

window.populate= function(index) {

	var elements = document.getElementsByClassName("column1");
	var x=100,temp="NIL";
 	var k=Number(x+size);
 	var y=Number(index);
 
 	
 		
 		var res="";
 		artisansregister.deployed().then(function(registerinstance) {
			return registerinstance.get_details_id(parseInt(index),{from: web3.eth.accounts[0]}).then(function(res){
			
			console.log(index);
			temp=res;
			console.log("temp = "+temp);
			//answers.push(temp);	
			//console.log("y-x is "+(y-x));
			elements[y-x].innerHTML="<a href='agentfund.html?from="+res[6]+"&to="+index+"&name="+uname+"'><font size='5'>"+"<strong>Name:</strong><strong>"+res[0]+"</strong><br>"+"<strong>Latitude:</strong><strong>"+res[1]+"</strong><br>"+"<strong>Longitude:</strong><strong>"+res[2]+"<br><strong>Skills:</strong><strong>"+res[3]+"</strong><br>"+"<strong>Experience:</strong><strong>"+res[4]+"</strong>&nbspyear<br>"+"<strong>Contact:</strong><strong>"+res[5]+"</strong><br>"+"<strong>Address:</strong><strong>"+res[6]+"</strong><br>"+"</font></a>";
			
		});

	});
 		
 		//console.log("asasa" +answers);
 	//this.elements[index-100].innerHTML=temp;
 }


