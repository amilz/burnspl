import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react"
import { createInitBurnAccountIx } from "../utils/instructions";
import { generateExplorerUrl } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";
import { MintWithMetadata } from "../utils/metaplex";
import Loading from "./Loading";

interface NewUserProps {
  onInit: () => void,
  tokenData: MintWithMetadata
}

const NewUser: FC<NewUserProps> = (props:NewUserProps) => {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { connection } = useConnection();
  const { burnBoardProgram } = useWorkspace();
  const walletAdapter = useWallet();

  const updateNumber = () => {
    
  }
  const handleCreateAccount = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Make sure input is string and eliminate whitespace
    let inputUserName = userName.toString().trim();

    if (inputUserName.length < 0) {
      setError('Name is too short');
      return;
    }
    if (inputUserName.length > 8) {
      setError('Name is too long');
      return;
    }
    setLoading(true);
    createAccount(inputUserName);
    setError('');
  }
  const createAccount = async (username: string) => {
    if (!burnBoardProgram) throw new Error('No Program Found');
    if (!walletAdapter.publicKey || !walletAdapter) throw new Error('No PubKey Found');
    try {
      const transaction = new Transaction;
      let txInstructions = await createInitBurnAccountIx(
        burnBoardProgram,
        walletAdapter.publicKey,
        props.tokenData.mint,
        userName
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
      props.onInit();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }

  }
  return (
    loading ? <Loading show={true} text={`New ${props.tokenData.symbol}er in Progress`}/>:
    <form onSubmit={handleCreateAccount}>
      <div className="buttonHolder">

          <button type="submit">Join the {props.tokenData.name} Fire</button><br/>

    <label>
      Username  <small>(optional) </small></label><br/>
      <input
        name="userName"
        id="enterName"
        type="text"
        maxLength={8}
        value={userName}
        onChange={(e) => setUserName(e.target.value)} />
    </div>
  </form>
  )
}

export default NewUser;

