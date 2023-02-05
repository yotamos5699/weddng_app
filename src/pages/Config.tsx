import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { saveRouterProps } from "../hooks/routerHooks";

import { ClipLoader } from "react-spinners";
import { api } from "../utils/api";
import { AiOutlineCreditCard } from "react-icons/ai";
import { GiUpgrade } from "react-icons/gi";
import { AiOutlineBank } from "react-icons/ai";
import { Select } from "../components/Invites";
import Select_ from "../components/Tables/Select";
//import { fetchPlans } from "../server/api/routers/siteContent";

interface plansProps {
  name: string;
  msgAmount: number;
  savedAmount: number;
  invites: boolean;
  bit: boolean;
  cc: boolean;
}

const moduleData = {
  messagesBanks: [
    {
      amount: 200,
      price: 300,
    },
    {
      amount: 500,
      price: 600,
    },
    {
      amount: 1000,
      price: 1000,
    },
  ],
};

function Config() {
  const plans = api.example.getPlansContent.useQuery({ key: "plans" });
  const [isModule, setIsModule] = useState<{
    visible: boolean;
    data: any;
    type: string;
  }>({
    visible: false,
    data: null,
    type: "",
  });
  const [plansData, setPlansData] = useState<
    | { plansList: plansProps[]; selectedPlan: plansProps | undefined }
    | undefined
  >();

  useEffect(() => {
    if (Array.isArray(plans.data) && !plansData?.selectedPlan) {
      const data = plans.data[0];
      setPlansData({ plansList: plans.data, selectedPlan: plans.data[0] });
    }
  }, [plans.data]);
  const handleChange = (e: any) => {
    if (e.target.value)
      setPlansData((prev: any) => {
        return {
          ...prev,
          selectedPlan: plansData?.plansList.filter(
            (plan) => plan.name === e.target.value
          )[0],
        };
      });
  };

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
      <div>
        {plansData?.plansList && (
          <div className="mt-4 flex">
            <Select_
              default={plansData.selectedPlan?.name}
              values={plansData.plansList.map((plan) => plan.name)}
              handleChange={handleChange}
            />
            <p>פיתוח</p>
          </div>
        )}
        <h2 className="mt-8 mb-2 text-right">...המסלול שלך</h2>
      </div>
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
              {plansData?.selectedPlan && plansData.selectedPlan?.name}
            </span>
            <span className="config-cell">שם</span>
          </p>
          <p className="config-row">
            <span className="config-cell">
              {plansData?.selectedPlan && plansData.selectedPlan?.msgAmount}
            </span>
            <span className="config-cell">כמות הודעות</span>
          </p>
          <p className="config-row">
            <span className="config-cell">
              {plansData?.selectedPlan && plansData.selectedPlan?.savedAmount}
            </span>
            <span className="config-cell">הודעות שמורות ליום האירוע</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plansData?.selectedPlan && plansData.selectedPlan?.cc}
            />
            {}
            <span className="config-cell">כולל הזמנות</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plansData?.selectedPlan && plansData.selectedPlan?.cc}
            />

            <span className="config-cell">מסלקת אשראי</span>
          </p>
          <p className="config-row">
            <input
              className="config-cell"
              type={"checkbox"}
              onClick={() => false}
              checked={plansData?.selectedPlan && plansData.selectedPlan?.cc}
            />
            {}
            <span className="config-cell">מסלקת Bit</span>
          </p>
        </div>
      ) : (
        <Spiner />
      )}

      <h2 className="mt-8 mb-2 text-right">...תשלום</h2>
      <div className="config-main">
        <p
          onClick={() => {
            setIsModule({ visible: true, data: null, type: "cc" });
          }}
          className="config-row  hover:bg-purple-900"
        >
          <span className="config-cell flex justify-center">
            <AiOutlineCreditCard />
          </span>
          <span className="config-cell">החלף אמצעי תשלום</span>
        </p>
        <p className="config-row  hover:bg-purple-900">
          <span className="config-cell flex justify-center">
            <AiOutlineBank />
          </span>
          <span className="config-cell">קנה בנק הודעות</span>
        </p>
        <p className="config-row  hover:bg-purple-900">
          <span className="config-cell flex justify-center  ">
            <GiUpgrade className="" />
          </span>
          <span className="config-cell">החלף תוכנית</span>
        </p>
      </div>
      {isModule.visible && (
        <Model
          type={"cc"}
          data={undefined}
          setIsVisible={setIsModule}
          isModule={isModule}
        />
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

interface modalProps {
  type: "cc" | "bit" | "upgrade";
  data: any;
  setIsVisible: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      data: any;
      type: string;
    }>
  >;
  isModule: {
    visible: boolean;
    data: any;
    type: string;
  };
}

export const Model = (props: modalProps) => {
  console.log({ props });

  if (props.type == "cc")
    return (
      <div
        id="pop_up"
        className={
          " fixed inset-4 flex h-full flex-col items-center justify-center bg-slate-900 bg-opacity-30 text-5xl backdrop-blur-sm"
        }
      >
        <div>
          <div className="flex flex-col" dir="rtl">
            <p>מס כרטיס</p>
            <label htmlFor="ccn">Credit Card Number:</label>
            <input
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="xxxx xxxx xxxx xxxx"
            />
          </div>
          <button
            className="link1"
            onClick={() => {
              props.setIsVisible({ ...props.isModule, visible: false });
            }}
          >
            חייב
          </button>
          <button
            className="link1"
            onClick={() => {
              props.setIsVisible({ ...props.isModule, visible: false });
            }}
          >
            בטל
          </button>
        </div>
      </div>
    );
  return <div>other</div>;
};
