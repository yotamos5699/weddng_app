/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const InnerQuestions = ({
  mainMessage,
  progressBar,
  script,
  setScript,
  array,
}: innerArrayProps) => {
  return (
    <div className="flex  w-screen flex-col items-center gap-4  ">
      {script &&
        array.map((message: innerMessage, idx: number) => {
          return (
            <div
              key={message.header}
              className={` h-full w-full w-3/4 items-center gap-4  text-center text-sm`}
            >
              {message.inputType !== "textarea" &&
              !mainMessage?.styleData?.isMultiCheck ? (
                <div
                  className={`flex items-center ${
                    message?.flexState && "flex-col"
                  } w-full flex-row-reverse justify-center`}
                >
                  <p
                    className={`${!mainMessage?.styleData && " w-1/3 "} ${
                      mainMessage?.styleData?.isFlexCol && "mb-2"
                    } `}
                  >
                    {message.header}
                  </p>
                  <p className="text-[8px]">
                    {mainMessage?.inputs[idx]?.addedText}
                  </p>
                  <input
                    className={` }
                  mb-2  w-1/3 rounded-lg text-center text-sm text-black
                   `}
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
                </div>
              ) : !mainMessage?.styleData?.isMultiCheck ? (
                <div>
                  <p className={"flex w-full flex-row-reverse justify-center"}>
                    {message.header}
                  </p>
                  <p className="text-[8px]">
                    {mainMessage?.inputs[idx]?.addedText}
                  </p>
                  <textarea
                    placeholder={message.default}
                    className=" w-1/2 text-center text-black"
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
                </div>
              ) : (
                <div className="items-centere flex w-full flex-row-reverse">
                  <p
                    className={`${!mainMessage?.styleData && " w-1/3 "}  ${
                      mainMessage?.styleData?.isFlexCol && "mb-2"
                    } `}
                  >
                    {message.header}
                  </p>
                  <p className="w-1/2 text-[8px]">
                    {mainMessage?.inputs[idx]?.addedText}
                  </p>
                  <input
                    className={` }
                  mb-2  w-1/2 rounded-lg text-center text-sm text-black
                   `}
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
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
