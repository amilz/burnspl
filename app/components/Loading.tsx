import { FC } from "react"
import styles from "../styles/Home.module.css"
import Image from "next/image";
import CoinSpinner from "../public/coin.gif";

const Loading: FC = () => {
    return (
        <Image src={CoinSpinner} height={100} alt="Flipping"/>
    )
}

export default Loading


