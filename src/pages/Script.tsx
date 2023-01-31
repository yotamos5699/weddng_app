import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Question } from "../components/Script/Question";
const listOfQuestions = [
  {
    mainHeader: "הורים",
    inputs: [
      {
        header: "שם האב",
        content: "",
        inputType: "text",
        default: "הכנס שם מלא",
      },
      {
        header: "שם האם",
        content: "",
        inputType: "text",
        default: "הכנס שם מלא",
      },
    ],
  },
  {
    mainHeader: "מתחתנים",
    inputs: [
      {
        header: "שם החתן",
        content: "",
        inputType: "text",
        default: "הכנס שם מלא",
      },
      {
        header: "שם הכלה",
        content: "",
        inputType: "text",
        default: "הכנס שם מלא",
      },
    ],
  },
  {
    mainHeader: "אולם",
    inputs: [
      {
        header: "שם האולם",
        content: "",
        inputType: "text",
      },
      {
        header: "כתובת",
        content: "",
        inputType: "text",
        default: "עיר רחוב ומספר",
      },
    ],
  },
  {
    mainHeader: "תאריך ושעה",
    inputs: [
      {
        header: "תאריך",
        content: "",
        inputType: "date",
      },
      {
        header: "שעה",
        content: "",
        inputType: "time",
      },
    ],
  },
  {
    mainHeader: "הודעה ראשונה",
    styleData: { gotButton: true, isFlexCol: true },
    inputs: [
      { header: "הודעה ראשונה שתשלח", content: "", inputType: "textarea" },
    ],
  },
  {
    mainHeader: "מענה לתגובת המוזמן",
    addedText: "ערוך תגובה ראשונה",
    styleData: { gotButton: true, isFlexCol: true },
    inputs: [
      {
        header: "אם אושרה השתתפות",
        content: "",
        inputType: "textarea",
        default: "כמה תבואו",
        addedText: " האורח יתבקש להקליד מספר הצפויים להגיע עימו",
      },
      {
        header: "אם לא אושרה השתתפות",
        content: "",
        inputType: "textarea",
        default: "חז'ל אמרו",
      },
    ],
  },
  {
    mainHeader: "הודעות תזכורת למאשרים",
    addedText: "ניתן להגדיר מספר תזכורות",
    styleData: { gotButton: true, isFlexCol: true },
    inputs: [
      {
        header: "הזן מס ימים ליפני תאריך האירוע",
        content: "",
        inputType: "number",
      },
      {
        header: "הודעת התזכורת",
        content: "",
        inputType: "textarea",
        default: "להזכירכם הנכם מוזמנים לאירוע של מצפים לראותכם",
      },
    ],
  },
  {
    mainHeader: "הודעה ביום האירוע",
    addedText: "הודעה למס שעות ליפני האירוע עצמו",
    styleData: { gotButton: true, isFlexCol: true },

    inputs: [
      {
        header: "תוכן ההודעה",
        content: "",
        inputType: "textarea",
      },
      {
        header: "בחרו שעה",
        content: "",
        inputType: "time",
      },
    ],
  },
  {
    mainHeader: "תוספות להודעה",
    addedText: "איזה אפשרויות תרצו שנכלול בהודעה",
    styleData: { gotButton: true, isMultiCheck: true },

    inputs: [
      {
        header: "כללו כפתור ניווט",
        content: "",
        inputType: "checkbox",
      },
      {
        header: "כללו קישור להזמנה",
        content: "",
        inputType: "checkbox",
      },

      {
        header: "מס שאושרו ע'י האורח",
        content: "",
        inputType: "checkbox",
      },
      {
        header: "כללו בקשת אימות נוספת",
        content: "",
        inputType: "checkbox",
      },
    ],
  },
  {
    mainHeader: "בבוקר שלאחר האירוע",
    addedText: " מה תרצו שיקבלו האורחים ביום למחרת",
    styleData: { gotButton: true, isFlexCol: true },

    inputs: [
      {
        header: "תוכן ההודעה",
        content: "",
        inputType: "textarea",
      },
      {
        header: "בחרו שעה",
        content: "",
        inputType: "time",
      },
    ],
  },
];

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
    <div className="mt- flex flex-col items-center gap-8">
      <h1 className="flex items-center justify-center gap-4">
        <p className="items-center justify-center">תסריט הודעות ומידע</p>
        <Link
          className="flex max-w-xs  gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/UserInterface"
          target="_blank"
        >
          <h3 className=" font-bold">חזרה →</h3>
          <div className="text-lg line-clamp-4"></div>
        </Link>
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
