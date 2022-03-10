import { ArrowSmUpIcon, ArrowSmDownIcon, EyeIcon, ClockIcon, ArrowsExpandIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link } from "remix";
import { IPega } from "~/pega";
import Button from "./button";
import { Score } from "./score";
import Timer from "./timer";

interface IPegaItem {
  pega: IPega;
  index: number;
  average: number;
  racingAt: Date;
}
export function PegaItem({
  pega,
  index,
  average,
  racingAt
}: IPegaItem) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return <li
  className={"nm-concave-slate-800 transition-all pt-9 pb-6 my-6 mx-2 px-2 rounded-md font-bold grid grid-cols-6" + ` ${isExpanded? "h-96": "h-24"}`} key={pega.id}>
            <Link className="text-left pr-3" to={"pega/" + pega.id.toString()}>{index + 1}. {pega.name}<span className={`${pega.gender === "Male" ? `text-blue-600` : `text-pink-500`} ml-2 text-xs`}>({pega.breedCount}/7{pega.gender === "Male" ? "M" : "F"})</span></Link>
            <span className={index === 0 ? "text-amber-300" : index === 1 ? "text-slate-300" : ""}>{pega.winRate * 100}%</span>
            <span className="flex">{average}</span>
            <span><Score score={average}></Score></span>
            <span className={`${pega.energy === 25 ? `text-red-500` : `text-white`}`}>{pega.energy === 25 ? "! " : ""}{pega.energy}{pega.energy === 25 ? " !" : ""}
            {pega.energy === 25 && pega.winRate === 0 && pega.service != "RENT_SERVICE" ? <span className="ml-2 text-indigo-700"> 
            <Timer time={racingAt} />
            </span> : null}
            </span>
            <span>
              <div className="w-full mb-5 flex justify-end">
          <button className="font-extrabold">
          <Link to={"pega/" + pega.id.toString()}>
          <Button type={'secondary'}>
                
          <span onClick={() => setIsLoading(true)} className="">
                {isLoading? <ClockIcon className="w-6 h-6 inline-block"></ClockIcon> :
                <EyeIcon className="w-6 h-6 inline-block" />}
              </span>
              </Button>
              </Link>
    </button>
    <button
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
    className="font-extrabold">
          <Button type={'secondary'}>
                
          <span className="">
            {isExpanded?<ArrowSmUpIcon className="w-6 h-6 inline-block" /> : 
            <ArrowsExpandIcon className="w-6 h-6 inline-block" />}
              
              </span>
              </Button>
    </button>
    </div>
            </span>
            
          </li>;
}
  