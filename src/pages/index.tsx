import type {
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { createSSGHelpers } from "@trpc/react/ssg"
import Image from "next/image"
import superjson from "superjson"

import { trpc } from "src/utils/trpc"
import { appRouter } from "src/server/trpc/router/_app"
import { createContext } from "src/server/trpc/context"
import Loading from "src/components/common/loading"
import Blogs from "src/components/common/blogs"
import Meta from "src/components/common/meta"

const Home = () => {
  const { data, isLoading } = trpc.blog.getLatestBlogs.useQuery()
  return (
    <div className="container mx-auto">
      <Meta
        title="One Upon A Dime"
        description="Once Upon A Dime Economics Blog"
        keywords="Economics, blog, girl blog, economics blog"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <Image
            src="/assets/once-upon-a-dime.png"
            alt="Once Upon A Dime"
            width={250}
            height={250}
            className="h-40 w-40"
          />
        </div>
        <h1 className="title">home message</h1>
        <p className="text-center lg:max-w-7xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa
          architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Et culpa architecto cupiditate modi!
          Commodi dolorem minima, nulla exercitationem atque, architecto dicta,
          explicabo ut repellendus asperiores labore! Ex quae eum ullam. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Et culpa architecto
          cupiditate modi! Commodi dolorem minima, nulla exercitationem atque,
          architecto dicta, explicabo ut repellendus asperiores labore! Ex quae
          eum ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
          culpa architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam
        </p>
        <h2 className="title">latest blogs</h2>
        {isLoading && <Loading />}
        <div className="flex flex-col gap-4">
          {data && <Blogs blogs={data} />}
        </div>

        <h2 className="title">other info message</h2>
        <p className="text-center lg:max-w-7xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa
          architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Et culpa architecto cupiditate modi!
          Commodi dolorem minima, nulla exercitationem atque, architecto dicta,
          explicabo ut repellendus asperiores labore! Ex quae eum ullam. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Et culpa architecto
          cupiditate modi! Commodi dolorem minima, nulla exercitationem atque,
          architecto dicta, explicabo ut repellendus asperiores labore! Ex quae
          eum ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
          culpa architecto cupiditate modi! Commodi dolorem minima, nulla
          exercitationem atque, architecto dicta, explicabo ut repellendus
          asperiores labore! Ex quae eum ullam
        </p>
      </div>
    </div>
  )
}

export default Home

/* export async function getStaticProps(context: GetServerSidePropsContext) { */
/**/
/*   const { req, res, session, prisma } = await createContext() */
/**/
/*   const ssg = createSSGHelpers({ */
/*     router: appRouter, */
/*     ctx: { req, res, session, prisma }, */
/*     transformer: superjson, */
/*   }) */
/**/
/*   await ssg.fetchQuery("blog.getLatestPublishedBlogs") */
/**/
/**/
/*   return { */
/*     props: { */
/*       trpcState: , */
/*     }, */
/*     revalidate: 1, */
/*   } */
/* } */
