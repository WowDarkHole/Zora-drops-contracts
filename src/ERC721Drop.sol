// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

/**

 ________   _____   ____    ______      ____
/\_____  \ /\  __`\/\  _`\ /\  _  \    /\  _`\
\/____//'/'\ \ \/\ \ \ \L\ \ \ \L\ \   \ \ \/\ \  _ __   ___   _____     ____
     //'/'  \ \ \ \ \ \ ,  /\ \  __ \   \ \ \ \ \/\`'__\/ __`\/\ '__`\  /',__\
    //'/'___ \ \ \_\ \ \ \\ \\ \ \/\ \   \ \ \_\ \ \ \//\ \L\ \ \ \L\ \/\__, `\
    /\_______\\ \_____\ \_\ \_\ \_\ \_\   \ \____/\ \_\\ \____/\ \ ,__/\/\____/
    \/_______/ \/_____/\/_/\/ /\/_/\/_/    \/___/  \/_/ \/___/  \ \ \/  \/___/
                                                                 \ \_\
                                                                  \/_/

 */

import {ERC721AUpgradeable} from "erc721a-upgradeable/ERC721AUpgradeable.sol";
import {IERC721AUpgradeable} from "erc721a-upgradeable/IERC721AUpgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import {IZoraFeeManager} from "./interfaces/IZoraFeeManager.sol";
import {IMetadataRenderer} from "./interfaces/IMetadataRenderer.sol";
import {IERC721Drop} from "./interfaces/IERC721Drop.sol";
import {IOwnable} from "./interfaces/IOwnable.sol";

import {OwnableSkeleton} from "./utils/OwnableSkeleton.sol";
import {Version} from "./utils/Version.sol";
import {FactoryUpgradeGate} from "./FactoryUpgradeGate.sol";
import {ERC721DropStorageV1} from "./storage/ERC721DropStorageV1.sol";

/**
 * @notice ZORA NFT Base contract for Drops and Editions
 *
 * @dev For drops: assumes 1. linear mint order, 2. max number of mints needs to be less than max_uint64
 *       (if you have more than 18 quintillion linear mints you should probably not be using this contract)
 * @author iain@zora.co
 *
 */
