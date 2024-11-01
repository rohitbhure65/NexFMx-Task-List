"use client"
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import login from "../mutations/login"
import { Login } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { Route } from "next"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              router.refresh()
              if (next) {
                router.push(next as Route)
              } else {
                router.push("/")
              }
              router.push(`/tasks`)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" className="mb-4" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            className="mb-4"
          />
          <div className="text-right mb-4">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </Form>

        <div className="text-center mt-4">
          Or{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            <strong>Sign Up</strong>
          </Link>
        </div>
      </div>
    </section>
  )
}
