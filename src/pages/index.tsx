import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { DefaultSession } from "next-auth";
import Devnav from "../components/Devnav";
import { saveRouterProps } from "../hooks/routerHooks";

const Home: NextPage = () => {
  const [usserData, setUsserData] = useState<DefaultSession>({
    expires: "",
    user: { name: "", image: "", email: "" },
  });
  const hello = api.example.hello.useQuery({
    text: usserData.user?.name ?? "",
  });
  const [isConected, setIsConected] = useState<boolean>(false);
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
      {pageContent?.data ? (
        <main
          dir="rtl"
          className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
        >
          <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <Devnav setIsConected={setIsConected} />
            <h1 className="flex flex-col text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">
                {pageContent.data && getContent("לוגו", pageContent)}
              </span>
              <code className="ml-4  text-[20px]">
                {" "}
                {pageContent.data && getContent("ליד הלוגו", pageContent)}
              </code>
            </h1>
            {!isConected && (
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
                    {pageContent.data &&
                      getContent("לקוחות מספרים", pageContent)}
                  </div>
                </Link>
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl text-white">
                {hello.data ? hello.data.greeting : "טוען..."}
              </p>
              {isConected && (
                <a
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  //   href="/UserInterface"
                  target="_blank"
                  onClick={() => {
                    console.log("in click !!!!!", { usserData });
                    saveRouterProps(usserData.user, "/UserInterface");
                  }}
                >
                  <h3 className="text-2xl font-bold">כנס לממשק →</h3>
                  <div className="text-lg line-clamp-4">
                    {pageContent.data && getContent("כפתור ממשק", pageContent)}
                  </div>
                </a>
              )}
              <AuthShowcase
                setUsserData={setUsserData}
                isConected={isConected}
                setIsConected={setIsConected}
              />
            </div>
          </div>
        </main>
      ) : (
        <div>
          <code>....כמה שניות</code>
          <Spiner />
        </div>
      )}
    </>
  );
};

export default Home;
type AuthShowcaseProps = {
  setIsConected: Dispatch<SetStateAction<boolean>>;
  isConected: boolean;
  setUsserData: Dispatch<SetStateAction<DefaultSession>>;
};

const AuthShowcase: React.FC<AuthShowcaseProps> = ({
  setIsConected,
  isConected,
  setUsserData,
}) => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  if (sessionData && isConected === false) {
    setUsserData({ ...sessionData });
    setIsConected(true);
  }
  console.log({ sessionData });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isConected && (
        <p className="text-center text-[14px] text-white">
          <span className="ml-1"> יש לך</span>
          <span className="rounded bg-pink-100 font-bold text-black"> 7 </span>
          <span className="mr-1">עדכונים חדשים </span>
          {/* {secretMessage && <span> - {secretMessage}</span>} */}
        </p>
      )}

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

import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const Spiner = (props: any) => {
  let [color, setColor] = useState("blue");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={props.loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

// email
// :
// "m.lhafakot@gmail.com"
// id
// :
// "cldhisfhw0000twesb1dfbsn6"
// image
// :
// "https://lh3.googleusercontent.com/a/AEdFTp7OqYYyXiOXyBbiqo4QjVhoNzpf3IDB9beXHVZc=s96-c"
// name
// :
// "יותם מלחי"
