import { faker } from "@faker-js/faker";
import { boolean, number } from "zod";

export type Person = {
  name: string;
  stat: "אולי" | "אין מענה" | "אושר" | "סורב" | null | any;
  phone: string;
  amount: number;
  message: string;
  toReminde: boolean;
};

const stats = ["אולי", "אין מענה", "אושר", "סורב", "לא נשלחה"];
const newPerson = (): Person => {
  return {
    name: faker.name.fullName(),
    stat: stats[Math.floor(Math.random() * stats.length - 1)],
    phone: faker.phone.number(),
    amount: faker.datatype.number(5),
    message: faker.word.preposition(),
    toReminde: false,
  };
};
const len = 100;

export const makeMockTableData = (amount: number) => {
  let data = [];
  for (let i = 0; i < amount; i++) {
    data.push(newPerson());
  }

  return data;
};
//export function makeData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): Person[] => {
//    // const len = lens[depth]!;
//     return range(len).map((d): Person => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       };
//     });
//   };

//   const makeDataLevel = (depth = 0): Person[] => {
//    // const len = lens[depth]!;
//     return range(len).map((d): Person => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       };
//     });
//   };
//   return

//makeDataLevel();
