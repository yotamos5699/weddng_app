import Link from "next/link";
import { type } from "os";
import React, { Dispatch, SetStateAction } from "react";

type DevnavProps = { setIsConected: Dispatch<SetStateAction<boolean>> };

function Devnav(props: DevnavProps) {
  return (
    <div className="top-0 flex items-center gap-8 border-2 border-pink-200">
      <p className="text-xl">פיתוח</p>

      <Link
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
        href="/LinksCheck"
        target="_blank"
      >
        <p> בדיקת קישורים </p>
      </Link>
      <button
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
        onClick={() => {
          props.setIsConected((prev) => !prev);
        }}
      >
        ConectionMod
      </button>
    </div>
  );
}

export default Devnav;
