import axios from "axios";

const getSiteContent = async () =>
  await axios
    .get(
      "https://script.google.com/macros/s/AKfycbyfdoIek0U1f1rpq-A9x1bMIScuVpD8-yNKnhSZAWyE3WoPVaKvmv-Ogt1OfHy9Vdo2HQ/exec?type=gettext",
      { withCredentials: false }
    )
    .then((res) => res.data);
type siteContentRow = {
  page: string;
  header: string;
  content: string;
};

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const siteInfoRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    const res: siteContentRow[] = await getSiteContent();
    // console.log({ res });
    return res;
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
