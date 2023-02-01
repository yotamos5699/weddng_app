import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Question } from "../components/Script/Question";
import { listOfQuestions } from "../constents";
import { saveRouterProps } from "../hooks/routerHooks";

function Script() {
  const [script, setScript] = useState<ScriptMessage[]>(listOfQuestions);
  const [progressBar, setProgressBar] = useState<ProgressBar>({
    totalNum: listOfQuestions.length,
    currentNum: 0,
  });

  const [currentMessageInnerArrays, setCurrentMessageIneerArrays] =
    useState<unknown[]>();
  useEffect(() => {
    const message = script[progressBar.currentNum];
    setCurrentMessageIneerArrays(
      message?.metaData
        ? [
            message.inputs.slice(message.metaData),
            message.inputs.slice(message.metaData, message.inputs.length - 1),
          ]
        : [message?.inputs]
    );
  }, [progressBar, script]);

  return (
    <div className=" flex h-screen w-screen flex-col items-center gap-8">
      <h1 className="flex text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <a target="_blank">
          <TiArrowBackOutline
            onClick={() => saveRouterProps(null, "/UserInterface")}
          />
        </a>
        <span className="text-[hsl(280,100%,70%)]">...הודעות ומידע</span>
      </h1>

      {script[progressBar.currentNum] && currentMessageInnerArrays && (
        <Question
          innerArrays={currentMessageInnerArrays}
          message={script[progressBar.currentNum]}
          setScript={setScript}
          progressBar={progressBar}
          setProgress={setProgressBar}
          script={script}
        />
      )}

      <div className="flex w-full justify-center  gap-40 border-2 border-white">
        <button
          onClick={() => {
            if (progressBar.currentNum < progressBar.totalNum - 1)
              setProgressBar({
                ...progressBar,
                currentNum: progressBar.currentNum + 1,
              });
          }}
          className="btn1"
        >
          המשך
        </button>
        <button
          onClick={() => {
            if (progressBar.currentNum > 0)
              setProgressBar({
                ...progressBar,
                currentNum: progressBar.currentNum - 1,
              });
          }}
          className="btn1"
        >
          חזור
        </button>
      </div>
    </div>
  );
}

//setScript()
export default Script;
