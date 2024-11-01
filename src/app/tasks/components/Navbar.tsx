"use client"
import { Navbar } from "flowbite-react"
import Image from "next/image"

export default function Navbar_home() {
  return (
    <Navbar rounded className="px-7 shadow-lg">
      <Navbar.Brand href="/">
        <Image
          src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-ipage-v1-0-8%2F258%2F248258%2Fo8EjIFll%2Fd7939eda7d26492c966745eb65c2ad3e&methods=resize%2C500%2C5000"
          className="mr-3 h-6 sm:h-9"
          alt="nexfmx"
          width={120}
          height={100}
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/tasks">Task</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
