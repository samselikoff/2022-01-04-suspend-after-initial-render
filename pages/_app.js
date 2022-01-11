import "tailwindcss/tailwind.css";
import "../mirage";
import { SWRConfig } from "swr";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Sidebar } from "../components/sidebar";
import { useRouter } from "next/router";
import Spinner from "../components/spinner";
import SuspenseAfterInitialRender from "../components/suspense-after-initial-render";

export default function Wrapper(props) {
  let [isInitialRender, setIsInitialRender] = useState(true);
  let router = useRouter();
  useEffect(() => {
    // I use this so I only have to worry about CSR.
    if (router.isReady) {
      setIsInitialRender(false);
    }
  }, [router.isReady]);

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <p className="p-4 m-4 text-lg text-white bg-red-600">{error.message}</p>
      )}
    >
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
    </ErrorBoundary>
  );
}

function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen antialiased text-zinc-100 bg-zinc-800">
      <Suspense fallback={<Spinner />}>
        <Sidebar />
        <div className="flex w-full bg-zinc-900">
          <SuspenseAfterInitialRender fallback={<Spinner />}>
            <Component {...pageProps} />
          </SuspenseAfterInitialRender>
        </div>
      </Suspense>
    </div>
  );
}
