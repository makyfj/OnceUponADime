import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import { User } from "@prisma/client"

const SignIn = () => {
  const router = useRouter()

  const { data: session } = useSession()
  const email = session?.user?.email as string

  const { data, error, isError } = trpc.useQuery([
    "user.getUserByEmail",
    { email },
  ])

  // If the data is available, use useStore to setUser.
  // This will trigger the user to be logged in.
  const { setUser } = useStore()

  useEffect(() => {
    if (data?.isAdmin) {
      router.push("/admin/")
      setUser(data as User)
    }
  }, [router, setUser, data])

  return (
    <div>
      {session ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Not signed in</p>
          <button
            onClick={() => signIn()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  )
}

export default SignIn
