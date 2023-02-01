export const listOfQuestions = [
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
        flexState: true,
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
        flexState: true,
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
        flexState: true,
      },
    ],
  },
];
