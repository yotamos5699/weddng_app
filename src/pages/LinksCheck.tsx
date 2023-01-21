import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const lcURL =
  "https://script.google.com/macros/s/AKfycbx7ZLwlp1PTc3mAWriUGGo0mWiMdQNqKODFZnkn9vm2jqkd1ZgjRLAGGe7bAYpV6qBg-g/exec?type=links";

// let params = new URLSearchParams(lcURL.search);
// params.append("type", "links");

const getLinks = async () => {
  console.log({ lcURL });
  const res = await axios.get(lcURL, { withCredentials: false }).then((res) => {
    return res.data;
  });
  return res;
};

function LinksCheck() {
  const links = useQuery({ queryKey: ["LinksCheck"], queryFn: getLinks });

  return (
    <div dir="rtl" className="flex flex-col">
      {links.data &&
        links.data.map((LinkData: any) => {
          return (
            <div className="flex flex-col">
              <p className="flex gap-8 text-xl">
                <span>עיצוב</span>
                <span>{LinkData.design}</span>
                <span>שם</span>
                <span>{LinkData.name}</span>
                <span>תיאור</span>
                <span>{LinkData.about}</span>
              </p>
              <div className="flex">
                <Image
                  src={LinkData.emptyLink}
                  fill={true}
                  sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                  className=" mb-8 mt-4 h-40 rounded-2xl hover:bg-slate-300"
                  alt="Image Alt"
                />
                <Image
                  src={LinkData.fullLink}
                  fill={true}
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  className=" mb-8 mt-4 h-40 rounded-2xl hover:bg-slate-300"
                  alt="Image Alt"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default LinksCheck;
