// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 
/*
@Description: Property Validator token is given property validators that stack
              their coin to valut that a building project is real
*/
contract DaoToken is ERC20 {
 
    constructor() ERC20("WinDAOToken", "WDT") {
        //_mint(msg.sender, _initialSupply);
    }
 
    function mint(address _validator, uint _unit) external {
       _mint(_validator, _unit);
    }
 
}
