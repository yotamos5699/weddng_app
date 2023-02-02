import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { MdOutlineSecurityUpdateWarning } from "react-icons/md";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import { tableData } from "../../mockData";

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
  const [processedData, setProcessedData] = useState<tRow[] | null>(null);
  const [tableRange, setTableRange] = useState({
    startPointer: 0,
    endPointer: 10,
  });
  const [rangeInterval, setRangeInterval] = useState(10);
  const [cropedTdata, setCropedTdata] = useState<tRow[]>();
  useEffect(() => {
    console.log("use effect !!!!");
    setTableRange({
      startPointer: 0,
      endPointer: 10,
    });
    !processedData &&
      setProcessedData(
        sortKey ? data.filter((row) => row.stat === sortKey) : data
      );
    processedData &&
      setCropedTdata(
        processedData.slice(tableRange.startPointer, tableRange.endPointer)
      );
  }, []);

  useEffect(() => {
    processedData != null &&
      setCropedTdata(
        processedData.slice(tableRange.startPointer, tableRange.endPointer)
      );
  }, [tableRange]);

  return (
    <div dir="rtl" className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {processedData && (
        <div>
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <Headers headers={headersList} />
            <tbody>
              {cropedTdata &&
                cropedTdata.map((row: tRow) => (
                  <Row hndleClick={undefined} rowData={row} />
                ))}
            </tbody>
          </table>
          <TableNav
            rangeInterval={rangeInterval}
            tableLength={processedData.length - 1}
            setRangeInterval={setRangeInterval}
            setTableRange={setTableRange}
            tableRange={tableRange}
          />
        </div>
      )}
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
    <tr
      dir="rtl"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <td className="px-6 py-4">{props.rowData.name}</td>
      <td className="px-6 py-4">
        <Select_ default={props.rowData.stat} values={statsValues} />
      </td>
      <a
        className="hover:bg-gray-300 hover:text-gray-800"
        href={`tel:+972${props.rowData.phone}`}
      >
        <td className="bc11 hover:bg-gray-300 hover:text-gray-800">
          {props.rowData.phone}
        </td>
      </a>
      <td className="px-6 py-4">{props.rowData.amount}</td>
      <td className="px-6 py-4">{props.rowData.message}</td>{" "}
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
          />
          <label className="sr-only">checkbox</label>
        </div>
      </td>
    </tr>
  );
};

type headersProps = {
  headers: string[];
};

export const Headers = ({ headers }: headersProps) => {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr dir="rtl" className="">
        <th className="px-6 py-3">{headers[0]}</th>
        <th className="px-6 py-3">{headers[1]}</th>

        <th className="px-6 py-3">{headers[2]}</th>
        <th className="px-6 py-3">{headers[3]}</th>
        <th className="px-6 py-3">{headers[4]}</th>
        <th className="px-6 py-3">{headers[5]}</th>
      </tr>
    </thead>
  );
};
interface navProps {
  tableLength: number;
  rangeInterval: number;
  setRangeInterval: Dispatch<SetStateAction<number>>;
  tableRange: { startPointer: number; endPointer: number };
  setTableRange: Dispatch<
    SetStateAction<{ startPointer: number; endPointer: number }>
  >;
}
export const TableNav = (props: navProps) => {
  console.log("table nav props", { props });
  return (
    <div className="flex items-center justify-center bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <div className="flex w-1/2 gap-8">
        {props.tableRange.endPointer < props.tableLength && (
          <TfiControlForward
            onClick={() => {
              const newRequestedEndPointerValue =
                props.tableRange.endPointer + props.rangeInterval;
              const newEndPointerValue: number =
                newRequestedEndPointerValue >= props.tableLength
                  ? props.tableLength
                  : newRequestedEndPointerValue;
              props.setTableRange({
                startPointer: props.tableRange.endPointer,
                endPointer: newEndPointerValue,
              });
            }}
            size={50}
          />
        )}
        <Select_
          setRangeInterval={props.setRangeInterval}
          textStyls={"text-xl font-bold"}
          default={10}
          values={[5, 10, 20, 50]}
        />
        {props.tableRange.startPointer > 0 && (
          <TfiControlBackward
            size={50}
            onClick={() => {
              const newRequestedStartPointerValue =
                props.tableRange.startPointer - props.rangeInterval;
              const newStartPointerValue: number =
                newRequestedStartPointerValue <= 0
                  ? 0
                  : newRequestedStartPointerValue;
              props.setTableRange({
                startPointer: newRequestedStartPointerValue,
                endPointer: props.tableRange.startPointer,
              });
            }}
            size={50}
          />
        )}
      </div>
    </div>
  );
};
