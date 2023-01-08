import { FC } from "react"
import { MintWithMetadata } from "../utils/metaplex"
import styles from "../styles/Home.module.css"

interface TotalTokensBurnedProps {
  tokensBurned: number,
  tokenData: MintWithMetadata
}

const TotalTokensBurned: FC<TotalTokensBurnedProps> = (props:TotalTokensBurnedProps) => {
  return (
    // TO DO ADD MARGIN IF NO IMAGE (word TOTAL getting cut off)
    <p className={styles.center}>
      TOTAL {props.tokenData.symbol} BURNED:<span className='token-amt'>{props.tokensBurned.toLocaleString(undefined,{maximumFractionDigits:0})}</span> 
    </p>
  )
}

export default TotalTokensBurned