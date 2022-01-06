import { Suspense, useEffect, useState } from "react";

export default function SuspendAfterInitialRender({ fallback, children }) {
  let [didRender, setDidRender] = useState(false);

  return (
    <>
      {didRender ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        <>
          <DidRender onRender={() => setDidRender(true)} />
          {children}
        </>
      )}
    </>
  );
}

function DidRender({ onRender }) {
  useEffect(() => {
    onRender();
  }, [onRender]);

  return null;
}
