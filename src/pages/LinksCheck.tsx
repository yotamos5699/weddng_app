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
  console.log({ links });
  return (
    <div dir="rtl" className="flex flex-col">
      {links.data &&
        links?.data?.length > 1 &&
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
              <div className="flex w-full ">
                <Image src={LinkData.emptyLink} alt={""} fill={true} />
                <Image src={LinkData.fullLink} alt={""} fill={true} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default LinksCheck;
