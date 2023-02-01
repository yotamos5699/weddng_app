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
    <div className="h-full w-full flex-col items-center">
      <div className="border-1 mb-1 flex w-full flex-col items-center  border-white">
        <h1 className="w-3/4  rounded-lg border-2 border-pink-100 text-center text-base">
          {message?.mainHeader}
        </h1>
      </div>
      <p className="mb-4 mt-1 text-center text-[8px]">{message?.addedText}</p>

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
