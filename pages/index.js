export default function Home() {
  return (
    <div className="flex justify-center w-full items-center">
      <p className="text-zinc-500 text-2xl font-light">No Message Selected</p>
    </div>
  );
}

// import Link from "next/link";
// import { Suspense, useEffect, useState } from "react";
// import useSWR from "swr";

// export default function Home() {
//   return (
//     <Suspense fallback={<p>Splash screen</p>}>
//       <div className="flex">
//         <Sidebar />

//         <SuspendAfterInitialRender fallback={<p>Loading user...</p>}>
//           <Dashboard />
//         </SuspendAfterInitialRender>
//       </div>
//     </Suspense>
//   );
// }

// function Sidebar() {
//   let { data } = useSWR(`/api/messages`);

//   return (
//     <div className="flex flex-col bg-gray-100">
//       <p>All messages</p>

//       <div className="flex-1">
//         {data.messages.map((message) => (
//           <Link href={`/message/${message.id}`} key={message.id}>
//             <a>Message {message.id}</a>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Dashboard({ userId }) {
//   let { data } = useSWR(`/api/user/${userId}`);

//   return (
//     <div>
//       <p>Dashboard</p>
//       <p>The user is {data.user.id}</p>
//     </div>
//   );
// }
