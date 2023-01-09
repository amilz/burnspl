import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <div className="mid-notice">search coming soon</div>
      </main>
    </div>
  )
}
