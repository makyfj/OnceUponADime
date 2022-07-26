import { protectedRouter } from "@/server/utils/protected"
import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createRouter } from "../context"

const defaultBlogSelect = Prisma.validator<Prisma.BlogSelect>()({
  id: true,
  title: true,
  author: true,
  draft: true,
  published: true,
  summary: true,
  content: true,
  imageUrl: true,
  Comments: true,
  createdAt: true,
  updatedAt: true,
})

export const blogRouter = createRouter()
  .query("getPublishedBlog", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.blog.findFirstOrThrow({
        where: { id: input.id, published: true },
        select: defaultBlogSelect,
      })
    },
  })
  .query("getPublishedBlogs", {
    async resolve({ ctx }) {
      return await ctx.prisma.blog.findMany({
        where: {
          published: {
            equals: true,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        select: defaultBlogSelect,
      })
    },
  })
  .query("getLatestPublishedBlogs", {
    async resolve({ ctx }) {
      return await ctx.prisma.blog.findMany({
        where: {
          published: {
            equals: true,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 2,
        select: defaultBlogSelect,
      })
    },
  })
  .merge(
    protectedRouter
      .query("getAdminPublishedBlogs", {
        async resolve({ ctx }) {
          return await ctx.prisma.blog.findMany({
            where: {
              published: {
                equals: true,
              },
            },
            orderBy: {
              updatedAt: "desc",
            },
            select: defaultBlogSelect,
          })
        },
      })
      .query("getAdminPublishedBlog", {
        input: z.object({
          id: z.string(),
        }),
        async resolve({ input, ctx }) {
          return await ctx.prisma.blog.findFirstOrThrow({
            where: { id: input.id, published: true },
            select: defaultBlogSelect,
          })
        },
      })
      .mutation("createBlog", {
        input: z.object({
          title: z.string(),
          author: z.string(),
          summary: z.string(),
          content: z.string(),
          imageUrl: z.string(),
        }),
        async resolve({ input, ctx }) {
          return await ctx.prisma.blog.create({
            data: input,
          })
        },
      })
      .mutation("updateBlog", {
        input: z.object({
          id: z.string(),
          title: z.string(),
          author: z.string(),
          summary: z.string(),
          content: z.string(),
          imageUrl: z.string(),
        }),
        async resolve({ input, ctx }) {
          return await ctx.prisma.blog.update({
            where: { id: input.id },
            data: input,
          })
        },
      })
      .mutation("deleteBlog", {
        input: z.object({
          id: z.string(),
        }),
        async resolve({ input, ctx }) {
          return await ctx.prisma.blog.delete({
            where: { id: input.id },
          })
        },
      })
      .query("getDraftBlog", {
        input: z.object({
          id: z.string(),
        }),
        async resolve({ input, ctx }) {
          return await ctx.prisma.blog.findFirstOrThrow({
            where: { id: input.id, draft: true },
            select: defaultBlogSelect,
          })
        },
      })
      .query("getDraftBlogs", {
        async resolve({ ctx }) {
          return await ctx.prisma.blog.findMany({
            where: {
              draft: {
                equals: true,
              },
            },
            orderBy: {
              updatedAt: "desc",
            },
            select: defaultBlogSelect,
          })
        },
      })
  )
