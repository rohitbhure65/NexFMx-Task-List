"use client"
import styles from "../../styles/Login.module.css"
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
    <div className={styles.container}>
      <h1>Login</h1>

      <Form
        className={styles.form}
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
        <LabeledTextField
          name="email"
          label="Email"
          placeholder="Email"
          className={styles.inputField}
        />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          className={styles.inputField}
        />
        <div>
          <Link href={"/forgot-password"}>Forgot your password?</Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  )
}
