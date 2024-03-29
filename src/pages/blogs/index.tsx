import { useCallback, useEffect, useState } from "react"
import { GetServerSidePropsContext } from "next"

import { trpc } from "src/utils/trpc"
import BlogsCommon from "src/components/common/blogs"
import Loading from "src/components/common/loading"
import Meta from "src/components/common/meta"
import { ssrInit } from "src/utils/ssg"

const Blogs = () => {
  const { data, isLoading } = trpc.blog.getPublishedBlogs.useQuery()
  const [search, setSearch] = useState("")
  const [blogData, setBlogData] = useState(data)

  const findPublishedBlogs = () => {
    return (
      data &&
      data.filter((blog) => {
        return blog.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }

  const findPublishedBlogsCallback = useCallback(findPublishedBlogs, [
    data,
    search,
  ])

  useEffect(() => {
    setBlogData(findPublishedBlogsCallback())
  }, [findPublishedBlogsCallback])

  return (
    <div className="container p-4 mx-auto">
      <Meta
        title="Blogs"
        description="Displays all the blogs for the latest economics news"
        keywords="economics, news, blogs, latest blogs"
      />
      <h2 className="mb-4 title">Blogs</h2>
      <div className="flex justify-center gap-2 pb-4">
        <input
          type="text"
          className="input"
          placeholder="Type to find a blog"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-4">
        {blogData && <BlogsCommon blogs={blogData} />}
        {data && data.length <= 0 && (
          <p className="self-center font-bold text-slate-700 md:text-lg lg:text-xl">
            No results with that search. Try again :D
          </p>
        )}
      </div>
    </div>
  )
}

export default Blogs

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg } = await ssrInit(context)

  await ssg.blog.getPublishedBlogs.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}
