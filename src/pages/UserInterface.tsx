import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { loadServerPropas, saveRouterProps } from "../hooks/routerHooks";
import { TiArrowBackOutline } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "../hooks/useLocalStorage";

function UserInterface() {
  const [usserData, setUsserData] = useLocalStorage("usserData", {
    data: null,
  });
  const routerData = loadServerPropas();
  useEffect(() => {
    if (!usserData.data) {
      setUsserData({ data: routerData });
    }
  }, []);

  //const usserData = ;

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
        <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex gap-8">
            <h1 className="flex text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">לוח בקרה...</span>
              <a target="_blank">
                <TiArrowBackOutline
                  onClick={() => saveRouterProps(null, "/")}
                />
              </a>
            </h1>
            <div className="flex flex-col">
              <p>{usserData?.data?.name ?? ""}</p>
              <CastumImage srcPath={usserData?.data?.image ?? ""} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8">
            <a
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => saveRouterProps(null, "/Stats")}
              target="_blank"
            >
              <h3 className="text-2xl font-bold">סטטיסטיקה →</h3>
              <div className="text-lg line-clamp-4"></div>
            </a>
            <a
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              target="_blank"
              onClick={() => saveRouterProps(null, "/Script")}
            >
              <h3 className="text-2xl font-bold">הודעות ומידע →</h3>
              <div className="text-lg line-clamp-4"></div>
            </a>
            <a
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => {
                saveRouterProps(null, "/LinksCheck");
              }}
              target="_blank"
            >
              <h3 className="text-2xl font-bold">בחירת הזמנה →</h3>
              <div className="text-lg line-clamp-4"></div>
            </a>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="Recommendation"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">הגדרות ותשלום →</h3>
              <div className="text-lg line-clamp-4"></div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserInterface;

export const CastumImage = (props: any) => {
  return (
    <div className=" relative h-full ">
      <Image
        className="border-1 rounded-md border-pink-100"
        src={props.srcPath}
        alt={""}
        fill
      ></Image>
    </div>
  );
};
