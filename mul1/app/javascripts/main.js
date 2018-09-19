// // Import the page's CSS. Webpack will know what to do with it.
 //import "../stylesheets/app.css";

 //import assets from '../assets';


  import "../assets/js/jquery.min.js";
  import "../assets/css/main.css";
  import "../assets/js/util.js";
  import "../assets/js/main.js";
 import "../assets/js/jquery.scrolly.min.js";
 import "../assets/css/_skel.scss";

import 'npm-es6-webpack-skeleton';
 import "../assets/js/skel.min.js";
  import "../assets/js/skel-layout.min.js";
  import "../assets/js/skel-viewport.min.js";


// // Import libraries we need.
 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'
 //import register_artifacts from '../../build/contracts/register.json'

// // Import our contract artifacts and turn them into usable abstractions.
 import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
 var artisansregister= contract(artisansregister_artifacts);


window.onload = function() {
  
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  artisansregister.setProvider(web3.currentProvider);
  console.log('reload main js');
}


window.newregistration= function()
{
  
  var uname=$('#uname').val().toString();
  var pass=$('#upass').val().toString();

  console.log("Valuesss : "+uname+" and "+pass);

  artisansregister.deployed().then(function(registerinstance) {
    registerinstance.newacc(uname,pass,{from:web3.eth.accounts[0]});
    });

  console.log("Added");

}

window.checking=function()
{
  var uname3=$('#uname3').val().toString();
  var pass3=$('#upass3').val().toString();

  console.log("Valuesss to check : "+uname3+" and "+pass3);

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

  artisansregister.deployed().then(function(registerinstance) {
    return registerinstance.displaypass(uname2,{from:web3.eth.accounts[0]}).then(function(res){
      console.log("Pass : "+res);
    });
  });

  console.log("User name entered done: "+uname2);
}