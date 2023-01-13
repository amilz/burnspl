import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { FC, useState } from "react";
import { shortWallet, tryParseTokenMint } from "../utils/solana";
import Loading from "./Loading";
import Link from 'next/link';


const Search: FC = () => {
  const [searchAddress, setSearchAddress] = useState<string>('');
  const [foundKey, setFoundKey] = useState<PublicKey>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const { connection } = useConnection();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setIsValid(false);
    setSearchAddress(e.target.value);
    try {
      const searchKey: PublicKey = new PublicKey(e.target.value);
      setError('');
      setFoundKey(searchKey);
      handleSearch(searchKey);
    } catch (e) {
      setError('Not a valid Public Key');
      if (foundKey) { setFoundKey(undefined) }
    }
  }
  const handleSearch = async (pubKey: PublicKey) => {
    if (!pubKey) return;
    setLoading(true);
    const info = await connection.getAccountInfo(pubKey);
    if (!info || !info.data) { setError('Acct Not Found'); setLoading(false); return; };
    const tokenMintData = tryParseTokenMint(info.data, connection);
    if (!tokenMintData) { setError('Acct Valid Mint Accoun'); setLoading(false); return; };
    setLoading(false);
    setIsValid(true);
  }

  return (
    loading ? <Loading show={true} text={`Searching . . . `} /> :
      <form>
        <div className="buttonHolder">
          <br />
          <label>
            Search Mint Address:</label><br /><br />
          <input
            name="mintAddress"
            id="search-bar"
            type="text"
            maxLength={44}
            value={searchAddress}
            onChange={(e) => onValueChange(e)} /><br />
          <br />
          {(!isValid && !foundKey && !error) && <div className="home-descr">Track token burns with your community!<br /><br />Select Token &gt; Create Account &gt; Burn!</div>}
          {error && <div className="search-error">{error}</div>}
          {(isValid && foundKey) && <div className="search-result"><Link href={`/mint/${foundKey.toBase58()}`}>👉 Go burn some {shortWallet(foundKey)} 🔥🔥🔥</Link></div>}
        </div>
      </form>
  )
}

export default Search;

