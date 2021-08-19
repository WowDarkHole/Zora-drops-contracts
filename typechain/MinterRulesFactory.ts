/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MinterRules } from "./MinterRules";

export class MinterRulesFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MinterRules> {
    return super.deploy(overrides || {}) as Promise<MinterRules>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MinterRules {
    return super.attach(address) as MinterRules;
  }
  connect(signer: Signer): MinterRulesFactory {
    return super.connect(signer) as MinterRulesFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MinterRules {
    return new Contract(address, _abi, signerOrProvider) as MinterRules;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "releaseId",
        type: "uint256",
      },
    ],
    name: "OnNewRelease",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "releaseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "pauseStatus",
        type: "bool",
      },
    ],
    name: "OnPauseChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "isPaused",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "maxAllowed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ethPrice",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "mintableAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mintableCollection",
        type: "uint256",
      },
    ],
    name: "createRelease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "releaseId",
        type: "uint256",
      },
    ],
    name: "getRelease",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxAllowed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentReleased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ethPrice",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "mintableAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "mintableCollection",
            type: "uint256",
          },
        ],
        internalType: "struct MinterRules.SketchRelease",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "releaseId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "recoverETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "releaseId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isPaused",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a33610023565b60018055610073565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610c5f806100826000396000f3fe6080604052600436106100865760003560e01c80638980f11f116100595780638980f11f146101665780638da5cb5b14610186578063a0712d68146101ae578063daff97b5146101cf578063f2fde38b146101ef57600080fd5b80630614117a1461008b578063715018a6146100a257806379af2b9a146100b75780638219e69c14610146575b600080fd5b34801561009757600080fd5b506100a061020f565b005b3480156100ae57600080fd5b506100a061028f565b3480156100c357600080fd5b506100d76100d2366004610b33565b6102c5565b60405161013d9190600060e082019050825115158252602083015160208301526040830151604083015260608301516060830152608083015160018060a01b0380821660808501528060a08601511660a0850152505060c083015160c083015292915050565b60405180910390f35b34801561015257600080fd5b506100a0610161366004610acc565b610356565b34801561017257600080fd5b506100a0610181366004610a83565b610560565b34801561019257600080fd5b506000546040516001600160a01b03909116815260200161013d565b6101c16101bc366004610b33565b61060f565b60405190815260200161013d565b3480156101db57600080fd5b506100a06101ea366004610b65565b610884565b3480156101fb57600080fd5b506100a061020a366004610a5f565b610923565b6000546001600160a01b031633146102425760405162461bcd60e51b815260040161023990610b95565b60405180910390fd5b604051479033908290600081818185875af1925050503d8060008114610284576040519150601f19603f3d011682016040523d82523d6000602084013e610289565b606091505b50505050565b6000546001600160a01b031633146102b95760405162461bcd60e51b815260040161023990610b95565b6102c360006109be565b565b6102cd610a0e565b600282815481106102e0576102e0610bf0565b60009182526020918290206040805160e0810182526007909302909101805460ff16151583526001810154938301939093526002830154908201526003820154606082015260048201546001600160a01b03908116608083015260058301541660a082015260069091015460c082015292915050565b6000546001600160a01b031633146103805760405162461bcd60e51b815260040161023990610b95565b610388610a0e565b861515815260208082018790526001600160a01b03858116608084015260608301879052841660a083015260c082018390526002546040519081527f05d69bbffed50f16c489779926c29eaf0a74ad3b9cc7714c7b00a064350ef420910160405180910390a160028054600181018255600091909152815160079091027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace8101805492151560ff199093169290921790915560208201517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf82015560408201517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad082015560608201517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad182015560808201517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad2820180546001600160a01b039283166001600160a01b03199182161790915560a08401517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad38401805491909316911617905560c0909101517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad490910155505050505050565b6000546001600160a01b0316331461058a5760405162461bcd60e51b815260040161023990610b95565b60405163a9059cbb60e01b8152336004820152602481018290526001600160a01b0383169063a9059cbb90604401602060405180830381600087803b1580156105d257600080fd5b505af11580156105e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060a9190610aaf565b505050565b6000600260015414156106645760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610239565b60026001556000610674836102c5565b8051909150156106af5760405162461bcd60e51b815260206004820152600660248201526514105554d15160d21b6044820152606401610239565b80602001518160400151106106f15760405162461bcd60e51b81526020600482015260086024820152671192539254d2115160c21b6044820152606401610239565b6060810151156107db57348160600151146107365760405162461bcd60e51b8152602060048201526005602482015264505249434560d81b6044820152606401610239565b600081608001516001600160a01b03163461753090604051600060405180830381858888f193505050503d806000811461078c576040519150601f19603f3d011682016040523d82523d6000602084013e610791565b606091505b50509050806107d95760405162461bcd60e51b81526020600482015260146024820152732330b4b632b2103a379039b2b7321022ba3432b960611b6044820152606401610239565b505b6001816040018181516107ee9190610bca565b90525060a081015160405163017c986960e41b8152600481018590523360248201526000916001600160a01b0316906317c9869090604401602060405180830381600087803b15801561084057600080fd5b505af1158015610854573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108789190610b4c565b60018055949350505050565b6000546001600160a01b031633146108ae5760405162461bcd60e51b815260040161023990610b95565b80600283815481106108c2576108c2610bf0565b6000918252602091829020600790910201805460ff19169215159290921790915560408051848152831515928101929092527f644c35128b2d45fe1b834c79f4920da74938730dc54ca1bc0e7cba46b303a01a910160405180910390a15050565b6000546001600160a01b0316331461094d5760405162461bcd60e51b815260040161023990610b95565b6001600160a01b0381166109b25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610239565b6109bb816109be565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040518060e0016040528060001515815260200160008152602001600081526020016000815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081525090565b600060208284031215610a7157600080fd5b8135610a7c81610c06565b9392505050565b60008060408385031215610a9657600080fd5b8235610aa181610c06565b946020939093013593505050565b600060208284031215610ac157600080fd5b8151610a7c81610c1b565b60008060008060008060c08789031215610ae557600080fd5b8635610af081610c1b565b955060208701359450604087013593506060870135610b0e81610c06565b92506080870135610b1e81610c06565b8092505060a087013590509295509295509295565b600060208284031215610b4557600080fd5b5035919050565b600060208284031215610b5e57600080fd5b5051919050565b60008060408385031215610b7857600080fd5b823591506020830135610b8a81610c1b565b809150509250929050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610beb57634e487b7160e01b600052601160045260246000fd5b500190565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03811681146109bb57600080fd5b80151581146109bb57600080fdfea26469706673582212209c3871fcea3782c3405f6aa9ba1cc0e4f01d5723ecce49eec2305cfee58eb11164736f6c63430008060033";
