import { FC } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import styles from "../styles/Home.module.css"

const NavBar: FC = () => {
  return (

      <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />

  )
}

export default NavBar