import Link from "next/link"
import Image from "next/image"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import getCurrentUser from "./users/queries/getCurrentUser"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-center">
          <Image
            src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-ipage-v1-0-8%2F258%2F248258%2Fo8EjIFll%2Fd7939eda7d26492c966745eb65c2ad3e&methods=resize%2C500%2C5000"
            alt="logo"
            className="max-w-full h-auto"
            width={400}
            height={400}
          />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <p className="mb-4">
            {currentUser ? (
              <Link href="/tasks">
                <button className="bg-green-500 text-white py-2 px-4 rounded-full font-bold transition duration-300 hover:bg-green-600">
                  Access Tasks
                </button>
              </Link>
            ) : (
              "Create an account or log in to get started."
            )}
          </p>

          <div className="mt-4">
            {currentUser ? (
              <>
                <LogoutButton />
                <div className="mt-2">
                  <span className="font-semibold">User ID:</span> <code>{currentUser.id}</code>
                  <br />
                  <span className="font-semibold">User Role:</span> <code>{currentUser.role}</code>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/signup">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold transition duration-300 hover:bg-blue-600">
                    Sign Up
                  </button>
                </Link>
                <Link href="/login">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold transition duration-300 hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
