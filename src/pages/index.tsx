import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "לקוח חדש" });
  const pageContent = api.example.getSiteContent.useQuery({
    keys: "type=gettext",
  });

  return (
    <>
      <Head>
        <title>weDomate</title>
        <meta name="description" content="מנהל החתונה שלך" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        dir="rtl"
        className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="ml-4 text-5xl">
              {" "}
              {pageContent.data && getContent("ליד הלוגו", pageContent)}
            </span>
            <span className="text-[hsl(280,100%,70%)]">
              {pageContent.data && getContent("לוגו", pageContent)}
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/Info"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">עלינו →</h3>
              <div className="text-lg line-clamp-4">
                {pageContent.data && getContent("עלינו מקוצר", pageContent)}
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="Recommendation"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">לקוחות ממליצים →</h3>
              <div className="text-lg line-clamp-4">
                {pageContent.data && getContent("לקוחות מספרים", pageContent)}
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "התנתקות" : "התחבר עם google"}
      </button>
    </div>
  );
};

export const getContent = (key: string, pageContent: any) => {
  const text = pageContent.data?.filter(
    (row: siteContentRow) => row.header == key
  )[0]?.content;
  console.log({ text });
  return text;
};
