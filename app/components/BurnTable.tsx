import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MintWithMetadata } from "../utils/metaplex";
import { FC, useEffect, useMemo, useState } from "react"
import { BurnScoreWithPda } from "../utils/idl";
import { fetchBurnAcctsByToken } from "../utils/instructions";
import { calcTotalBurn, shortWallet } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";
import BurnToken from "./BurnToken";
import Loading from "./Loading";
import NewUser from "./NewUser";

interface BurnTableProps {
  updateTotalBurn: (amt:number)=>void,
  tokenData: MintWithMetadata,
  maxRows?: number
}

const BurnTable: FC<BurnTableProps> = (props: BurnTableProps) => {
  const [burnScores, setBurnScores] = useState<BurnScoreWithPda[]>([]);
  const [userAccount, setUserAccount] = useState<BurnScoreWithPda>();
  const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [error, setError] = useState<string>('');
  const [totalBurn, setTotalBurn] = useState<number>(0);
  const { connection } = useConnection();
  const { burnBoardProgram } = useWorkspace();
  const walletAdapter = useWallet();

  useEffect(() => {
    if (!burnBoardProgram) return
    setLoadingTable(true);
    (async () => {
      try {
        let burnScores = await fetchBurnAcctsByToken(burnBoardProgram, props.tokenData.mint);
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
        cleanedScores = cleanedScores.sort(function (userA, userB) { return userB.account.burnedTokens - userA.account.burnedTokens });
        //cleanedScores = cleanedScores.flatMap(i => Array.from({ length: 5 }).fill(i)) as BurnScoreWithPda[];
        if (!cleanedScores) return;
        let tot = calcTotalBurn(cleanedScores);
        setTotalBurn(tot);
        props.updateTotalBurn(tot);
        setBurnScores(cleanedScores);
      } catch (err) {
        console.log(err);
      }
      finally {
        setLoadingTable(false);
      }
    })();
  }, [updateTable, burnBoardProgram, props])
  useEffect(() => {
    if (!walletAdapter || !walletAdapter.publicKey || !burnScores) { setUserAccount(undefined) }
    setUserAccount(burnScores.find(user => { return walletAdapter?.publicKey?.toString() == user.account.pyroKey.toString() }));
  }, [walletAdapter, burnScores, connection])

  let showTable = burnScores.length > 0

  return (<>
    {!walletAdapter.publicKey ? <p>Connect Wallet to Burn!</p> :
      userAccount ? <BurnToken tokenData={props.tokenData} onBurn={() => setUpdateTable(!updateTable)} /> :
        <NewUser tokenData={props.tokenData}  onInit={() => setUpdateTable(!updateTable)} />}
    <Loading show={loadingTable} text={`Finding top ${props.tokenData.name}ers`}/>
    {!showTable ? 'Be the first!' : ''}
    {(showTable && burnScores) && <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {burnScores.map((user, i) => {
          return <tr key={i}>
            <td>{i+1}</td>
            <td>{user.account.userName.length > 0 ? user.account.userName: shortWallet(user.account.pyroKey)}</td>
            <td>{user.account.burnedTokens.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
          </tr>
        })}
      </tbody>
    </table>}
  </>
  )
}

export default BurnTable;

