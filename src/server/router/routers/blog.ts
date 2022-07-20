import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createRouter } from "../context"

const defaultBlogSelect = Prisma.validator<Prisma.BlogSelect>()({
  id: true,
  title: true,
  author: true,
  summary: true,
  content: true,
  imageUrl: true,
  Comments: true,
})

export const blogRouter = createRouter()
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
  .query("getBlog", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.blog.findFirstOrThrow({
        where: { id: input.id },
        select: defaultBlogSelect,
      })
    },
  })
  .query("getBlogs", {
    async resolve({ ctx }) {
      return await ctx.prisma.blog.findMany({
        select: defaultBlogSelect,
      })
    },
  })