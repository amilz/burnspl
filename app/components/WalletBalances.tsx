import { FC } from "react"
import styles from "../styles/Home.module.css"

interface WalletBalancesProps {
  solBalance: number,
  tokenBalance: number
}

const WalletBalances: FC<WalletBalancesProps> = (props:WalletBalancesProps) => {
  return (
    <p className={styles.description}>
      Wallet Balance: <code className={styles.code}>◎{props.solBalance}</code> 
      and <code className={styles.code}>{props.tokenBalance}</code> $BONK.
    </p>
  )
}

export default WalletBalances

