import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import styles from "./styles/Home.module.css"
import getCurrentUser from "./users/queries/getCurrentUser"
import Image from "next/image"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-ipage-v1-0-8%2F258%2F248258%2Fo8EjIFll%2Fd7939eda7d26492c966745eb65c2ad3e&methods=resize%2C500%2C5000"
            alt="logo"
            width={400}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <p>
            {currentUser ? (
              <Link href="/tasks">
                <button
                  style={{
                    background: "green",
                    color: "white",
                    padding: "1rem",
                    marginTop: "10px",
                    borderRadius: "1.5rem",
                    border: "none",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                >
                  Access Tasks
                </button>
              </Link>
            ) : (
              "Create an account or log in to get started."
            )}
          </p>

          <div className={styles.buttonContainer}>
            {currentUser ? (
              <>
                <LogoutButton />
                <div>
                  User ID: <code>{currentUser.id}</code>
                  <br />
                  User Role: <code>{currentUser.role}</code>
                  <br />
                </div>
              </>
            ) : (
              <>
                <Link href="/signup" className={styles.button}>
                  <strong>Sign Up</strong>
                </Link>
                <Link href="/login" className={styles.loginButton}>
                  <strong>Login</strong>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
