import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { makeMockTableData } from "../components/Tables/makeData";
//import MuiTable from "../components/Tables/MuiTable";
import StatsTable from "../components/Tables/StatsTable";
import { saveRouterProps } from "../hooks/routerHooks";
import useLocalStorage from "../hooks/useLocalStorage";
import { tableData } from "../mockData";
const data = [
  { name: "אישרו הגעה", value: 55 },
  { name: "אומרים אולי", value: 32 },
  { name: "לא מגיעים", value: 11 },
  { name: "לא ענו", value: 77 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const keyHash: any = {
  "לא מגיעים": "סורב",
  "אומרים אולי": "אולי",
  "אישרו הגעה": "אושר",
  "לא ענו": "אין מענה",
};

export default function Stats() {
  const [toolTip, setToolTip] = useState(false);
  const [toTable, setToTable] = useState(false);
  const [sortKey, setSortKey] = useState<
    "אולי" | "אין מענה" | "אושר" | "סורב" | "לא נשלחה" | null
  >(null);

  const [tableData, setTableData] = useLocalStorage("tableData", {
    data: null,
  });

  useEffect(() => {
    if (!tableData.data) {
      const Tdata = makeMockTableData(50);
      setTableData({ data: [...Tdata] });
    }
    setToolTip(true);
  }, []);
  return (
    <>
      <Head>
        <title>weDomate</title>
        <meta name="description" content="מנהל החתונה שלך" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        dir="rtl"
        className=" container flex flex-col items-center justify-center px-4 py-16 "
      >
        <h1 className="flex text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <a
            onClick={() => {
              if (toTable) setToTable(false);
              else saveRouterProps(null, "/UserInterface");
            }}
            target="_blank"
          >
            <TiArrowBackOutline />
          </a>
          <code className="text-[hsl(280,100%,70%)]"> סטטיסטיקות </code>
          <button
            className="text-xl"
            onClick={() => {
              localStorage.clear();
            }}
          >
            clear cash
          </button>
        </h1>

        {!toTable && (
          <PieChart
            width={400}
            height={400}
            onClick={(e) => {
              if (e?.activePayload) {
                setSortKey(getSortKey(e));
                setToTable(true);
              }
            }}
          >
            {toolTip && (
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            )}
            <Tooltip />
            <Legend className="w-full" />
          </PieChart>
        )}
        {toTable && <StatsTable sortKey={sortKey} data={tableData.data} />}
      </div>
    </>
  );
}

export const getSortKey = (e: CategoricalChartState) => {
  if (e.activePayload) {
    const apl: { name: string; value: number } = e.activePayload[0].payload;
    const key = keyHash[apl.name];
    return key;
  }
};
