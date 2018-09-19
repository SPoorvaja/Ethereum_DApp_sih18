pragma solidity ^0.4.19;

contract agentsregister
{
    
    struct user_info
    {
        uint uid;
        string name;
        int latitude;
        int longitude;
        uint no_requestsmade;
        address[10] to;
        uint[10] amt;
        uint[10] duration; 
        string uname;
        string pass;
        address add;
        string contact;
    } 

    struct trans
    {
    address from;
    address to;
    uint amount;
    uint duration;
    }
    
    trans[] public transactions;
    trans public temp_trans;
    user_info public user_var; 
    mapping(string => string) login_info;
    string[] public usernames;
    user_info[] public accounts;
    

    uint256 public size=0;
    uint256 public serial=500;
    uint256 public trans_count=0;

    function makereq(address from2,address to2, uint amt2, uint duration2) public
    {
       temp_trans.from=from2;
       temp_trans.to=to2;
      temp_trans.amount=amt2;
      temp_trans.duration=duration2;
      transactions.push(temp_trans);
       trans_count++;


       /* accounts[i].r[accounts[i].no_requestsmade].to=to2;
        accounts[i].r[accounts[i].no_requestsmade].amt=amt2;
        accounts[i].r[accounts[i].no_requestsmade].duration=duration2;
        accounts[i].no_requestsmade++;*/
    }

    function sendMoney(address to_addr,uint amt) public payable{
      to_addr.transfer(amt);
    }
    function getBalanceAddr(address add) public view returns (uint256) {
        return add.balance;
    }

    function newacc(string name2, int latitude2,int longitude2) public 
    {
        user_var.uid=serial++;
        user_var.name=name2;
        user_var.latitude=latitude2;
        user_var.longitude=longitude2;
        user_var.no_requestsmade=0;
    }
    

    function newacc_2(string contact2,string uname2,string pass2,address add2) public
     {       
        
        user_var.contact=contact2;
        user_var.uname=uname2;
        user_var.pass=pass2;
        user_var.add=add2;
        
        usernames.push(uname2);
        accounts.push(user_var);
        login_info[uname2]=pass2;
        size++;

    }

    function check_account(string uname2, string pass2) public view returns (bool)
    {
        if(keccak256(login_info[uname2])==keccak256(pass2)) //account exists
            {
                    return true;
            }

            return false;
    }

     function get_details_name(string uname2) public view returns (string name2, int latitude2,int longitude2,string contact2,address add2)
    {
        uint i=0;

        for(i=0;i<size;i++)
        {
            if(keccak256(accounts[i].uname)==keccak256(uname2))
            {
                return (accounts[i].name, accounts[i].latitude,accounts[i].longitude,accounts[i].contact,accounts[i].add);
            }
        }
    }

    function get_id(string uname2) public view returns (uint id)
    {
        uint i=0;

        for(i=0;i<size;i++)
        {
            if(keccak256(accounts[i].uname)==keccak256(uname2))
            {
                return accounts[i].uid;
            }
        }
    }

    function getaccountlength() public view returns (uint256)
    {
        return size;
    }

    
    
}