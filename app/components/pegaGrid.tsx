import { PegaItem } from './pegaItem';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPega } from "~/pega";
import { Score } from "./score";
import Timer from "./timer";
import Title from './title';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';

interface IPegaGridProps {
    pegas: IPega[];
}

interface IFilterProps {
  fs: string;
  sfs: React.Dispatch<React.SetStateAction<string>>;
  v: string;
}

const filters = [
  {
    label:"name",
    filters: ["name_up", "name_down"]
  },
  {
    label:"win rate",
    filters: ["wr_up", "wr_down"],
  },
  {
    label:"vis /day",
    filters: ["vis_up", "vis_down"],
  },
  {
    label:"rating",
    filters: ["rating_up", "rating_down"],
  },
  {
    label:"energy",
    filters: ["energy_up", "energy_down"],
  }
]


const Filter = ({fs, sfs, v}: IFilterProps) => {
  return(
  <button onClick={() => {
    sfs(v);
  }}>
    {v.endsWith("down")? <ArrowDownIcon className={`w-6 h-6 inline-block hover:text-sky-500 ${fs === v? "text-sky-500" : ``}`} />
    : <ArrowUpIcon className={`w-6 h-6 inline-block hover:text-sky-500 ${fs === v? "text-sky-500" : ``}`} />}
  </button>
  )
}

const PegaGrid = ({ pegas }: IPegaGridProps) => {

    const [localPega, setLocalPega] = useState<IPega[]>([]);
    const [filterString, setFilterString] = useState<string>("wr_up");

    useEffect(() => {
      //filter string controls the sorting system
        setLocalPega(
          pegas.sort((a, b) => {
              if(filterString === "name_up") {
                return a.name.localeCompare(b.name);
              }
              if(filterString === "name_down") {
                return b.name.localeCompare(a.name);
              }
              if(filterString === "wr_up") {
                return a.winRate - b.winRate;
              }
              if(filterString === "wr_down") {
                return b.winRate - a.winRate;
              }
              else {
                return b.name.localeCompare(a.name);
              }
            }));
    }, [filterString, pegas]);
            


    return (
        <ul className="justify-center">
          <li className="hidden lg:grid grid-cols-6 font-extrabold mt-9">
        
          {filters.map((f, i) => (
            <span className='uppercase' key={i}>
              <span>{f.label}</span>
              <Filter fs={filterString} sfs={setFilterString} v={f.filters[0]} />
              <Filter fs={filterString} sfs={setFilterString} v={f.filters[1]} />
            </span>
            ))}
          <span></span>
          </li>
          <div className='overflow-auto h-256'>

          
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