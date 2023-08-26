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

    event GemMining(
        uint id,
        string gemType,
        uint price,
        string miningLocation,
        string extractionMethod,
        address miner
    );

    constructor() public {
        mineName = "afrikai";
    }

    function gemMining(string memory _gemType, uint _price, string memory _miningLocation, string memory _extractionMethod) public {
        minedGemCount++;

        minedGems[minedGemCount] = MinedGem(minedGemCount, _gemType, _price, _miningLocation, _extractionMethod, msg.sender);

        emit GemMining(minedGemCount, _gemType, _price, _miningLocation, _extractionMethod, msg.sender);
    }


}