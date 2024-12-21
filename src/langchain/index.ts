import { Tool } from "@langchain/core/tools";
import HederaAgentKit from "../agent";


export class HederaCreateFungibleTokenTool extends Tool {
  name = 'hedera_create_fungible_token'

  description = `Create a fungible token on Hedera
Inputs ( input is a JSON string ):
name: string, the name of the token e.g. My Token,
symbol: string, the symbol of the token e.g. MT,
decimals: number, the amount of decimals of the token
initialSupply: number, the initial supply of the token e.g. 100000
`

  constructor(private hederaKit: HederaAgentKit) {
    super()
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);

      const tokenId = await this.hederaKit.createFT(
        parsedInput.name,
        parsedInput.symbol,
        parsedInput.decimals,
        parsedInput.initialSupply
      );

      return JSON.stringify({
        status: "success",
        message: "Token creation successful",
        initialSupply: parsedInput.initialSupply,
        tokenId: tokenId.toString(),
        solidityAddress: tokenId.toSolidityAddress(),
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export function createHederaTools(hederaKit: HederaAgentKit): Tool[] {
  return [
    new HederaCreateFungibleTokenTool(hederaKit)
  ]
}
