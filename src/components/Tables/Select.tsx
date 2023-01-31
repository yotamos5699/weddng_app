import React, { Dispatch, SetStateAction, useState } from "react";

type selectProps = {
  default: string;
  values: string[];
  handleSelect?: Dispatch<SetStateAction<any>>;
};

function Select_(props: selectProps) {
  console.log({ props });
  return (
    <select
      name="select"
      className={"w-full  text-center text-black"}
      id="pivot"
      //   placeholder={props.default}
      onChange={props.handleSelect}
      defaultValue={props.default}
    >
      {props.values.map((item: any, idx: number) => {
        return (
          <option className="w-1/3 text-xl text-black" key={idx}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default Select_;
