pragma solidity ^0.4.19;

contract artisansregister
{
    
    struct user_info
    {
        uint uid;
        string name;
        int latitude;
        int longitude;
        uint no_skills;
        string[10] skills;
        uint no_requests;
        address[10] to;
        uint[10] amt;
        uint[10] duration; 
        
        string uname;
        string pass;
        address add;
        uint exp;
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
    uint256 public serial=100;
    uint256 public trans_count=0;


    function get_counttrans(string uname2) public view returns(uint,address)
    {
        uint i=0;
        uint result=0;
        address to2;
        for(i=0;i<size;i++)
        {
            if(keccak256(accounts[i].uname)==keccak256(uname2))
            {
                to2=accounts[i].add;
                break;
            }
        }

        for(i=0;i<trans_count;i++)
        {
            if(keccak256(transactions[i].to)==keccak256(to2))
            {
                result++;
            }
        }

        return (result,to2);
    }


    function display_trans(address to2,uint index) public view  returns(address from2, uint amount2, uint duration2)
    {

        uint count=0;
        uint i=0;

        for(i=0;i<trans_count;i++)
        {
            if(keccak256(transactions[i].to)==keccak256(to2)) 
            {
                if(count==index)
                    return (transactions[i].from,transactions[i].amount, transactions[i].duration);
                else
                    count++;
            }
        }
    }


    function getreq(address to2, address from2, uint amt2, uint duration2) public
    {
        
        temp_trans.from=from2;
         temp_trans.to=to2;
        temp_trans.amount=amt2;
        temp_trans.duration=duration2;
        transactions.push(temp_trans);
        trans_count++;


    }

    

    
    function newacc(string name2, int latitude2,int longitude2,string skills2) public 
    {
        user_var.uid=serial++;
        user_var.name=name2;
        user_var.latitude=latitude2;
        user_var.longitude=longitude2;
        user_var.skills[0]=skills2;
        user_var.no_skills=1;
    }
    

    function newacc_2(uint exp2,string contact2,string uname2,string pass2,address add2) public
     {       
        user_var.exp=exp2;
        user_var.contact=contact2;
        user_var.uname=uname2;
        user_var.pass=pass2;
        user_var.add=add2;
        user_var.no_requests=0;
        
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

    function get_details_name(string uname2) public view returns (string name2, int latitude2,int longitude2,string skills2,uint exp2,string contact2,address add2)
    {
        uint i=0;

        for(i=0;i<size;i++)
        {
            if(keccak256(accounts[i].uname)==keccak256(uname2))
            {
                return (accounts[i].name, accounts[i].latitude,accounts[i].longitude,accounts[i].skills[0],accounts[i].exp,accounts[i].contact,accounts[i].add);
            }
        }
    }

    function get_details_id(uint uid3) public view returns (string name2, int latitude2,int longitude2,string skills2,uint exp2,string contact2,address add2)
    {
        uint i=0;
        uint uid2=uid3;

        for(i=0;i<size;i++)
        {
            if(accounts[i].uid==uid2)
            {
                return (accounts[i].name, accounts[i].latitude,accounts[i].longitude,accounts[i].skills[0],accounts[i].exp,accounts[i].contact,accounts[i].add);
            }
        }
    }

    function getaccountlength() public view returns (uint256)
    {
        return size;
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
    
}