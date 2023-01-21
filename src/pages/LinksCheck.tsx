import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const lcURL =
  "https://script.google.com/macros/s/AKfycbyreHXYiwITQf7wejWY5-a0MVmOJG1OqtgxkRLaKabQTvW_Oq_af22VV8Po8dntcxpiYQ/exec?type=links";

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
                  alt={""}
                  width={500}
                  height={500}
                />
                <Image
                  src={LinkData.fullLink}
                  alt={""}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default LinksCheck;
