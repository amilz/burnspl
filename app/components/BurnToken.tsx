import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react"
import { createBurnIx } from "../utils/instructions";
import { MintWithMetadata } from "../utils/metaplex";
import { generateExplorerUrl } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";
import Loading from "./Loading";

interface BurnTokenProps {
  onBurn: () => void,
  tokenData: MintWithMetadata
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
        props.tokenData.mint,
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
    loading ? <Loading show={true} text={`🔥 BURNING ${props.tokenData.symbol} 🔥`}/>:
    <form onSubmit={handleBurn}>
    <label>
      How much ${props.tokenData.symbol} to burn? &nbsp;
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

