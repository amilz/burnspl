import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { createFlipInstructions } from "../utils/instructions";
import { generateExplorerUrl } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";
import Image from 'next/image'
import Loading from "./Loading";

type FlipStatus = 'Win' | 'Lose' | null;

interface FlipCoinPops {
  onWin: () => void,
}
const FlipCoin: FC<FlipCoinPops> = (props: FlipCoinPops) => {
  const [flipStatus, setFlipStatus] = useState<FlipStatus>(null);
  const [flipping, setFlipping] = useState<boolean>(false);
  const workspace = useWorkspace();
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  async function flipCoin(pick: 0 | 1) {
    if (pick !== 0 && pick !== 1) throw new Error('Invalid Flip');
    setFlipping(true);
    const tolyProgram = workspace.coreTolyProgram;
    if (!tolyProgram) throw new Error('No Program Found');
    if (!walletAdapter.publicKey || !walletAdapter) throw new Error('No PubKey Found');
    const transaction = new Transaction;
    let txInstructions = await createFlipInstructions(
      tolyProgram,
      walletAdapter.publicKey,
      pick
    );
    transaction.add(txInstructions)
    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await connection.getLatestBlockhash('confirmed');
    console.log("   ✅ - Fetched latest blockhash. Last Valid Height:", latestBlockhash.lastValidBlockHeight);
    
    let signature = await walletAdapter.sendTransaction(transaction, connection)
    /*     let signedTx = await signTransaction(transaction)
        let signature = await connection.sendTransaction(signedTx);
        console.log(signature); */
    let confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    });
    if (confirmation.value.err) throw new Error("Error: Could not confirm transaction");
    console.log('   ✅ - Success!', generateExplorerUrl(signature));
    const [streak_pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("winning_streak"), walletAdapter.publicKey.toBuffer()],
      tolyProgram.programId
    );
    let streak_data = await tolyProgram.account.streak.fetch(streak_pda);
    const streak: number = streak_data.counter.toNumber();
    //const bn: BN = new BN(streak.counter);
    console.log(streak);
    setFlipStatus(streak > 0 ? 'Win' : 'Lose');
    setFlipping(false);
    if (streak > 0) { props.onWin() }
  }
  return (
    <>
      {!flipStatus && (<a href="#" className={styles.card}
        onClick={() => {
          return false;
        }}>
        <h2>{!flipping ? 'Flip a Coin! Win a Mint!': 'Flip in progress'}</h2> 

        {!flipping ?(
        <p>
          <button
            onClick={() => {
              flipCoin(0);
            }}
          >Heads</button>
          <button
            onClick={() => {
              flipCoin(1);
            }}
          >Tails</button>
        </p>)
        : <Loading/>
        }

      </a>)}
      {flipStatus && (<a href="#" className={styles.card}
        onClick={() => {
          setFlipStatus(null);
          return false;
        }}>
        <h2>{flipStatus}</h2>
        <p>{flipStatus === 'Win' ? "Congrats!" : "Sorry!"}</p>
        <p>click to play again</p>

      </a>)}
    </>
  )
}

export default FlipCoin;

