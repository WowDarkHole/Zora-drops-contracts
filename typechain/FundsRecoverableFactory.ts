/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FundsRecoverable } from "./FundsRecoverable";

export class FundsRecoverableFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<FundsRecoverable> {
    return super.deploy(overrides || {}) as Promise<FundsRecoverable>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FundsRecoverable {
    return super.attach(address) as FundsRecoverable;
  }
  connect(signer: Signer): FundsRecoverableFactory {
    return super.connect(signer) as FundsRecoverableFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FundsRecoverable {
    return new Contract(address, _abi, signerOrProvider) as FundsRecoverable;
  }
}

const _abi = [
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
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6104628061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630614117a1461005c578063715018a6146100665780638980f11f1461006e5780638da5cb5b14610081578063f2fde38b146100a5575b600080fd5b6100646100b8565b005b61006461017f565b61006461007c3660046103ab565b6101ba565b61008961026e565b6040516001600160a01b03909116815260200160405180910390f35b6100646100b3366004610389565b61027d565b336100c161026e565b6001600160a01b0316146100f05760405162461bcd60e51b81526004016100e7906103f7565b60405180910390fd5b6040514790600090339083908381818185875af1925050503d8060008114610134576040519150601f19603f3d011682016040523d82523d6000602084013e610139565b606091505b505090508061017b5760405162461bcd60e51b815260206004820152600e60248201526d151c985b9cd9995c91985a5b195960921b60448201526064016100e7565b5050565b3361018861026e565b6001600160a01b0316146101ae5760405162461bcd60e51b81526004016100e7906103f7565b6101b8600061031d565b565b336101c361026e565b6001600160a01b0316146101e95760405162461bcd60e51b81526004016100e7906103f7565b60405163a9059cbb60e01b8152336004820152602481018290526001600160a01b0383169063a9059cbb90604401602060405180830381600087803b15801561023157600080fd5b505af1158015610245573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026991906103d5565b505050565b6000546001600160a01b031690565b3361028661026e565b6001600160a01b0316146102ac5760405162461bcd60e51b81526004016100e7906103f7565b6001600160a01b0381166103115760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016100e7565b61031a8161031d565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b038116811461038457600080fd5b919050565b60006020828403121561039b57600080fd5b6103a48261036d565b9392505050565b600080604083850312156103be57600080fd5b6103c78361036d565b946020939093013593505050565b6000602082840312156103e757600080fd5b815180151581146103a457600080fd5b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260408201526060019056fea2646970667358221220086867dd20b9b86ed97a5537029c8823eba8ccf5fda81c2f4e2b42315efb2d6864736f6c63430008060033";
