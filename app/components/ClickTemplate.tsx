import { FC } from "react"
import styles from "../styles/Home.module.css"

const Template: FC = () => {
  return (
    <a href="#" className={styles.card}
      onClick={() => {
        return false;
      }}>
      <h2>Placeholder &rarr;</h2>
      <p>This is just a sample box -- we&apos;ll use this for our components!.</p>
    </a>
  )
}

export default Template

