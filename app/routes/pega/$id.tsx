import { useLoaderData } from "remix";
import Title from "~/components/title";
import { getSpecificPega, ISpecificPega } from "~/pega";

export const loader = async ({ params }: any) => {
    const pega = getSpecificPega(params.id);
    return pega
  };

export default function PegaId() {
    const pega: ISpecificPega = useLoaderData();
    return (
      <main className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-screen w-full">
        <h1 className="text-9x1">{JSON.stringify(pega)}</h1>
        <div className="flex">
          <img className="w-96" src={pega.pega.design.avatar} alt="" />
          <div>
            <Title>{pega.pega.name}</Title>
            <p>{pega.pega.bloodLine}</p>
          </div>
        </div>

      </main>
    );
  }