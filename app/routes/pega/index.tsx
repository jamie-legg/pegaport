import { Link, useLoaderData } from "remix";
import { getPega, IPega } from "~/pega";
import type { LoaderFunction } from "remix";
import { useMemo } from "react";
import { Score } from "~/components/score";

export const loader: LoaderFunction  = async () => {
  return getPega();
};

export default function Pega() {

  
  const pegas = useLoaderData<IPega[]>();
  pegas.sort((a, b) => b.winRate - a.winRate);
  console.log(pegas);
    return (
      <main>
        <h1 className="text-7xl mt-9">My Pega</h1>
        <ul className="">
          <li className="grid grid-cols-5 font-extrabold mt-9">
          <span>NAME</span>
          <span>WIN RATE</span>
          <span>VIS /DAY</span>
          <span>RATING</span>
          <span>AGE (DAYS)</span>
          </li>
        {pegas.map((pega: IPega) => {
          let today = new Date();
          let born = new Date(pega.bornTime*1000);
          let days = Math.floor((today.getTime() - born.getTime()) / (24*60*60*1000))
          let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days) || 0;
          return(
          <li className="text-2xl bg-slate-50 py-2 my-2 mx-2 px-2 rounded-md font-bold grid grid-cols-5" key={pega.id}>
            <Link to={pega.id.toString()}>{pega.name}</Link>
            <span>{pega.winRate*100}%</span>
            <span className="flex"
            >{average}</span>
            <span><Score score={average}></Score></span>
            <span>{days}</span>
          </li>
        )})}
      </ul>
      </main>
    );
  }