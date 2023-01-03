import { FC } from "react"
import styles from "../styles/Home.module.css"

interface TotalBonkBurnedProps {
  bonkBurned: number
}

const TotalBonkBurned: FC<TotalBonkBurnedProps> = (props:TotalBonkBurnedProps) => {
  return (
    <p className={styles.description}>
      TOTAL BONK BURNED:<span className='bonk-amt'>{props.bonkBurned.toLocaleString(undefined,{maximumFractionDigits:0})}</span> 
    </p>
  )
}

export default TotalBonkBurned