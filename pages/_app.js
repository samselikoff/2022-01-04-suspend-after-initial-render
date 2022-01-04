import { Component } from "react";
import { SWRConfig } from "swr";
import { makeServer } from "../mirage";

let isClient = typeof window !== "undefined";
if (isClient && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => {
          return isClient
            ? fetch(...args).then((res) => res.json())
            : new Promise(() => {});
        },
        suspense: true,
      }}
    >
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SWRConfig>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
