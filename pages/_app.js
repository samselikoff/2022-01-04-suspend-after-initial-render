import "tailwindcss/tailwind.css";
import "../mirage";
import useSWR, { SWRConfig } from "swr";
import { Suspense, useEffect, useState } from "react";
import SuspendAfterInitialRender from "../components/suspend-after-initial-render";
import Spinner from "../components/spinner";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Wrapper(props) {
  let [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    // I use this so I only have to worry about CSR.
    setIsInitialRender(false);
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (...args) => {
          return typeof window !== "undefined"
            ? fetch(...args).then((res) => res.json())
            : new Promise(() => {});
        },
        suspense: true,
      }}
    >
      {!isInitialRender && <App {...props} />}
    </SWRConfig>
  );
}

function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen antialiased text-zinc-100 bg-zinc-800">
      <Suspense fallback={<Spinner />}>
        <Sidebar />

        <SuspendAfterInitialRender fallback={<Spinner />}>
          <Component {...pageProps} />
        </SuspendAfterInitialRender>
      </Suspense>
    </div>
  );
}

function Sidebar() {
  let { data } = useSWR(`/api/messages`);

  return (
    <div className="flex flex-col border-r border-zinc-700">
      <Link href="/">
        <a className="block px-2 py-3 text-xs font-medium text-zinc-400 hover:text-zinc-200">
          All messages
        </a>
      </Link>

      <div className="flex-1 w-48 px-2 pt-2 space-y-1">
        {data.messages.map((message) => (
          <MessageLink message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
}

function MessageLink({ message }) {
  let router = useRouter();
  let active = router.asPath === `/message/${message.id}`;

  return (
    <Link href={`/message/${message.id}`}>
      <a
        className={`
          ${
            active
              ? "bg-blue-600 text-blue-50"
              : "hover:bg-zinc-700/50 text-white"
          } 
          block px-2 py-2 rounded text-sm truncate`}
      >
        {message.title}
      </a>
    </Link>
  );
}
