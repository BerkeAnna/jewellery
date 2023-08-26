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
            assert.equal(event.miner, miner , 'miner is correct')

        })

      /*  it('lists products', async () => {
          const product = await marketplace.products(productCount)
          assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
          assert.equal(product.name, 'IPhone X', 'name is correct')
          assert.equal(product.price, '1000000000000000000' , 'price is correct')
          assert.equal(product.owner, seller , 'owner is correct')
          assert.equal(product.purchased, false , 'purchased is correct')
         })

        it('sells products', async () => {
            let oldSellerBalance 
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') } )

            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'IPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000' , 'price is correct')
            assert.equal(event.owner, buyer , 'owner is correct')
            assert.equal(event.purchased, true , 'purchased is correct')

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