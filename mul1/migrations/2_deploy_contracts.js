var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var artisansregister= artifacts.require("./artisansregister.sol");
var agentsregister= artifacts.require("./agentsregister.sol");
var artisansprofile= artifacts.require("./artisansprofile.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(artisansregister);
  deployer.deploy(agentsregister);
  deployer.deploy(artisansprofile);

};
