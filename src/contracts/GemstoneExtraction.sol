pragma solidity >=0.4.21 <0.6.0;

contract GemstoneExtraction {
    string public mineName;
    uint public minedGemCount = 0;
    mapping (uint => MinedGem) public minedGems;

    struct MinedGem{
        uint id;
        string gemType;
        uint price;
        string miningLocation;
      //  Date miningDate;
        string extractionMethod; //enum?
        address miner;
    }

    constructor() public {
        mineName = "afrikai";
    }

    function gemMining(string memory _name, uint _price, string memory gemType, string memory _miningLocation, string memory _extractionMethod) public {
        minedGemCount++;
    }


}