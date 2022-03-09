import { PegaItem } from './pegaItem';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPega } from "~/pega";
import { Score } from "./score";
import Timer from "./timer";
import Title from './title';

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
        <ul className="justify-center">
          <li className="grid grid-cols-6 font-extrabold mt-9">
          <span>NAME</span>
          <span>WIN RATE</span>
          <span>VIS /DAY</span>
          <span>RATING</span>
          <span>ENERGY</span>
          <span>STATUS</span>
          </li>
          <div className='overflow-auto h-128'>

          
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
              <PegaItem pega={pega} index={index} average={average} racingAt={racingAt}  />
          </div>
        )})}
        </div>
      </ul>
    )
}

export default PegaGrid;