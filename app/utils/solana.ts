import { Cluster, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_MINT } from './constants'
import { BurnScoreWithPda } from "./idl";

export function generateExplorerUrl(txId:string, cluster: Cluster = 'devnet', address?: string){
    if (!address) return `https://explorer.solana.com/tx/${txId}/?cluster=${cluster}`;
    return `https://explorer.solana.com/address/${address}?cluster=devnet`
}

export async function getSolBalance(connection: Connection, wallet:PublicKey) {
    let balance = 0;
    try {
        balance = await connection.getBalance(
          wallet,
          'confirmed'
        );
        balance = balance / LAMPORTS_PER_SOL;
        console.log(`${wallet.toString()} balance: ${balance} SOL.`)
      } catch (e) {
        console.log(`error getting balance: `, e);
      }
      finally {
          return balance;
      }
}

export interface TokenAccounts {
    mintAddress: string,
    quantity: number
}

export async function getBonkBalance(wallet: string, solanaConnection: Connection) {
  const tokenAccounts = await solanaConnection.getTokenAccountsByOwner(
    new PublicKey(wallet),
    {mint: TOKEN_MINT},
  )
  const balances = await Promise.all(tokenAccounts.value.map(async ({pubkey}) => {
    const balance = await solanaConnection.getTokenAccountBalance(pubkey)
    return balance.value.uiAmount ?? 0
  }))

  return balances.reduce((acc, curr) => acc + curr, 0)
}

export const shortWallet = (pubkey: PublicKey): string => {
  const length = pubkey.toString().length;
  return `${pubkey.toString().substring(0,5)}...${pubkey.toString().substring(length-4)}`
}

export const calcTotalBurn = (burns: BurnScoreWithPda[]): number => {
  let result = 0;
  result = burns.reduce((partialSum, a) => partialSum + a.account.burnedTokens, 0)
  return result;
}
