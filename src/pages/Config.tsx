import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { saveRouterProps } from "../hooks/routerHooks";

import { ClipLoader } from "react-spinners";
import { api } from "../utils/api";
//import { fetchPlans } from "../server/api/routers/siteContent";

interface plansProps {
  name: string;
  msgAmount: number;
  savedAmount: number;
  invites: boolean;
  bit: boolean;
  cc: boolean;
}

function Config() {
  const plans = api.example.getPlansContent.useQuery({ key: "plans" });

  const [plan, setPlan] = useState<plansProps | undefined>();

  useEffect(() => {
    if (Array.isArray(plans.data) && !plan) {
      const data = plans.data[0];
      setPlan(data);
    }
  }, [plans.data]);
  return (
    <div>
      <h1 className="flex text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <a target="_blank">
          <TiArrowBackOutline
            onClick={() => saveRouterProps(null, "/UserInterface")}
          />
        </a>
        <span className="text-[hsl(280,100%,70%)]">...חבילה ותשלום</span>
      </h1>
      <h2 className="mt-6 text-right">...המסלול שלך</h2>
      <div className="config-row mb-6 justify-center">
        <p className="flex w-1/2 justify-center gap-4">
          <span>420</span>
          <span>סה"כ נותרו</span>
        </p>
        <p className="flex w-1/2 justify-center gap-4">
          <span>380</span>
          <span>סה"כ נשלחו</span>
        </p>
      </div>
      {plans.data ? (
        <div className="config-main">
          <p className="config-row">
            <span className="config-cell">
              {plans.data && plans.data[0]?.name}
            </span>
            <span className="config-cell">שם</span>
          </p>
          <p className="config-row">
            <span className="config-cell">
              {plans.data && plans.data[0]?.msgAmount}
            </span>
            <span className="config-cell">כמות הודעות</span>
          </p>
          <p className="config-row">
            <span className="config-cell">
              {plans.data && plans.data[0]?.savedAmount}
            </span>
            <span className="config-cell">הודעות שמורות ליום האירוע</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plans.data && plans.data[0]?.cc}
            />
            {}
            <span className="config-cell">כולל הזמנות</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plans.data && plans.data[0]?.cc}
            />

            <span className="config-cell">מסלקת אשראי</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plans.data && plans.data[0]?.cc}
            />
            {}
            <span className="config-cell">מסלקת Bit</span>
          </p>
        </div>
      ) : (
        <Spiner />
      )}
    </div>
  );
}

export default Config;
export const Spiner = (props: any) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={"blue"}
        loading={props.loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
