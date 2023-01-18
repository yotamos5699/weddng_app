import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
const getSiteContent = async (keys: string) =>
  await axios
    .get(
      "https://script.google.com/macros/s/AKfycbyreHXYiwITQf7wejWY5-a0MVmOJG1OqtgxkRLaKabQTvW_Oq_af22VV8Po8dntcxpiYQ/exec?" +
        keys,
      { withCredentials: false }
    )
    .then((res) => {
      console.log({ res });
      console.log("res.data ", res.data);
      return res.data;
    });

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `שלום ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getSiteContent: publicProcedure
    .input(z.object({ keys: z.string() }))

    .query(async ({ input }) => {
      const res: siteContentRow[] = await getSiteContent(input.keys);
      console.log({ res });
      return res;
    }),
});

// export const siteInfoRouter = createTRPCRouter({

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
