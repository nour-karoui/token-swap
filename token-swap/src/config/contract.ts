import TokenSwapABI from '../abi/TokenSwap.json' with { type: 'json' }
import TokenABI from '../abi/Token.json' with {type: 'json'}
import { baseSepolia } from 'wagmi/chains';

export const TokenSwapContractConfig = {
  address: "0xf46c0d70734A96cC91AF43278668f35e7c09D76D",
  abi: TokenSwapABI,
  chainId: baseSepolia.id,
} as const;

export const TokenContractConfig = {
    abi: TokenABI,
    chainId: baseSepolia.id,
} as const

export const TokenAAddress = '0x1f22CfA0a766A38de741265f61558406f3fdCB17'
export const TokenBAddress = '0x80a0314327e5Fa3aE9e2EE17b2F5F021e061952b'
