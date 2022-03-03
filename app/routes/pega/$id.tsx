import { useLoaderData } from "remix";
import { getSpecificPega, IPega } from "~/pega";

export const loader = async ({ params }: any) => {
    const pega = getSpecificPega(params.id);
    return pega
  };

export default function PegaId() {
    const pega: IPega = useLoaderData();
    return (
      <main>
        <h1 className="text-9x1">{pega.name}</h1>
      </main>
    );
  }