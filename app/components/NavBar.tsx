import { FC } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import styles from "../styles/Home.module.css"
import WalletBalances from "./WalletBalances"

interface NavBarProps {
  tokenBalance?: number,
  tokenSymbol?: string
}

const NavBar: FC<NavBarProps> = (props: NavBarProps) => {
  return (
    <>
      <div id="nav-title">The Bonk Fire
        <p className={styles.description}>
          Burn $BONK to join the ranks!
        </p>
      </div>
      <div id="navbar">
        {(props.tokenBalance && (props.tokenBalance > 0)) ?
          <><br /><div className='token-balance'>Balance: {props.tokenBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })} {props.tokenSymbol}</div></>
          : <></>
        }
        <div className="the-wallet-adapter"><WalletMultiButton className={styles["wallet-adapter-button-trigger"]} /></div>
      </div>
    </>

  )
}

export default NavBar
