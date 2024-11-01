import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import getCurrentUser from "./users/queries/getCurrentUser"
export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1  items-center justify-center p-4">
        <div className="bg-white  rounded-lg shadow-lg p-6 max-w-md w-full text-center">
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
              <div className="flex flex-row space-y-2 justify-around items-center">
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
