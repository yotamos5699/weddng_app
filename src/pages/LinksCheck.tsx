import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Invites from "../components/Invites";
import Link from "next/link";
import { saveRouterProps } from "../hooks/routerHooks";
const lcURL =
  "https://script.google.com/macros/s/AKfycbx7ZLwlp1PTc3mAWriUGGo0mWiMdQNqKODFZnkn9vm2jqkd1ZgjRLAGGe7bAYpV6qBg-g/exec?type=links";

// let params = new URLSearchParams(lcURL.search);
// params.append("type", "links");

interface LinksImageProps {
  id: string | number;
  design: string;
  name: string;
  about: string;

  fullLink: string;
  emptyLink: string;
}

const getLinks = async () => {
  console.log({ lcURL });
  const res = await axios.get(lcURL, { withCredentials: false }).then((res) => {
    return res.data;
  });
  return res;
};

function LinksCheck() {
  const links = useQuery({ queryKey: ["LinksCheck"], queryFn: getLinks });
  const [selectedInvite, setSelectedInvite] = useState({
    link: "",
    showInvite: false,
  });

  console.log({ links });
  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-screen  flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
    >
      <h1 className="flex w-full  items-center justify-center border-2 border-white ">
        <a
          className="flex max-w-xs  gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={() => {
            saveRouterProps(null, "/UserInterface");
          }}
          target="_blank"
        >
          <h3 className=" font-bold">חזרה →</h3>
          <div className="text-lg line-clamp-4"></div>
        </a>
        <span className="text-[hsl(280,100%,70%)]">בחירת הזמנה ...</span>
      </h1>

      {links.data &&
        !selectedInvite.showInvite &&
        links?.data?.length > 1 &&
        links.data.map((LinkData: LinksImageProps) => {
          return (
            <div
              key={LinkData.id}
              className="flex h-80 w-full flex-col border-2 border-gray-200 "
              onClick={() => {
                console.log("selected mother fucker");
                setSelectedInvite({
                  ...selectedInvite,
                  showInvite: true,
                  link: LinkData.emptyLink,
                });
              }}
            >
              <p className="flex gap-8 text-xl">
                <span>עיצוב</span>
                <span>{LinkData.design}</span>
                <span>שם</span>
                <span>{LinkData.name}</span>
                <span>תיאור</span>
                <span>{LinkData.about}</span>
              </p>
              <div className=" flex h-full sm:flex-row">
                <div className="br1 relative h-full w-1/2">
                  <Image src={LinkData.emptyLink} alt={""} fill />
                </div>
                <div className="br1 relative h-full w-1/2">
                  <Image src={LinkData.fullLink} alt={""} fill />
                </div>
              </div>
            </div>
          );
        })}
      {selectedInvite.showInvite && (
        <Invites inviteLink={selectedInvite.link} />
      )}
    </div>
  );
}

export default LinksCheck;
