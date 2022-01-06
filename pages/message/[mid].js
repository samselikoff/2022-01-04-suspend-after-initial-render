import { useRouter } from "next/router";
import useSWR from "swr";

export default function Message() {
  let { query } = useRouter();
  let { data } = useSWR(`/api/messages/${query.mid}`);

  return (
    <div className="w-full p-8 overflow-y-scroll">
      <h1 className="text-2xl font-bold">{data.message.title}</h1>

      <div className="mt-6 space-y-2 text-zinc-400">
        {data.message.body.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
