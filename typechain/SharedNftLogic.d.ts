/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface SharedNftLogicInterface extends ethers.utils.Interface {
  functions: {
    "base64Encode(bytes)": FunctionFragment;
    "createMetadataJSON(string,string,string,uint256,uint256)": FunctionFragment;
    "createMetadataSerial(string,string,string,string,uint256,uint256)": FunctionFragment;
    "encodeMetadataJSON(bytes)": FunctionFragment;
    "numberToString(uint256)": FunctionFragment;
    "tokenMediaData(string,string,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "base64Encode",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createMetadataJSON",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMetadataSerial",
    values: [string, string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeMetadataJSON",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "numberToString",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenMediaData",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "base64Encode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMetadataJSON",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMetadataSerial",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeMetadataJSON",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberToString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenMediaData",
    data: BytesLike
  ): Result;

  events: {};
}

export class SharedNftLogic extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SharedNftLogicInterface;

  functions: {
    base64Encode(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "base64Encode(bytes)"(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "createMetadataJSON(string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    createMetadataSerial(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "createMetadataSerial(string,string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "encodeMetadataJSON(bytes)"(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "numberToString(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "tokenMediaData(string,string,uint256)"(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  base64Encode(args: BytesLike, overrides?: CallOverrides): Promise<string>;

  "base64Encode(bytes)"(
    args: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  createMetadataJSON(
    name: string,
    description: string,
    mediaData: string,
    tokenOfSerial: BigNumberish,
    serialSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "createMetadataJSON(string,string,string,uint256,uint256)"(
    name: string,
    description: string,
    mediaData: string,
    tokenOfSerial: BigNumberish,
    serialSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  createMetadataSerial(
    name: string,
    description: string,
    imageUrl: string,
    animationUrl: string,
    tokenOfSerial: BigNumberish,
    serialSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "createMetadataSerial(string,string,string,string,uint256,uint256)"(
    name: string,
    description: string,
    imageUrl: string,
    animationUrl: string,
    tokenOfSerial: BigNumberish,
    serialSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeMetadataJSON(
    json: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "encodeMetadataJSON(bytes)"(
    json: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  numberToString(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "numberToString(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenMediaData(
    imageUrl: string,
    animationUrl: string,
    tokenOfSerial: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "tokenMediaData(string,string,uint256)"(
    imageUrl: string,
    animationUrl: string,
    tokenOfSerial: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    base64Encode(args: BytesLike, overrides?: CallOverrides): Promise<string>;

    "base64Encode(bytes)"(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "createMetadataJSON(string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    createMetadataSerial(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "createMetadataSerial(string,string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "encodeMetadataJSON(bytes)"(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "numberToString(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "tokenMediaData(string,string,uint256)"(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    base64Encode(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "base64Encode(bytes)"(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "createMetadataJSON(string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createMetadataSerial(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "createMetadataSerial(string,string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "encodeMetadataJSON(bytes)"(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "numberToString(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenMediaData(string,string,uint256)"(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    base64Encode(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "base64Encode(bytes)"(
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "createMetadataJSON(string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      mediaData: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createMetadataSerial(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "createMetadataSerial(string,string,string,string,uint256,uint256)"(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      serialSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "encodeMetadataJSON(bytes)"(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "numberToString(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenMediaData(string,string,uint256)"(
      imageUrl: string,
      animationUrl: string,
      tokenOfSerial: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
