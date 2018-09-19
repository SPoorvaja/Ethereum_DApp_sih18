 import { default as Web3} from 'web3';
 import { default as contract } from 'truffle-contract'



import artisansregister_artifacts from '../../build/contracts/artisansregister.json'
var artisansregister= contract(artisansregister_artifacts);


 var count=5;
      var to="0";
      var i=0,res="NIL";
      var elements = document.getElementsByClassName("column1");

window.onload = function() {
  
	window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  	artisansregister.setProvider(web3.currentProvider);
 	console.log('reload agent search js');

var url_string = document.URL;
      	console.log(url_string);
      var url = new URL(url_string);
      var uname = url.searchParams.get("uname");




      artisansregister.deployed().then(function(registerinstance) {
		return registerinstance.get_counttrans(uname,{from:web3.eth.accounts[0]}).then(function(res){
			count=res[0];
			to=res[1];
			console.log("count is "+res[0]+ "and to is : "+res[1]);
		});
	});
	
 	}//fn

window.populate=function()
{
		

      
      console.log("count ="+count);
      for(i=0;i<count;i++)
      {
      		console.log("i value : "+i);
      		artisansregister.deployed().then(function(registerinstance) {
			return registerinstance.display_trans(to,i,{from:web3.eth.accounts[0]}).then(function(res){
			console.log(res);
				});
			});
      		// var index=i+500;
      		// console.log("index is : "+index);
			//elements[i].innerHTML="<div onClick='redirect_trans("+i+")' ><font size='5'>"+"<strong>From :</strong><strong>"+res[0]+"</strong><br>"+"<strong>Amount :</strong><strong>"+res[1]+"</strong><br>"+"<strong>Duration :</strong><strong>"+res[2]+"<br></font></div>";
      }

		
	
}