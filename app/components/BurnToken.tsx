import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { FC, useState } from "react"
import { TOKEN_CONFIG } from "../utils/constants";
import { createBurnIx } from "../utils/instructions";
import { generateExplorerUrl } from "../utils/solana";
import Loading from "./Loading";
import { useWorkspace } from "./WorkspaceProvider";

interface BurnTokenProps {
  onBurn: () => void,
  mint: PublicKey
}

const BurnToken: FC<BurnTokenProps> = (props:BurnTokenProps) => {
  const [burnAmount, setBurnAmount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { connection } = useConnection();
  const { burnBoardProgram } = useWorkspace();
  const walletAdapter = useWallet();

  const updateNumber = () => {
    
  }
  const handleBurn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (burnAmount <= 0) {
      setError('Enter a positive value');
      return;
    }
    setLoading(true);
    burnTokens(burnAmount);
    setError('');
  }
  const burnTokens = async (amount: number) => {
    if (!burnBoardProgram) throw new Error('No Program Found');
    if (!walletAdapter.publicKey || !walletAdapter) throw new Error('No PubKey Found');

    try {
      const transaction = new Transaction;
      let txInstructions = await createBurnIx(
        burnBoardProgram,
        walletAdapter.publicKey,
        props.mint,
        amount
      );
      transaction.add(txInstructions);
  
      // Step 1 - Fetch Latest Blockhash
      let latestBlockhash = await connection.getLatestBlockhash('finalized');
      console.log("   ✅ - Fetched latest blockhash. Last Valid Height:", latestBlockhash.lastValidBlockHeight);
  
      let signature = await walletAdapter.sendTransaction(transaction, connection)
      let confirmation = await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
      });
      if (confirmation.value.err) throw new Error("Error: Could not confirm transaction");
      console.log('   ✅ - Success!', generateExplorerUrl(signature));
      props.onBurn();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }


  }
  return (
    loading ? <Loading show={true} text={`BURNING ${TOKEN_CONFIG.symbol}`}/>:
    <form onSubmit={handleBurn}>
    <label>
      How much ${TOKEN_CONFIG.symbol} to burn? &nbsp;
      <input
        name="burnAmount"
        required
        id="enterBurn"
        type="number"
        min={1}
        value={burnAmount}
        pattern="[0-9]*"
        onChange={(e) => setBurnAmount(parseInt(e.target.value))} />
        </label>
    <button type="submit">BURN</button>
  </form>
  )
}

export default BurnToken;

