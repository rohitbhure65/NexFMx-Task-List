"use client"
import { usePaginatedQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import getTasks from "../queries/getTasks"
import { useSearchParams } from "next/navigation"
import { Route } from "next"

const ITEMS_PER_PAGE = 5

export const TasksList = () => {
  const searchParams = useSearchParams()!
  const page = Number(searchParams.get("page")) || 0
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const [{ tasks, hasMore }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: statusFilter ? { status: statusFilter } : undefined,
  })

  const router = useRouter()
  const pathname = usePathname()

  const goToPreviousPage = () => {
    if (page > 0) {
      const params = new URLSearchParams(searchParams)
      params.set("page", (page - 1).toString())
      router.push(`${pathname}?${params.toString()}` as Route)
    }
  }

  const goToNextPage = () => {
    if (hasMore) {
      const params = new URLSearchParams(searchParams)
      params.set("page", (page + 1).toString())
      router.push(`${pathname}?${params.toString()}` as Route)
    }
  }

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value || null)
    // Reset to the first page when the filter changes
    const params = new URLSearchParams(searchParams)
    params.set("page", "0")
    router.push(`${pathname}?${params.toString()}` as Route)
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
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                href="/tasks/new"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg border border-gray-200 hover:bg-blue-400 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-300"
              >
                New
              </Link>
              <select
                onChange={handleStatusFilterChange}
                value={statusFilter || ""}
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Task Status</option>
                <option value="Completed">Completed</option>
                <option value="Backlog">Backlog</option>
                <option value="In Progress">In Progress</option>
              </select>
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
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      {/* Action button for each task */}
                      ...
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
                  </tr>
                ))}
              </tbody>
            </table>

            <nav
              className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{`${
                  page * ITEMS_PER_PAGE + 1
                }-${Math.min((page + 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * 2 + 1)}`}</span>{" "}
                of <span className="font-semibold text-gray-900 dark:text-white">{page}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={goToPreviousPage}
                    disabled={page === 0}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={goToNextPage}
                    disabled={!hasMore}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
