import { FC } from "react"
import styles from "../styles/Home.module.css"
import github from '../public/github.svg';
import Image from "next/image";
const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/amilz/burnspl"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={styles.logo}>
                    amilz.sol&nbsp;&nbsp;
                </span>
                <Image src={github} height={33} alt='github'/>
            </a>
        </footer>
    )
}

export default Footer


