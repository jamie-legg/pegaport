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
        <div className="flex">
          <img className="w-96" src={pega.pega.design.avatar} alt="" />
          <div>
            <Title>{pega.pega.name}</Title>
            <p>Pega ID: {pega.pega.id}</p>
            <p>Birth Date: {new Date(pega.pega.bornTime*1000).toLocaleDateString()}</p>
            <p>Total Races: {pega.pega.total_races}</p>
            {pega.pega.canRace && pega.pega.energy != 0 ? <p>Ready to race</p> : pega.pega.canRace ? <p>No energy left</p> : <Timer time={canRaceAt}/>}
            <span>available energy: </span>
            <span className={
              `${pega.pega.energy===25? `text-red-500` : `text-white`}`
            }>{pega.pega.energy===25? "! ":""}{pega.pega.energy}{pega.pega.energy===25? " !":""}
            </span>
            <p>BloodLine: {pega.pega.bloodLine}</p>
            <p>Gender: {pega.pega.gender} </p>
              <ul>
                <li><a href={`/pega/${pega.pega.fatherId}`}>Pega Father</a></li>
                <li><a href={`/pega/${pega.pega.motherId}`}>Pega Mother</a></li>
              </ul>
            <p>
            
            </p>
          </div>
        </div>

      </main>
    );
  }