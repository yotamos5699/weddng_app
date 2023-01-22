import React from "react";

function Invites() {
  return <div>Invites</div>;
}

export default Invites;

// import { type } from "os";
// import React, { useState } from "react";
// import { TypeOf } from "zod";
// type newParent = "אבא" | "אמא" | undefined;
// type newPair = "חתן" | "כלה" | undefined;

// type Parents = {
//   _ofType?: newParent;
//   firstName?: string;
//   lastName?: string;
//   relatedParticipant?: string;
//  // style?: [{ ofType: "full" | "first" | "last"; data: string[] }];
// };

// type Couple = {
//   _ofType?: newPair;
//   firstName?: string;
//   lastName?: string | undefined;
//   relatedParticipant?: string | undefined;
//  // style?: [{ ofType: "full" | "first" | "last"; data: string[] }] | undefined;
// };

// type eventDate = {
//   ofType: "full" | "month" | "day" | "hour";
//   format: "words" | "numbers";
//   style: string[];
// };

// interface Invitation {
//   Pics: {
//     empty?: string;
//     full?: string;
//   };
//   Parents: Parents[];
//   Couple: Couple[];
//   EvenntDates: eventDate[];
//   inviteMetaData: string;
// }

// interface Participants {
//   P1: Parents | undefined;
//   P2: Parents | undefined;
//   C1: Couple | undefined;
//   C2: Couple | undefined;
// }

// function Invites() {
//   const [currentInvitationState, setcurrentInvitationState] =
//     useState<Invitation>();
//   const [typeOfParticipants, setTypeofParticipants] =
//     useState<TypeofParticipants>({
//       C1: null,
//       C2: null,
//       P1: null,
//       P2: null,
//     });

//   const [participants, setParticipants] = useState<Participants>();
//   return (
//     <div className="flex flex-col">
//       {currentInvitationState && (
//         <div>
//           <Select
//             options={["חתן", "כלה"]}
//             selectionValues={typeOfParticipants}
//             setParticipants={setParticipants}
//             setSelectedValues={setTypeofParticipants}
//             dValue={"הורה"}
//             key={"C1"}
//           />
//           <input
//             id={"C1"}
//             onChange={(e) => {
//               if (participants && typeOfParticipants.C1 in ["חתן", "כלה"]) {
//                 setParticipants({
//                   ...participants,
//                   C1: {
//                     ...participants.C1,
//                     firstName: e.target.value,
//                   },
//                 });
//               }
//             }}
//             type={"text"}
//             value={currentInvitationState?.Couple[0]?.firstName}
//             placeholder={"ְמתחתן 1"}
//           ></input>{" "}
//           <input
//             id={"C2"}
//             onChange={(e) => {
//               if (participants) {
//                 setParticipants({
//                   ...participants,
//                   C1: {
//                     ...participants.C1,
//                     _ofType: "groom1",
//                     firstName: e.target.value,
//                   },
//                 });
//               }
//             }}
//             type={"text"}
//             value={currentInvitationState?.Couple[0]?.firstName}
//             placeholder={"הורה 2"}
//           ></input>
//           <input
//             id={"C1"}
//             onChange={(e) => {
//               if (participants) {
//                 setParticipants({
//                   ...participants,
//                   C1: {
//                     ...participants.C1,
//                     _ofType: "groom1",
//                     firstName: e.target.value,
//                   },
//                 });
//               }
//             }}
//             type={"text"}
//             value={currentInvitationState?.Couple[0]?.firstName}
//             placeholder={"מתחתן 1"}
//           ></input>
//           <input
//             id={"C1"}
//             onChange={(e) => {
//               if (participants) {
//                 setParticipants({
//                   ...participants,
//                   C1: {
//                     ...participants.C1,
//                     _ofType: "groom1",
//                     firstName: e.target.value,
//                   },
//                 });
//               }
//             }}
//             type={"text"}
//             value={currentInvitationState?.Couple[0]?.firstName}
//             placeholder={"מתחתן 2"}
//           ></input>
//         </div>
//       )}
//       Invites
//     </div>
//   );
// }

// export default Invites;

// type selectProps = {
//   currentKey: string;
//   options: string[];
//   selectionValues: any;
//   setSelectedValues: any;
//   dValue: string;
//   setParticipants: any;
// };

// export function Select(props: selectProps) {
//   return (
//     <div className="tnvi_1 ">
//       <select
//         className="sl"
//         name="select"
//         //className={"bg-orange-100 align-middle text-5xl text-black"}
//         id="pivot"
//         onChange={(e) => {
//           props.setParticipants((participant: Participants) => {
//             return {
//               ...participant,
//               [props.currentKey]: {
//                 ...participant[props.currentKey as keyof typeof participant],
//                 _ofType: "groom1",
//                 firstName: e.target.value,
//               },
//             };
//           });
//         }}
//       >
//         <option className="f_1" value={undefined} selected hidden>
//           בחר מניות
//         </option>
//         {props.options.map((tg: any, idx: number) => (
//           <option className="w-1/3 text-xl text-black" key={idx}>
//             {tg}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
