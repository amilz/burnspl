import { createAccount } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react"
import styles from "../styles/Home.module.css"
import { createInitBurnAccountIx } from "../utils/instructions";
import { generateExplorerUrl } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";

interface BurnBonkProps {
  onBurn: () => void,
}

const Init: FC<BurnBonkProps> = (props:BurnBonkProps) => {
  const [burnAmount, setBurnAmount] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const { connection } = useConnection();
  const { burnBonkProgram } = useWorkspace();
  const walletAdapter = useWallet();

  const updateNumber = () => {
    
  }
  const handleCreateAccount = () => {
    if (!userName) {
      setError('No name entered');
      return;
    }
    // Make sure input is string and eliminate whitespace
    let inputUserName = userName.toString().trim();
    if (inputUserName.length < 3) {
      setError('Name is too short');
      return;
    }
    if (inputUserName.length > 8) {
      setError('Name is too long');
      return;
    }
    createAccount(inputUserName);
    setError('');
  }
  const createAccount = async (username: string) => {
    if (!burnBonkProgram) throw new Error('No Program Found');
    if (!walletAdapter.publicKey || !walletAdapter) throw new Error('No PubKey Found');
    const transaction = new Transaction;
    let txInstructions = await createInitBurnAccountIx(
      burnBonkProgram,
      walletAdapter.publicKey,
      userName,
    );
    transaction.add(txInstructions);

    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await connection.getLatestBlockhash('finalized');
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
    props.onInit();
  }
  return (
    <a href="#" className={styles.card}
      onClick={() => {
        return false;
      }}>
      <h2>Create Burn Account to join leaderboard</h2>
      <form onSubmit={handleCreateAccount}>
        <label>
          Enter Username  <small>(3-8 char)</small>
          <input
            name="burnAmount"
            required
            id="enterBurn"
            type="number"
            min={1}
            max={99812675359681}
            value={burnAmount}
            onChange={(e) => updateNumber(e)} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </a>
  )
}

export default Init

