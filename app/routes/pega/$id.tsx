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
    const today = new Date();
    let raceAt = new Date(pega.pega.canRaceAt*1000);
    const dms = (raceAt.getTime() - today.getTime());
    //convert delta millisecond to days
    const days = Math.floor(dms / (1000 * 60 * 60 * 24));
    console.log(days);
    
    
    
    
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
            {pega.pega.canRace ? <p>Ready to race</p> : <Timer time={raceAt}/>}
          </div>
        </div>

      </main>
    );
  }