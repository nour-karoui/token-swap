import TokenSwapABI from '../abi/TokenSwap.json' with { type: 'json' }
import TokenABI from '../abi/Token.json' with {type: 'json'}
import { baseSepolia } from 'wagmi/chains';

export const TokenSwapContractConfig = {
  address: "0x9e196fb7d668bECBd007100318f8137e6C762635",
  abi: TokenSwapABI,
  chainId: baseSepolia.id,
} as const;

export const TokenContractConfig = {
    abi: TokenABI,
    chainId: baseSepolia.id,
} as const

export const TokenAAddress = '0x1f22CfA0a766A38de741265f61558406f3fdCB17'
export const TokenBAddress = '0x80a0314327e5Fa3aE9e2EE17b2F5F021e061952b'
