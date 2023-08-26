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
        address payable owner;
        bool purchased;
    }

    event GemMining(
        uint id,
        string gemType,
        uint price,
        string miningLocation,
        string extractionMethod,
        address payable owner,
        bool purchased
    );

    event GemPurchased(
        uint id,
        string gemType,
        uint price,
        string miningLocation,
        string extractionMethod,
        address payable owner,
        bool purchased
    );

    constructor() public {
        mineName = "afrikai";
    }

    function gemMining(string memory _gemType, uint _price, string memory _miningLocation, string memory _extractionMethod) public {
        minedGemCount++;

        minedGems[minedGemCount] = MinedGem(minedGemCount, _gemType, _price, _miningLocation, _extractionMethod, msg.sender, false);

        emit GemMining(minedGemCount, _gemType, _price, _miningLocation, _extractionMethod, msg.sender, false);
    }

    function purchaseGem(uint _id) public payable{
        MinedGem memory _minedGem = minedGems[_id];
        address payable _miner = _minedGem.owner;
        _minedGem.owner = msg.sender;
        _minedGem.purchased = true;
        minedGems[_id] = _minedGem;
        address(_miner).transfer(msg.value);
        emit GemPurchased(minedGemCount, _minedGem.gemType, _minedGem.price, _minedGem.miningLocation, _minedGem.extractionMethod, msg.sender, true);



    }


}