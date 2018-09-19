import "./index_form.js";

 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'

import agentsregister_artifacts from '../../build/contracts/agentsregister.json'
var agentsregister= contract(agentsregister_artifacts);


import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
var artisansregister= contract(artisansregister_artifacts);



window.onload = function() {
  
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    agentsregister.setProvider(web3.currentProvider);
    console.log('reload agents end js');
    artisansregister.setProvider(web3.currentProvider);
  console.log('reload agent search js');
  
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

window.endagent=function()
{
console.log("end calleddd");

var url_string = document.URL;
      console.log(url_string);
 //window.location.href
      var url = new URL(url_string);
      var fromaddress = url.searchParams.get("from");
      var toid = url.searchParams.get("to");
      var uname=url.searchParams.get("name");

      console.log(fromaddress+"  "+toid*1);

if(document.getElementById('message').innerHTML=="REQUEST SUCCESSFUL")
  window.location="agentsprofile.html?uname="+uname;


document.getElementById('message').innerHTML="REQUEST SUCCESSFUL";



var fromid=1;
var toaddress="11";
var fromid=1;
var amt=11;
var dur=11;

// amt=document.getElementById("amttrans").value();
// dur=document.getElementById("durtrans").value();

      

   

      

        console.log("FROM add :"+fromaddress);

      
      artisansregister.deployed().then(function(registerinstance) {
      return registerinstance.get_details_id(parseInt(toid*1),{from: web3.eth.accounts[0], gas:3000000}).then(function(res){
      
        toaddress=res[6];
        console.log("to add"+res[6]);
      });

       });

      console.log("from add: "+fromaddress);
      console.log("to add  : "+toaddress);
      
      //make req
      agentsregister.deployed().then(function(registerinstance) {
       registerinstance.makereq(fromaddress,toaddress,amt,dur,{from: web3.eth.accounts[0], gas:3000000}).then(function(){
        console.log("added to agents");
      });
     });

      agentsregister.deployed().then(function(registerinstance) {
       registerinstance.sendMoney(toaddress,amt,{from: web3.eth.accounts[0],value:amt, gas:3000000}).then(function(){
        console.log("added money to agents");
      });

       });

     // get req
      artisansregister.deployed().then(function(registerinstance) {
      registerinstance.getreq(toaddress,fromaddress,amt,dur,{from: web3.eth.accounts[0], gas:3000000}).then(function(){      
        
        console.log("added to artisans");
      });

       });

      

}

