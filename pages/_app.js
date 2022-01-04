import "tailwindcss/tailwind.css";
import "../mirage";
import useSWR, { SWRConfig } from "swr";
import { Suspense } from "react";
import SuspendAfterInitialRender from "../components/suspend-after-initial-render";
import Spinner from "../components/spinner";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Wrapper(props) {
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
      <App {...props} />
    </SWRConfig>
  );
}

function App({ Component, pageProps }) {
  return (
    <div className="h-screen flex text-zinc-100 bg-zinc-800">
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

      <div className="flex-1 px-3 pt-2 w-48 space-y-1">
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
          ${active ? "bg-blue-600 text-blue-50" : "hover:bg-zinc-700"} 
          block px-5 py-2 rounded`}
      >
        Message {message.id}
      </a>
    </Link>
  );
}
