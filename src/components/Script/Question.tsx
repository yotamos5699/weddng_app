import { InnerQuestions } from "./IneerQuestions";

export const Question = ({
  innerArrays,
  message,
  progressBar,
  setProgress,
  setScript,
  script,
}: QuestionProps) => {
  console.log({ message });
  return (
    <div className="flex flex-col items-center">
      <h1 className="  rounded-lg border-2 border-pink-100 text-center text-base">
        {message?.mainHeader}
      </h1>
      <p className="mb-4 text-[8px]">{message?.addedText}</p>

      {innerArrays ? (
        innerArrays.map((array: any) => {
          return (
            <InnerQuestions
              script={script}
              array={array}
              mainMessage={message}
              progressBar={progressBar}
              setProgress={setProgress}
              setScript={setScript}
            />
          );
        })
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};
