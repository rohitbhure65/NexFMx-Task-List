"use client"
import { usePaginatedQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import getTasks from "../queries/getTasks"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"

const ITEMS_PER_PAGE = 100

export const TasksList = () => {
  const searchParams = useSearchParams()!
  const page = Number(searchParams.get("page")) || 0
  const [{ tasks, hasMore }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const router = useRouter()

  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null)

  const toggleDropdown = (id: string) => {
    setVisibleDropdown((prev) => (prev === id ? null : id))
  }

  const closeDropdown = () => {
    setVisibleDropdown(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElements = document.querySelectorAll(".dropdown-menu")
      const isDropdown = Array.from(dropdownElements).some((dropdown) =>
        dropdown.contains(event.target as Node)
      )
      if (!isDropdown) {
        closeDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`)
  }

  return (
    <section className="mb-10">
      <div className="mx-auto max-w-screen-3xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                href="/tasks/new"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg border border-gray-200 hover:bg-blue-400 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-300"
              >
                New
              </Link>
              <button
                onClick={() => toggleDropdown("actionsDropdown")}
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700"
              >
                Actions
              </button>
              <div
                id="actionsDropdown"
                className={`${
                  visibleDropdown === "actionsDropdown" ? "" : "hidden"
                } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mass Edit
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete all
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Task Type
                  </th>
                  <th scope="col" className="px-10 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Is Active
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created By
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Updated By
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Updated Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevents click from closing the dropdown
                          toggleDropdown(task.id)
                        }}
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>

                      <div
                        className={`${
                          visibleDropdown === task.id ? "" : "hidden"
                        } absolute top-10 left-10 z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                      >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <Link
                              href={`/tasks/${task.id}/edit`}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => closeDropdown()} // Close dropdown on click
                            >
                              Edit
                            </Link>
                          </li>
                          <li>
                            <button className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.name}
                    </th>
                    <td className="px-4 py-3">{task.type}</td>
                    <td className="px-4 py-3">{task.description}</td>
                    <td className="px-4 py-3">{task.status}</td>
                    <td className="px-4 py-3">{task.isActive ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{task.createdBy}</td>
                    <td className="px-4 py-3">
                      {task.createdAt ? format(new Date(task.createdAt), "MM/dd/yyyy") : "N/A"}
                    </td>
                    <td className="px-4 py-3">{task.updatedBy}</td>
                    <td className="px-4 py-3">
                      {task.updatedAt ? format(new Date(task.updatedAt), "MM/dd/yyyy") : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Previous
            </button>
            <span>Page {page + 1}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!hasMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