contract ERC721Drop is
    ERC721AUpgradeable,
    UUPSUpgradeable,
    IERC2981Upgradeable,
    ReentrancyGuardUpgradeable,
    AccessControlUpgradeable,
    IERC721Drop,
    OwnableSkeleton,
    Version(6),
    ERC721DropStorageV1
{
    /// @dev This is the max mint batch size for the optimized ERC721A mint contract
    uint256 internal constant MAX_MINT_BATCH_SIZE = 8;

    /// @dev Gas limit to send funds
    uint256 internal constant FUNDS_SEND_GAS_LIMIT = 210_000;

    /// @notice Error string constants
    string internal constant SOLD_OUT = "Sold out";
    string internal constant TOO_MANY = "Too many";

    /// @notice Access control roles
    bytes32 public immutable MINTER_ROLE = keccak256("MINTER");
    bytes32 public immutable SALES_MANAGER_ROLE = keccak256("SALES_MANAGER");

    /// @dev ZORA V3 transfer helper address for auto-approval
    address internal immutable zoraERC721TransferHelper;

    /// @dev Factory upgrade gate
    FactoryUpgradeGate internal immutable factoryUpgradeGate;

    /// @dev Zora Fee Manager address
    IZoraFeeManager public immutable zoraFeeManager;

    /// @notice Max royalty BPS
    uint16 constant MAX_ROYALTY_BPS = 50_00;

    event SalesConfigChanged(address indexed changedBy);

    event FundsRecipientChanged(
        address indexed newAddress,
        address indexed changedBy
    );

    event OpenMintFinalized(address indexed sender, uint256 numberOfMints);

    /// @notice Only allow for users with admin access
    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert Access_OnlyAdmin();
        }

        _;
    }

    /// @notice Only a given role has access or admin
    /// @param role role to check for alongside the admin role
    modifier onlyRoleOrAdmin(bytes32 role) {
        if (
            !hasRole(DEFAULT_ADMIN_ROLE, msg.sender) &&
            !hasRole(role, msg.sender)
        ) {
            revert Access_MissingRoleOrAdmin(role);
        }

        _;
    }

    /// @notice Allows user to mint tokens at a quantity
    modifier canMintTokens(uint256 quantity) {
        if (quantity + _totalMinted() > config.editionSize) {
            revert Mint_SoldOut();
        }

        _;
    }

    function _presaleActive() internal view returns (bool) {
        return
            salesConfig.presaleStart <= block.timestamp &&
            salesConfig.presaleEnd > block.timestamp;
    }

    function _publicSaleActive() internal view returns (bool) {
        return
            salesConfig.publicSaleStart <= block.timestamp &&
            salesConfig.publicSaleEnd > block.timestamp;
    }

    /// @notice Presale active
    modifier onlyPresaleActive() {
        if (!_presaleActive()) {
            revert Presale_Inactive();
        }

        _;
    }

    /// @notice Public sale active
    modifier onlyPublicSaleActive() {
        if (!_publicSaleActive()) {
            revert Sale_Inactive();
        }

        _;
    }

    /// @notice Getter for last minted token ID (gets next token id and subtracts 1)
    function _lastMintedTokenId() internal view returns (uint256) {
        return _currentIndex - 1;
    }

    /// @notice Start token ID for minting (1-100 vs 0-99)
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    /// @notice Global constructor – these variables will not change with further proxy deploys
    /// @dev Marked as an initializer to prevent storage being used of base implementation. Can only be init'd by a proxy.
    /// @param _zoraFeeManager Zora Fee Manager
    /// @param _zoraERC721TransferHelper Transfer helper
    constructor(
        IZoraFeeManager _zoraFeeManager,
        address _zoraERC721TransferHelper,
        FactoryUpgradeGate _factoryUpgradeGate
    ) initializer {
        zoraFeeManager = _zoraFeeManager;
        zoraERC721TransferHelper = _zoraERC721TransferHelper;
        factoryUpgradeGate = _factoryUpgradeGate;
    }

    ///  @dev Create a new drop contract
    ///  @param _contractName Contract name
    ///  @param _contractSymbol Contract symbol
    ///  @param _initialOwner User that owns and can mint the edition, gets royalty and sales payouts and can update the base url if needed.
    ///  @param _fundsRecipient Wallet/user that receives funds from sale
    ///  @param _editionSize Number of editions that can be minted in total. If 0, unlimited editions can be minted.
    ///  @param _royaltyBPS BPS of the royalty set on the contract. Can be 0 for no royalty.
    ///  @param _salesConfig New sales config to set upon init
    ///  @param _metadataRenderer Renderer contract to use
    ///  @param _metadataRendererInit Renderer data initial contract
    function initialize(
        string memory _contractName,
        string memory _contractSymbol,
        address _initialOwner,
        address payable _fundsRecipient,
        uint64 _editionSize,
        uint16 _royaltyBPS,
        SalesConfiguration memory _salesConfig,
        IMetadataRenderer _metadataRenderer,
        bytes memory _metadataRendererInit
    ) public initializer {
        // Setup ERC721A
        __ERC721A_init(_contractName, _contractSymbol);
        // Setup access control
        __AccessControl_init();
        // Setup re-entracy guard
        __ReentrancyGuard_init();
        // Setup the owner role
        _setupRole(DEFAULT_ADMIN_ROLE, _initialOwner);
        // Set ownership to original sender of contract call
        _setOwner(_initialOwner);

        if (config.royaltyBPS > MAX_ROYALTY_BPS) {
            revert Setup_RoyaltyPercentageTooHigh(MAX_ROYALTY_BPS);
        }

        // Update salesConfig
        salesConfig = _salesConfig;

        // Setup config variables
        config.editionSize = _editionSize;
        config.metadataRenderer = _metadataRenderer;
        config.royaltyBPS = _royaltyBPS;
        config.fundsRecipient = _fundsRecipient;
        _metadataRenderer.initializeWithData(_metadataRendererInit);
    }

    /// @dev Getter for admin role associated with the contract to handle metadata
    /// @return boolean if address is admin
    function isAdmin(address user) external view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, user);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyAdmin
    {
        if (
            !factoryUpgradeGate.isValidUpgradePath(
                newImplementation,
                address(this)
            )
        ) {
            revert Admin_InvalidUpgradeAddress(newImplementation);
        }
    }

    /// @param tokenId Token ID to burn
    /// @notice User burn function for token id
    function burn(uint256 tokenId) public {
        _burn(tokenId, true);
    }

    /// @dev Get royalty information for token
    /// @param _salePrice Sale price for the token
    function royaltyInfo(uint256, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        if (config.fundsRecipient == address(0)) {
            return (config.fundsRecipient, 0);
        }
        return (
            config.fundsRecipient,
            (_salePrice * config.royaltyBPS) / 10_000
        );
    }

    /// @notice Sale details
    /// @return IERC721Drop.SaleDetails sale information details
    function saleDetails()
        external
        view
        returns (IERC721Drop.SaleDetails memory)
    {
        return
            IERC721Drop.SaleDetails({
                publicSaleActive: _publicSaleActive(),
                presaleActive: _presaleActive(),
                publicSalePrice: salesConfig.publicSalePrice,
                publicSaleStart: salesConfig.publicSaleStart,
                publicSaleEnd: salesConfig.publicSaleEnd,
                presaleStart: salesConfig.presaleStart,
                presaleEnd: salesConfig.presaleEnd,
                presaleMerkleRoot: salesConfig.presaleMerkleRoot,
                totalMinted: _totalMinted(),
                maxSupply: config.editionSize,
                maxSalePurchasePerAddress: salesConfig.maxSalePurchasePerAddress
            });
    }

    /// @dev Number of NFTs the user has minted per address
    /// @param minter to get counts for
    function mintedPerAddress(address minter)
        external
        view
        override
        returns (IERC721Drop.AddressMintDetails memory)
    {
        return
            IERC721Drop.AddressMintDetails({
                presaleMints: presaleMintsByAddress[minter],
                publicMints: _numberMinted(minter) -
                    presaleMintsByAddress[minter],
                totalMints: _numberMinted(minter)
            });
    }

    /// @dev Setup auto-approval for Zora v3 access to sell NFT
    ///      Still requires approval for module
    /// @param nftOwner owner of the nft
    /// @param operator operator wishing to transfer/burn/etc the NFTs
    function isApprovedForAll(address nftOwner, address operator)
        public
        view
        override(ERC721AUpgradeable)
        returns (bool)
    {
        if (operator == zoraERC721TransferHelper) {
            return true;
        }
        return super.isApprovedForAll(nftOwner, operator);
    }

    /// @dev Gets the zora fee for amount of withdraw
    /// @param amount amount of funds to get fee for
    function zoraFeeForAmount(uint256 amount)
        public
        returns (address payable, uint256)
    {
        (address payable recipient, uint256 bps) = zoraFeeManager
            .getZORAWithdrawFeesBPS(address(this));
        return (recipient, (amount * bps) / 10_000);
    }

    /**
     *** ---------------------------------- ***
     ***                                    ***
     ***     PUBLIC MINTING FUNCTIONS       ***
     ***                                    ***
     *** ---------------------------------- ***
     ***/

    /**
      @dev This allows the user to purchase a edition edition
           at the given price in the contract.
     */
    function purchase(uint256 quantity)
        external
        payable
        nonReentrant
        canMintTokens(quantity)
        onlyPublicSaleActive
        returns (uint256)
    {
        uint256 salePrice = salesConfig.publicSalePrice;

        if (msg.value != salePrice * quantity) {
            revert Purchase_WrongPrice(salePrice * quantity);
        }

        if (
            _numberMinted(_msgSender()) +
                quantity -
                presaleMintsByAddress[_msgSender()] >
            salesConfig.maxSalePurchasePerAddress
        ) {
            revert Purchase_TooManyForAddress();
        }

        _mintNFTs(_msgSender(), quantity);
        uint256 firstMintedTokenId = _lastMintedTokenId() - quantity;

        emit IERC721Drop.Sale({
            to: _msgSender(),
            quantity: quantity,
            pricePerToken: salePrice,
            firstPurchasedTokenId: firstMintedTokenId
        });
        return firstMintedTokenId;
    }

    /// @notice Function to mint NFTs
    /// @dev (important: Does not enforce max supply limit, enforce that limit earlier)
    /// @dev This batches in size of 8 as per recommended by ERC721A creators
    /// @param to address to mint NFTs to
    /// @param quantity number of NFTs to mint
    function _mintNFTs(address to, uint256 quantity) internal {
        do {
            uint256 toMint = quantity > MAX_MINT_BATCH_SIZE
                ? MAX_MINT_BATCH_SIZE
                : quantity;
            _mint({to: to, quantity: toMint});
            quantity -= toMint;
        } while (quantity > 0);
    }

    /// @notice Merkle-tree based presale purchase function
    /// @param quantity quantity to purchase
    /// @param maxQuantity max quantity that can be purchased via merkle proof #
    /// @param pricePerToken price that each token is purchased at
    /// @param merkleProof proof for presale mint
    function purchasePresale(
        uint256 quantity,
        uint256 maxQuantity,
        uint256 pricePerToken,
        bytes32[] calldata merkleProof
    )
        external
        payable
        nonReentrant
        canMintTokens(quantity)
        onlyPresaleActive
        returns (uint256)
    {
        if (
            !MerkleProofUpgradeable.verify(
                merkleProof,
                salesConfig.presaleMerkleRoot,
                keccak256(
                    // address, uint256, uint256
                    abi.encode(msg.sender, maxQuantity, pricePerToken)
                )
            )
        ) {
            revert Presale_MerkleNotApproved();
        }

        if (msg.value != pricePerToken * quantity) {
            revert Purchase_WrongPrice(pricePerToken * quantity);
        }

        presaleMintsByAddress[_msgSender()] += quantity;
        if (presaleMintsByAddress[_msgSender()] > maxQuantity) {
            revert Presale_TooManyForAddress();
        }

        _mintNFTs(_msgSender(), quantity);
        uint256 firstMintedTokenId = _lastMintedTokenId() - quantity;

        emit IERC721Drop.Sale({
            to: _msgSender(),
            quantity: quantity,
            pricePerToken: pricePerToken,
            firstPurchasedTokenId: firstMintedTokenId
        });

        return firstMintedTokenId;
    }

    /**
     *** ---------------------------------- ***
     ***                                    ***
     ***     ADMIN MINTING FUNCTIONS        ***
     ***                                    ***
     *** ---------------------------------- ***
     ***/

    /// @notice Mint admin
    /// @param recipient recipient to mint to
    /// @param quantity quantity to mint
    function adminMint(address recipient, uint256 quantity)
        external
        onlyRoleOrAdmin(MINTER_ROLE)
        canMintTokens(quantity)
        returns (uint256)
    {
        _mintNFTs(recipient, quantity);

        return _lastMintedTokenId();
    }

    /// @dev This mints multiple editions to the given list of addresses.
    /// @param recipients list of addresses to send the newly minted editions to
    function adminMintAirdrop(address[] calldata recipients)
        external
        override
        onlyRoleOrAdmin(MINTER_ROLE)
        canMintTokens(recipients.length)
        returns (uint256)
    {
        uint256 atId = _currentIndex;
        uint256 startAt = atId;

        unchecked {
            for (
                uint256 endAt = atId + recipients.length;
                atId < endAt;
                atId++
            ) {
                _mintNFTs(recipients[atId - startAt], 1);
            }
        }
        return _lastMintedTokenId();
    }

    /**
     *** ---------------------------------- ***
     ***                                    ***
     ***  ADMIN CONFIGURATION FUNCTIONS     ***
     ***                                    ***
     *** ---------------------------------- ***
     ***/

    /// @dev Set new owner for royalties / opensea
    /// @param newOwner new owner to set
    function setOwner(address newOwner) public onlyAdmin {
        _setOwner(newOwner);
    }

    /// @dev This sets the sales configuration
    // / @param publicSalePrice New public sale price
    function setSaleConfiguration(
        uint104 publicSalePrice,
        uint32 maxSalePurchasePerAddress,
        uint64 publicSaleStart,
        uint64 publicSaleEnd,
        uint64 presaleStart,
        uint64 presaleEnd,
        bytes32 presaleMerkleRoot
    ) external onlyAdmin {
        // SalesConfiguration storage newConfig = SalesConfiguration({
        //     publicSaleStart: publicSaleStart,
        //     publicSaleEnd: publicSaleEnd,
        //     presaleStart: presaleStart,
        //     presaleEnd: presaleEnd,
        //     publicSalePrice: publicSalePrice,
        //     maxSalePurchasePerAddress: maxSalePurchasePerAddress,
        //     presaleMerkleRoot: presaleMerkleRoot
        // });
        salesConfig.publicSalePrice = publicSalePrice;
        salesConfig.maxSalePurchasePerAddress = maxSalePurchasePerAddress;
        salesConfig.publicSaleStart = publicSaleStart;
        salesConfig.publicSaleEnd = publicSaleEnd;
        salesConfig.presaleStart = presaleStart;
        salesConfig.presaleEnd = presaleEnd;
        salesConfig.presaleMerkleRoot = presaleMerkleRoot;

        emit SalesConfigChanged(_msgSender());
    }

    /// @notice Set a different funds recipient
    /// @param newRecipientAddress new funds recipient address
    function setFundsRecipient(address payable newRecipientAddress)
        external
        onlyRoleOrAdmin(SALES_MANAGER_ROLE)
    {
        // TODO(iain): funds recipient cannot be 0?
        config.fundsRecipient = newRecipientAddress;
        emit FundsRecipientChanged(newRecipientAddress, _msgSender());
    }

    /// @notice This withdraws ETH from the contract to the contract owner.
    function withdraw() external nonReentrant {
        address sender = _msgSender();

        // Get fee amount
        uint256 funds = address(this).balance;
        (address payable feeRecipient, uint256 zoraFee) = zoraFeeForAmount(
            funds
        );

        if (
            !hasRole(DEFAULT_ADMIN_ROLE, sender) &&
            !hasRole(SALES_MANAGER_ROLE, sender) &&
            sender != feeRecipient &&
            sender != config.fundsRecipient
        ) {
            revert Access_WithdrawNotAllowed();
        }

        // Payout ZORA fee
        if (zoraFee > 0) {
            (bool successFee, ) = feeRecipient.call{
                value: zoraFee,
                gas: FUNDS_SEND_GAS_LIMIT
            }("");
            if (!successFee) {
                revert Withdraw_FundsSendFailure();
            }
            funds -= zoraFee;
        }

        // Payout recipient
        (bool successFunds, ) = config.fundsRecipient.call{
            value: funds,
            gas: FUNDS_SEND_GAS_LIMIT
        }("");
        if (!successFunds) {
            revert Withdraw_FundsSendFailure();
        }
    }

    /// @notice Admin function to finalize and open edition sale
    function finalizeOpenEdition()
        external
        onlyRoleOrAdmin(SALES_MANAGER_ROLE)
    {
        if (config.editionSize != type(uint64).max) {
            revert Admin_UnableToFinalizeNotOpenEdition();
        }

        config.editionSize = uint64(_totalMinted());
        emit OpenMintFinalized(_msgSender(), config.editionSize);
    }

    /**
     *** ---------------------------------- ***
     ***                                    ***
     ***      GENERAL GETTER FUNCTIONS      ***
     ***                                    ***
     *** ---------------------------------- ***
     ***/

    /// @notice Simple override for owner interface.
    /// @return user owner address
    function owner()
        public
        view
        override(OwnableSkeleton, IERC721Drop)
        returns (address)
    {
        return super.owner();
    }

    /// @notice Contract URI Getter, proxies to metadataRenderer
    /// @return Contract URI
    function contractURI() external view returns (string memory) {
        return config.metadataRenderer.contractURI();
    }

    /// @notice Getter for metadataRenderer contract
    function metadataRenderer() external view returns (IMetadataRenderer) {
        return IMetadataRenderer(config.metadataRenderer);
    }

    /// @notice Token URI Getter, proxies to metadataRenderer
    /// @param tokenId id of token to get URI for
    /// @return Token URI
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) {
            revert IERC721AUpgradeable.URIQueryForNonexistentToken();
        }

        return config.metadataRenderer.tokenURI(tokenId);
    }

    /// @notice ERC165 supports interface
    /// @param interfaceId interface id to check if supported
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(
            IERC165Upgradeable,
            ERC721AUpgradeable,
            AccessControlUpgradeable
        )
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId) ||
            type(IOwnable).interfaceId == interfaceId ||
            type(IERC2981Upgradeable).interfaceId == interfaceId ||
            type(IERC721Drop).interfaceId == interfaceId;
    }
}
