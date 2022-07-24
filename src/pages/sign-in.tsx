import { useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { GetServerSidePropsContext } from "next"
import { User } from "@prisma/client"

import { getOnceUponADimeAuthSession } from "@/server/common/get-server-session"
import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"

const SignIn = () => {
  const { data: session } = useSession()
  const { setUser, user } = useStore()

  let dataUser: User | null = user ? user : null

  if (session) {
    const email = session.user?.email as string
    const { data } = trpc.useQuery(["user.getUserByEmail", { email }])
    if (data) {
      dataUser = data
    }
  }

  useEffect(() => {
    if (!session) {
      setUser(null)
    } else {
      setUser(dataUser)
    }
  }, [session, setUser, dataUser])

  if (session) {
    const email = session.user?.email as string
    const { data } = trpc.useQuery(["user.getAdminByEmail", { email }])
    if (data?.isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-lg">Signed in as {data.email}</p>
          <p></p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
          <Link href="/admin">
            <button
              onClick={() => setUser(data)}
              className="p-2 mx-auto rounded bg-slate-200"
            >
              Admin page
            </button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Signed in as {session.user?.email}</p>
          <p>You can add comments on blogs now</p>
          <button
            onClick={() => signOut()}
            className="p-2 mx-auto rounded bg-slate-200"
          >
            Sign out
          </button>
        </div>
      )
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Not signed in</p>
        <button
          onClick={() => signIn()}
          className="p-2 mx-auto rounded bg-slate-200"
        >
          Sign in
        </button>
      </div>
    )
  }
}

export default SignIn

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getOnceUponADimeAuthSession(ctx),
    },
  }
}
