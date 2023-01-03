import { FC } from "react"
import styles from "../styles/Home.module.css"

interface TotalBonkBurnedProps {
  bonkBurned: number
}

const TotalBonkBurned: FC<TotalBonkBurnedProps> = (props:TotalBonkBurnedProps) => {
  return (
    <p className={styles.description}>
      TOTAL BONK BURNED:<div className='bonk-amt'>{props.bonkBurned}</div> 
    </p>
  )
}

export default TotalBonkBurned

