import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

export default function Home() {
  let [userId, setUserId] = useState(1);

  return (
    <Suspense fallback={<p>Splash screen</p>}>
      <Sidebar onSelect={setUserId} />

      <SuspendAfterInitialRender fallback={<p>Loading user...</p>}>
        <Dashboard userId={userId} />
      </SuspendAfterInitialRender>
    </Suspense>
  );
}

function Sidebar({ onSelect }) {
  let { data } = useSWR(`/api/users`);

  return (
    <div>
      <p>Sidebar ({data.users.length} users)</p>

      <div>
        <button onClick={() => onSelect(1)}>User 1</button>
        <button onClick={() => onSelect(2)}>User 2</button>
        <button onClick={() => onSelect(3)}>User 3</button>
      </div>
    </div>
  );
}

function Dashboard({ userId }) {
  let { data } = useSWR(`/api/user/${userId}`);

  return (
    <div>
      <p>Dashboard</p>
      <p>The user is {data.user.id}</p>
    </div>
  );
}

function SuspendAfterInitialRender({ fallback, children }) {
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
