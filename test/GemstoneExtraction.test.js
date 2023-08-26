const { assert } = require("chai")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const GemstoneExtraction = artifacts.require('./GemstoneExtraction.sol')

contract('GemstoneExtraction', ([deployer, miner, buyer]) => {//todo
    let gemstoneExtraction 

    before(async () => {
        gemstoneExtraction = await GemstoneExtraction.deployed()
    })

    describe('deployment', async () =>{
        it('deployed successfully', async () => {
            const address = await gemstoneExtraction.address    
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const mineName = await gemstoneExtraction.mineName()
            assert.equal(mineName, "afrikai")
        })
    })

    describe('gems', async () =>{
        let result, gemsCount

        before(async () => {
            result = await gemstoneExtraction.gemMining('type', web3.utils.toWei('1', 'Ether'), 'africa', 'asd', { from: miner})
            gemsCount = await gemstoneExtraction.minedGemCount()
        })

        it('mining gems', async () => {
           //SUCCESS
            assert.equal(gemsCount, 1)
            //console.log(result.logs)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), gemsCount.toNumber(), 'id is correct')
            assert.equal(event.gemType, 'type', 'type is correct')
            assert.equal(event.miningLocation, 'africa', 'location is correct')
            assert.equal(event.price, '1000000000000000000' , 'price is correct')
            assert.equal(event.extractionMethod, 'asd', 'extractionMethod is correct')
            assert.equal(event.owner, miner , 'miner is correct')

            //Failure
            await gemstoneExtraction.gemMining('', web3.utils.toWei('1', 'Ether'), { from: miner}).should.be.rejected;
            await gemstoneExtraction.gemMining('type', 0, { from: miner}).should.be.rejected;
        })

        it('lists gems', async () => {
          const gems = await gemstoneExtraction.minedGems(gemsCount)
          assert.equal(gems.id.toNumber(), gemsCount.toNumber(), 'id is correct')
            assert.equal(gems.gemType, 'type', 'type is correct')
            assert.equal(gems.miningLocation, 'africa', 'location is correct')
            assert.equal(gems.price, '1000000000000000000' , 'price is correct')
            assert.equal(gems.extractionMethod, 'asd', 'extractionMethod is correct')
            assert.equal(gems.owner, miner , 'miner is correct')
         })

        it('sells gems', async () => {
           /* let oldSellerBalance 
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
*/
            result = await gemstoneExtraction.purchaseGem(gemsCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') } )

            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), gemsCount.toNumber(), 'id is correct')
            assert.equal(event.gemType, 'type', 'type is correct')
            assert.equal(event.miningLocation, 'africa', 'location is correct')
            assert.equal(event.price, '1000000000000000000' , 'price is correct')
            assert.equal(event.extractionMethod, 'asd', 'extractionMethod is correct')
            assert.equal(event.owner, buyer , 'buyer is correct')
        }) //todo: delete this line
/*
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            //console.log(oldSellerBalance, newSellerBalance, price)
            
            const expectedBalance = oldSellerBalance.add(price)
            assert.equal(newSellerBalance.toString(), expectedBalance.toString())

            await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;

            await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

        })
    */    })
    
})