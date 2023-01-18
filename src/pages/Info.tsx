import Head from "next/head";
import React from "react";
import { getContent } from ".";
import { api } from "../utils/api";

function Info() {
  const pageContent = api.example.getSiteContent.useQuery({
    keys: "type=gettext",
  });
  return (
    <div>
      <Head>
        <title>info</title>
        <meta name="description" content="עלינו" />
      </Head>
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-5xl">עלינו</h1>
        <div
          dir="rtl"
          className="flex w-1/2 flex-col items-center gap-2 text-xl"
        >
          {pageContent.data &&
            formatToRows(getContent("עלינו", pageContent)).map(
              (row: string) => <p>{row}</p>
            )}
        </div>
      </div>
      {}
    </div>
  );
}

export default Info;

export const formatToRows = (fullText: string): string[] => {
  let text = [];
  let row: string = "";
  for (let i = 0; i <= fullText.length - 1; i++) {
    if (fullText[i] != ".") {
      row += fullText[i];
    } else {
      text.push((row += "."));
      row = "";
    }
  }
  return text;
};
