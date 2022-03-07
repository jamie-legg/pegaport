import { useLoaderData } from "remix";
import Timer from "~/components/timer";
import Title from "~/components/title";
import { getSpecificPega, ISpecificPega } from "~/pega";

export const loader = async ({ params }: any) => {
    const pega = getSpecificPega(params.id);
    return pega
  };

export default function PegaId() {
    const pega: ISpecificPega = useLoaderData();
    const canRaceAt = new Date(pega.pega.canRaceAt*1000)
    console.log(pega);
    
    
    
    
    // console.log(new Date (pega.pega.canRaceAt - today).toDateString() );
    
    
    return (
      <main className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-screen w-full">
        <h1 className="text-9x1">{JSON.stringify(pega)}</h1>
        <div className="flex">
          <img className="w-96" src={pega.pega.design.avatar} alt="" />
          <div>
            <Title>{pega.pega.name}</Title>
            <p>{pega.pega.bloodLine}</p>
            <p>{new Date(pega.pega.bornTime*1000).toDateString()}</p>
            {pega.pega.canRace ? <p>Ready to race</p> : <Timer time={canRaceAt}/>}
          </div>
        </div>

      </main>
    );
  }