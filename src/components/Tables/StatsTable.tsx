import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import useDebouncs from "../../hooks/useDebouncs";

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
  console.log({ data });
  const [currentSortKey, setCurrentSortKey] = useState<typeof sortKey | "הכל">(
    sortKey
  );
  const [processedData, setProcessedData] = useState<tRow[] | null>(null);
  const [tableRange, setTableRange] = useState({
    startPointer: 0,
    endPointer: 10,
  });
  const [rangeInterval, setRangeInterval] = useState(10);
  const [cropedTdata, setCropedTdata] = useState<tRow[]>();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebouncs(searchValue, 500);
  useEffect(() => {
    console.log({ debouncedSearchValue });
  }, [debouncedSearchValue]);

  useEffect(() => {
    console.log("use effect !!!!");
    setTableRange({
      startPointer: 0,
      endPointer: rangeInterval,
    });
    data &&
      setProcessedData(
        currentSortKey == "הכל" || !currentSortKey
          ? data
          : data.filter((row) => row.stat === sortKey)
      );
    processedData &&
      setCropedTdata(
        processedData.slice(tableRange.startPointer, tableRange.endPointer)
      );
  }, [currentSortKey, rangeInterval]);

  useEffect(() => {
    console.log({ currentSortKey, cropedTdata, tableRange, processedData });
  }, [currentSortKey, cropedTdata, tableRange]);

  useEffect(() => {
    processedData != null &&
      setCropedTdata([
        ...processedData.slice(tableRange.startPointer, tableRange.endPointer),
      ]);
  }, [tableRange]);

  return (
    <div
      dir="rtl"
      className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg"
    >
      {processedData && (
        <div>
          <SearchVectors
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            key={sortKey}
            values={statsValues}
            setCurrentSortKey={setCurrentSortKey}
          />
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <Headers headers={headersList} />
            {debouncedSearchValue === "" ? (
              <tbody className="stat-table-body">
                {cropedTdata &&
                  cropedTdata.map((row: tRow) => (
                    <Row hndleClick={undefined} rowData={row} />
                  ))}
              </tbody>
            ) : (
              <tbody>
                {processedData &&
                  debouncedSearchValue &&
                  processedData
                    .filter((row) =>
                      row.name.toLowerCase().includes(debouncedSearchValue)
                    )
                    .map((row: tRow) => (
                      <Row hndleClick={undefined} rowData={row} />
                    ))}
              </tbody>
            )}
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

interface searchVectorsProps {
  key: string | null;
  values: string[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSortKey: React.Dispatch<
    React.SetStateAction<
      "אולי" | "אין מענה" | "אושר" | "סורב" | "לא נשלחה" | "הכל" | null
    >
  >;
}

export const SearchVectors = (props: searchVectorsProps) => {
  return (
    <div className="flex gap-8">
      <div className="stat-table-thead mb-4 flex  w-2/5 gap-4 rounded-xl text-center ">
        <h1 className="w-2/3 text-center text-xl font-bold ">חיפוש</h1>
        <input
          className="text-center text-xl font-bold text-black"
          value={props.searchValue}
          onChange={(e) => {
            props.setSearchValue(e.target.value);
          }}
          placeholder="הכנס מילת חיפוש"
          type={"text"}
        />
      </div>
      <div className="stat-table-thead mb-4 flex  w-2/5 gap-4 rounded-xl text-center ">
        <h1 className="w-2/3 text-center text-xl font-bold  ">מיין לפי</h1>
        <Select_
          handleChange={(e: any) => {
            props.setCurrentSortKey(e.target.value);
          }}
          default={props.key}
          values={[...props.values, "הכל"]}
        />
      </div>
    </div>
  );
};

type rowProps = {
  hndleClick: any;
  rowData: tRow;
};

export const Row = (props: rowProps) => {
  return (
    <tr dir="rtl" className="stat-table-tbody-tr">
      <td className="stat-table-tbody-tr-td">{props.rowData.name}</td>
      <td className="stat-table-tbody-tr-td">
        <Select_ default={props.rowData.stat} values={statsValues} />
      </td>
      <a
        className="hover:bg-gray-300 hover:text-gray-800"
        href={`tel:+972${props.rowData.phone}`}
      >
        <td className="stat-table-tbody-tr-td">{props.rowData.phone}</td>
      </a>
      <td className="stat-table-tbody-tr-td">{props.rowData.amount}</td>
      <td className="stat-table-tbody-tr-td-s">{props.rowData.message}</td>{" "}
      <td className="stat-table-tbody-tr-td h-s ">
        <div className="inline-flex items-center rounded-xl">
          <input
            size={50}
            className="h-8 w-8 rounded-2xl"
            id="checkbox-table-search-1"
            type="checkbox"
          />
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
    <thead className="stat-table-thead">
      <tr dir="rtl" className="stat-table-thead-tr">
        <th className="stat-table-thead-tr-th">{headers[0]}</th>
        <th className="stat-table-thead-tr-th">{headers[1]}</th>

        <th className="stat-table-thead-tr-th">{headers[2]}</th>
        <th className="stat-table-thead-tr-th-s">{headers[3]}</th>
        <th className="stat-table-thead-tr-th">{headers[4]}</th>
        <th className="stat-table-thead-tr-th-s">{headers[5]}</th>
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
  // console.log("table nav props", { props });

  const handleChange = (e: any) => {
    props.setRangeInterval(parseInt(e.target.value));
  };
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
          handleChange={handleChange}
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
                endPointer: newRequestedStartPointerValue + props.rangeInterval,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};
