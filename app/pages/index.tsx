import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import styles from "../styles/Home.module.css"

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <div className="mid-notice"><Search /></div>
      </main>
    </div>
  )
}
