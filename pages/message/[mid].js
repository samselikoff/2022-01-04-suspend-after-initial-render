import { useRouter } from "next/router";
import useSWR from "swr";

export default function Message() {
  const router = useRouter();
  const { mid } = router.query;
  let { data } = useSWR(`/api/messages/${mid}`);

  return (
    <div className="flex justify-center w-full p-8">
      <div className="bg-zinc-700 w-full p-8 rounded shadow space-y-4">
        <p>Message {data.message.id}</p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
          doloribus consequatur alias deleniti eaque illo natus vitae, corporis
          pariatur? Consequatur, inventore unde facere veritatis ab voluptatum
          impedit. Repudiandae, veritatis illo.
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
          doloribus consequatur alias deleniti eaque illo natus vitae, corporis
          pariatur? Consequatur, inventore unde facere veritatis ab voluptatum
          impedit. Repudiandae, veritatis illo.
        </p>
      </div>
    </div>
  );
}
