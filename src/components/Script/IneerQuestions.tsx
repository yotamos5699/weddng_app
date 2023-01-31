/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const InnerQuestions = ({
  mainMessage,
  progressBar,
  script,
  setScript,
  array,
}: innerArrayProps) => {
  return (
    <div className="border-1 flex flex-col items-center  gap-4 border-pink-100">
      {script &&
        array.map((message: innerMessage, idx: number) => {
          return (
            <div
              key={message.header}
              className={`${
                mainMessage?.styleData?.isFlexCol
                  ? "flex-col"
                  : mainMessage?.styleData?.isMultiCheck
                  ? "grid grid-cols-2"
                  : ""
              } h-full w-full ${
                !mainMessage?.styleData?.isFlexCol &&
                !mainMessage?.styleData?.isMultiCheck &&
                "flex flex-row-reverse"
              }  w-full  items-center gap-4 text-center text-sm`}
            >
              <p className={`${!mainMessage?.styleData && "w-1/3"}`}>
                {message.header}
              </p>
              <p className="text-[8px]">
                {mainMessage?.inputs[idx]?.addedText}
              </p>
              {message.inputType !== "textarea" ? (
                <input
                  className="w-3/4 rounded-lg text-center text-sm text-black"
                  type={message.inputType}
                  placeholder={message.default}
                  value={
                    script[progressBar.currentNum]?.inputs[idx]?.content ?? ""
                  }
                  onChange={(e) => {
                    setScript((prev: any) =>
                      prev.map((question: ScriptMessage, number: number) => {
                        console.log({ prev });
                        //console.log("target value", e.target.value);
                        if (number != progressBar.currentNum) return question;
                        else {
                          console.log("cussen ques", { question });

                          return {
                            ...question,
                            inputs: question.inputs.map(
                              (inner: innerMessage, index: number) => {
                                if (idx != index) return inner;
                                else {
                                  console.log("in the chussen", { inner });
                                  return {
                                    ...inner,
                                    content: e.target.value,
                                  };
                                }
                              }
                            ),
                          };
                        }
                      })
                    );
                  }}
                />
              ) : (
                <textarea
                  placeholder={message.default}
                  className="text-center text-black"
                  value={
                    script[progressBar.currentNum]?.inputs[idx]?.content ?? ""
                  }
                  onChange={(e) => {
                    setScript((prev: any) =>
                      prev.map((question: ScriptMessage, number: number) => {
                        return number != progressBar.currentNum
                          ? question
                          : {
                              ...question,
                              inputs: question.inputs.map(
                                (inner: innerMessage, index: number) =>
                                  idx != index
                                    ? inner
                                    : {
                                        ...inner,
                                        content: e.target.value,
                                      }
                              ),
                            };
                      })
                    );
                  }}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};
