import React, { useEffect } from "react";
import { useReactTable } from "@tanstack/react-table";
import { makeMockTableData } from "./makeData";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BiMessageAdd } from "react-icons/bi";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";
import { type } from "os";
import { Select } from "../Invites";
import Select_ from "./Select";
const statsValues = ["אולי", "אין מענה", "אושר", "סורב", "לא נשלחה"];
type tRow = {
  name: string;
  stat: string;
  phone: string;
  amount: number;
  message: string;
};

interface statTableProps {
  sortKey: "אולי" | "אין מענה" | "אושר" | "סורב" | "לא נשלחה" | null;
  data: tRow[];
}

const headersList = [
  "שם",
  "סטטוס",
  "טלפון",
  "כמות",
  "הודעה",
  "להזכיר",
  "נסח הודעה",
];

function StatsTable({ data, sortKey }: statTableProps) {
  return (
    <div dir="rtl" className="relative overflow-x-auto">
      <table className="mt-4 w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <Headers headers={headersList} />
        <tbody>
          {data.map((row: tRow) => (
            <Row hndleClick={undefined} rowData={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;

type rowProps = {
  hndleClick: any;
  rowData: tRow;
};

export const Row = (props: rowProps) => {
  return (
    <tr dir="rtl" className="br11">
      <th className="bc11">{props.rowData.name}</th>
      <th className="bc11 border-1 w-1/6 border-white text-black">
        <Select_ default={props.rowData.stat} values={statsValues} />
      </th>
      <a
        className="hover:bg-gray-300 hover:text-gray-800"
        href={`tel:+972${props.rowData.phone}`}
      >
        <th className="bc11 hover:bg-gray-300 hover:text-gray-800">
          {props.rowData.phone}
        </th>
      </a>
      <th className="bc11">{props.rowData.amount}</th>
      <th className="bc11 w-1/8">{props.rowData.message}</th>{" "}
      <th className="bc11h text-center">
        <MdOutlineSecurityUpdateWarning size={20} className="icn1" />
      </th>
    </tr>
  );
};

type headersProps = {
  headers: string[];
};

export const Headers = ({ headers }: headersProps) => {
  return (
    <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr dir="rtl" className="br11h">
        <td className="bc11h">{headers[0]}</td>
        <td className="bc11h">{headers[1]}</td>

        <td className="bc11h">{headers[2]}</td>
        <td className="bc11h">{headers[3]}</td>
        <td className="bc11h">{headers[4]}</td>
        <td className="bc11h">{headers[5]}</td>
      </tr>
    </thead>
  );
};
