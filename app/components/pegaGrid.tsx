import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPega } from "~/pega";
import { Score } from "./score";
import Timer from "./timer";

interface IPegaGridProps {
    pegas: IPega[];
}

const PegaGrid = ({ pegas }: IPegaGridProps) => {

    const [localPega, setLocalPega] = useState<IPega[]>([]);

    useEffect(() => {
        pegas.sort((a, b) => b.winRate - a.winRate);
        setLocalPega(pegas);
    }, [pegas]);


    return (
        <ul className="">
          <li className="grid grid-cols-6 font-extrabold mt-9">
          <span>NAME</span>
          <span>WIN RATE</span>
          <span>VIS /DAY</span>
          <span>RATING</span>
          <span>ENERGY</span>
          <span>STATUS</span>
          </li>
        {localPega.map((pega: IPega, index: number) => {
          let today = new Date();
          let racingAt = new Date();
          let born = new Date(pega.bornTime*1000);
          let days = Math.floor((today.getTime() - born.getTime()) / (24*60*60*1000))
          let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days) || 0;
          if(pega.energy===25) {
            //pega is locked for some reason, check if it is a new pega
            if(pega.winRate===0) {
              //born + 24 hours
              racingAt = new Date(pega.bornTime*1000 + 24*60*60*1000);
            }
          }
          return(
            <div key={index}>
          <li className="bg-gradient-to-r from-slate-900 to-fuchsia-900 py-2 my-6 mx-2 px-2 rounded-md font-bold grid grid-cols-6" key={pega.id}>
            <Link className="text-left pr-3" to={"pega/"+pega.id.toString()}>{index+1}. {pega.name}<span className={`${pega.gender==="Male"?`text-blue-600` : `text-pink-500`} ml-2 text-xs`}>({pega.breedCount}/3{pega.gender === "Male"? "M" : "F"})</span></Link>
            <span className={index === 0? "text-amber-300" : index === 1? "text-slate-300" : ""}>{pega.winRate*100}%</span>
            <span className="flex"
            >{average}</span>
            <span><Score score={average}></Score></span>
            <span className={
              `${pega.energy===25? `text-red-500` : `text-white`}`
            }>{pega.energy===25? "! ":""}{pega.energy}{pega.energy===25? " !":""}
            {pega.energy===25 && pega.winRate===0 && pega.service != "RENT_SERVICE" ? 
            <span className="ml-2 text-indigo-700"> 
            <Timer time={racingAt} />
            </span> : null}
            </span>
            <span>
              {pega.service === "RENT_SERVICE" ? "Renting" : "Resting"}
            </span>
          </li>
          </div>
        )})}
      </ul>
    )
}

export default PegaGrid;