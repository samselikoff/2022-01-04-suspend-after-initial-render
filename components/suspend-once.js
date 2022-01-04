import { Suspense, useEffect, useState } from "react";

export default function SuspendOnce({ fallback, children }) {
  let [didRender, setDidRender] = useState(false);

  return (
    <>
      {didRender ? (
        children
      ) : (
        <>
          <Suspense fallback={fallback}>
            <InitialRender onRender={() => setDidRender(true)} />

            {children}
          </Suspense>
        </>
      )}
    </>
  );
}

function InitialRender({ onRender }) {
  useEffect(() => {
    onRender();
  }, [onRender]);

  return null;
}
