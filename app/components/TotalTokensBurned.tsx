import { FC } from "react"
import styles from "../styles/Home.module.css"
import { TOKEN_CONFIG } from "../utils/constants"

interface TotalTokensBurnedProps {
  tokensBurned: number
}

const TotalTokensBurned: FC<TotalTokensBurnedProps> = (props:TotalTokensBurnedProps) => {
  return (
    <p className={styles.center}>
      TOTAL {TOKEN_CONFIG.symbol} BURNED:<span className='token-amt'>{props.tokensBurned.toLocaleString(undefined,{maximumFractionDigits:0})}</span> 
    </p>
  )
}

export default TotalTokensBurned