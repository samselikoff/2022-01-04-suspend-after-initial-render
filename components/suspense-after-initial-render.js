import { Suspense, useEffect, useState } from "react";

export default function SuspenseAfterInitialRender({ fallback, children }) {
  let [isInitialRender, setIsInitialRender] = useState(true);

  return isInitialRender ? (
    <>
      <Lifecycle afterRender={() => setIsInitialRender(false)} />
      {children}
    </>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
}

function Lifecycle({ afterRender }) {
  useEffect(() => {
    afterRender();
  }, [afterRender]);

  return null;
}
