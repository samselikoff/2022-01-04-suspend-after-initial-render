import { useRouter } from "next/router";
import useSWR from "swr";

export default function Message() {
  const router = useRouter();
  const { mid } = router.query;
  let { data } = useSWR(`/api/messages/${mid}`);

  return (
    <div className="w-full p-8 overflow-y-scroll bg-zinc-900">
      <h1 className="text-2xl font-bold">{data.message.title}</h1>

      <div className="mt-6 space-y-2 text-zinc-400">
        {data.message.body.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
