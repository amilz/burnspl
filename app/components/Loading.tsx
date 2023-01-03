import { FC } from "react"
import styles from "../styles/Home.module.css"

interface LoadingProps {
    show: boolean,
    text: string
  }

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
    return (props.show?
        <div className={styles.blink}>{props.text}</div>: <></>
    )
}

export default Loading


