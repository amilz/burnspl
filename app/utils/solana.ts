import { Cluster, Connection, LAMPORTS_PER_SOL, PublicKey, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BONK_MINT } from "./constants";
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
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: wallet,  //our search criteria, a base58 encoded string
          },            
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
    );
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    const tokenSummary: TokenAccounts[] = accounts.map((account,i)=>{
        const parsedAccountInfo:any = account.account.data;
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        const quantity: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        return {
            mintAddress,
            quantity
        }
    });
    const wlBalance = findBonkAccount(tokenSummary);
    console.log(wlBalance);
    return wlBalance;
}

export const findBonkAccount = (holderTokens: TokenAccounts[]):number => {
  const bonkAccount = holderTokens.find(tokenAccount=>{
    return tokenAccount.mintAddress === BONK_MINT.toString();
  })
  if (!bonkAccount) return 0;
  return bonkAccount.quantity;
}

export const shortWallet = (pubkey: PublicKey): string => {
  const length = pubkey.toString().length;
  return `${pubkey.toString().substring(0,5)}...${pubkey.toString().substring(length-4)}`
}

export const calcTotalBurn = (burns: BurnScoreWithPda[]): number => {
  let result = 0;
  burns.forEach(burn=>result+=burn.account.burnedTokens);
  return result;
}