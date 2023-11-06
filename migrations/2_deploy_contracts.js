const GemstoneExtraction = artifacts.require("GemstoneExtraction");
const GemstoneSelecting = artifacts.require("GemstoneSelecting");

  module.exports = async function(deployer) {
    await deployer.deploy(GemstoneExtraction);
    const gemstoneExtractionInstance = await GemstoneExtraction.deployed();
  
    await deployer.deploy(GemstoneSelecting);
};