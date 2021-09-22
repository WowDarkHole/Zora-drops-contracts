# Zora NFT Editions

### What are these contracts?
1. `SingleEditionMintable`
   Each edition is a unique contract.
   This allows for easy royalty collection, clear ownership of the collection, and your own contract 🎉
2. `SingleEditionMintableCreator`
   Gas-optimized factory contract allowing you to easily + for a low gas transaction create your own edition mintable contract.
3. `SharedNFTLogic`
   Contract that includes dynamic metadata generation for your editions removing the need for a centralized server.
   imageUrl and animationUrl can be base64-encoded data-uris for these contracts totally removing the need for IPFS

### How do I create a new contract?

1. Find/Deploy the `SingleEditionMintableCreator` contract
2. Call `createEdition` on the `SingleEditionMintableCreator`

### Where is the factory contract deployed:

**Mainnet ETH**: [0xEf7a8fF7FC585FA1Fe3062455B628bfC657e2cD5](https://etherscan.io/address/0xEf7a8fF7FC585FA1Fe3062455B628bfC657e2cD5)

**Rinkeby**: [0x7E335506443252196cd5A61bd4a1906D79791Fc6](https://rinkeby.etherscan.io/address/0x7E335506443252196cd5A61bd4a1906D79791Fc6)

**Polygon**: Soon

**Mumbai**: [0xb655386104f475c087b7460525a5676CaFc8b13f](https://mumbai.polygonscan.com/address/0xb655386104f475c087b7460525a5676CaFc8b13f)


### How do I sell/distribute editions?

Now that you have a edition, there are multiple options for lazy-minting and sales:

1. To sell editions for ETH you can call `setSalePrice`
2. To allow certain accounts to mint `setApprovedMinter(address, approved)`.
3. To mint yourself to a list of addresses you can call `mintEditions(addresses[])` to mint an edition to each address in the list.

### Benefits of these contracts:

* Full ownership of your own created minting contract
* Each serial gets its own minting contract
* Gas-optimized over creating individual NFTs
* Fully compatible with ERC721 marketplaces / auction houses / tools
* Supports tracking unique parts (edition 1 vs 24 may have different pricing implications) of editions
* Supports free public minting (by approving the 0x0 (zeroaddress) to mint)
* Supports smart-contract based minting (by approving the custom minting smart contract) using an interface.
* All metadata is stored/generated on-chain -- only image/video assets are stored off-chain
* Permissionless and open-source
* Simple integrated ethereum-based sales, can be easily extended with custom interface code

### Potential use cases for these contracts:

* Giveaways for events showing if you’ve attended 
* Serial editioned artworks that can be sold in the Zora auction house / work in any ERC721 market
* Fundraisers for fixed-eth amounts
* Can be used to issue tokens in response for contributing to a fundraiser
* Tickets/access tokens allowing holders to access a discord or mint

### Deploying:
(Replace network with desired network)

`hardhat deploy --network rinkeby`

### Verifying:

`hardhat sourcify --network rinkeby && hardhat etherscan-verify --network rinkeby`

### Bug Bounty
5 ETH for any critical bugs that could result in loss of funds.
Rewards will be given for smaller bugs or ideas.
