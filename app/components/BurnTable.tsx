import { createAccount } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { FC, useEffect, useMemo, useState } from "react"
import styles from "../styles/Home.module.css"
import { BurnScore, BurnScoreWithPda } from "../utils/idl";
import { createInitBurnAccountIx, fetchBurnAcctsByToken } from "../utils/instructions";
import { generateExplorerUrl, shortWallet } from "../utils/solana";
import BurnBonk from "./BurnBonk";
import NewUser from "./NewUser";
import { useWorkspace } from "./WorkspaceProvider";

interface BurnTableProps {
  mint?: PublicKey,
  maxRows?: number
}

const BurnTable: FC<BurnTableProps> = (props: BurnTableProps) => {
  const [burnScores, setBurnScores] = useState<BurnScoreWithPda[]>([]);
  const [userAccount, setUserAccount] = useState<BurnScoreWithPda>();
  const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [error, setError] = useState<string>('');
  const { connection } = useConnection();
  const { burnBoardProgram } = useWorkspace();
  const walletAdapter = useWallet();

  useMemo(() => {
    if (!burnBoardProgram) return
    setLoadingTable(true);
    (async () => {
      try {
        let burnScores = await fetchBurnAcctsByToken(burnBoardProgram);
        let cleanedScores: BurnScoreWithPda[] = burnScores.map(entry => {
          let { account } = entry;
          return {
            publicKey: entry.publicKey,
            account:
            {
              burnedTokens: account.burnedTokens.toNumber(),
              pyroKey: account.pyroKey,
              numBurns: account.numBurns.toNumber(),
              userName: account.userName,
              mint: account.mint
            }
          }
        });
        cleanedScores = cleanedScores.sort(function (a, b) { return b.account.numBurns - a.account.numBurns });

        if (!cleanedScores) return;
        setBurnScores(cleanedScores);
      } catch (err) {
        console.log(err);
      }
      finally {
        setLoadingTable(false);
      }
    })();
  }, [updateTable])
  useEffect(() => {
    if (!walletAdapter || !walletAdapter.publicKey || !burnScores) { setUserAccount(undefined) }
    setUserAccount(burnScores.find(entry => { return walletAdapter?.publicKey?.toString() == entry.account.pyroKey.toString() }));
  }, [walletAdapter, burnScores, connection])


  return (<>
    {!walletAdapter.publicKey ? <p>Connect Wallet to BONK!</p> :
      userAccount ? <BurnBonk onBurn={() => setUpdateTable(!updateTable)} /> :
        <NewUser onInit={() => setUpdateTable(!updateTable)} />}

    {burnScores && <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Amount</th>
          <th>Pubkey</th>
        </tr>
      </thead>
      <tbody>
        {burnScores.map((entry, i) => {
          return <tr key={i}>
            <td>{i+1}</td>
            <td>{entry.account.userName}</td>
            <td>{entry.account.numBurns.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
            <td>{shortWallet(entry.account.pyroKey)}</td>
          </tr>
        })}
      </tbody>
    </table>}
  </>
  )
}

export default BurnTable;

