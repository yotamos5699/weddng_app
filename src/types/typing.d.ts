interface ScriptMessage {
  mainHeader: string;
  addedText?: string;
  metaData?: number;
  styleData?: {
    gotButton?: boolean;
    isFlexCol?: boolean;
    isMultiCheck?: boolean;
  };

  inputs: innerMessage[];
}
interface QuestionProps {
  innerArrays: any[];
  message: ScriptMessage | undefined;
  script: ScriptMessage[];
  setScript: Dispatch<SetStateAction<ScriptMessage[]>>;
  progressBar: ProgressBar;
  setProgress: Dispatch<SetStateAction<ProgressBar>>;
}

interface ProgressBar {
  totalNum: number;
  currentNum: number;
}

type siteContentRow = {
  page: string;
  header: string;
  content: string;
};
interface innerArrayProps {
  mainMessage: ScriptMessage | undefined;
  script: ScriptMessage[];
  setScript: Dispatch<SetStateAction<ScriptMessage[]>>;
  progressBar: ProgressBar;
  setProgress: Dispatch<SetStateAction<ProgressBar>>;
  array: innerMessage[];
}

interface innerMessage {
  header: string;

  content: string;
  inputType:
    | "text"
    | "number"
    | "check"
    | "multi"
    | "date"
    | "time"
    | "textarea"
    | any;
  addedText?: string;
  default?: any;
}
