import { useLoaderData } from "@remix-run/react";
import { Link, useTransition, Form, useActionData } from "remix";
import { getAssets, getPega, IAssets, IPega } from "~/pega";
import { getId, getPrices } from "~/crypto";
import { useEffect, useMemo, useState } from "react";
import Button from "~/components/button";
import Title from "~/components/title";
import Heading from "~/components/heading";
import PegaGrid from "~/components/pegaGrid";

import { CreditCardIcon } from '@heroicons/react/solid'
import Nav, { IConnection } from "~/components/nav";
import { SearchIcon } from "@heroicons/react/outline";
import Typist from "react-typist";

export const loader = async () => {
  return getAssets();
};

export async function action({ request }: any) {
  const body = await request.formData();
  const name = body.get("pega_id");
  return { message: `Hello, ${name}` };
}



export default function Index() {
  const assets = useLoaderData<IAssets>();
  let transition = useTransition();
  let busy = transition.submission;
  const data = useActionData();

  const [visibleId, setVisibleId] = useState("...");
  const [visPrice, setVisPrice] = useState("0.2");
  const [pgxPrice, setPgxPrice] = useState("0.2");
  const [pega, setPega] = useState<IPega[]>([]);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [ connections, setConnections ] = useState<IConnection[]>([]);
  const visEarningsTotal = useMemo(() => {
    let t = 0;
    if(pega.length > 0) {
      pega.forEach(pega => {
      let today = new Date();
      let born = new Date(pega.bornTime*1000);
      let days = Math.floor((today.getTime() - born.getTime()) / (24*60*60*1000))
      let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days);
      if(average > 0) {
        t += average;
      }
    });
  }
    return t;
  }, [pega, connections]);

  
  useEffect(() => {
    if (connections.length > 0) {
      getPega(connections[0].id).then(pega => {
        setPega(pega);
      });
    }
  }, [connections]);


  useEffect(() => {
    getPrices().then(prices => {
      //to 3 decimal places
      setVisPrice(prices["0xcc1b9517460d8ae86fe576f614d091fca65a28fc"].price.toFixed(3));
      setPgxPrice(prices["0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae"].price.toFixed(3));
    });
  }, []);



  return (
    
    <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 min-h-screen w-full">
      <Nav connectionSet={setConnections} />
      <div className="py-3 mx-20 rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between 2xl:grid-cols-3">
          <div className="">
            <Heading style={'small'} title={'token prices'}>
              <div className="flex flex-col">
                <div>
                  <div className="text-xl font-light">VIS: <span className="font-extrabold text-2xl italic">{visPrice}</span></div>
                  <div className="text-xl font-light">PGX: <span className="font-extrabold text-2xl italic">{pgxPrice}</span></div>
                </div>
              </div>


            </Heading>
          </div>

          <div className="">
            <Heading style={'small'} title={'my stats'}>
            <div className="flex flex-col">
                <div>
                  <div className="text-xl font-light">Projected daily earnings: <span className="font-extrabold text-2xl italic">{visEarningsTotal} VIS</span></div>
                  <div className="text-xl font-light">Pega owned: <span className="font-extrabold text-2xl italic">{pega.length}</span></div>
                </div>
              </div>
            </Heading>
          </div>
          <div className="col-span-1 mx-auto px-9 py-3 mt-3 rounded-2xl bg-slate-900 shadow-2xl lg:col-span-2 xl:col-span-1">
          <Heading style={'small'} title={'search'}>
            <div className="flex flex-col justify-center">
              <div className="flex">
                <Form>
                <div className="grid grid-cols-3 font-light">
                  <input placeholder="Pega ID (eg. 225222)" name="pega_id" type={"text"} className="pl-2 col-span-2 font-light text-xl h-max nm-inset-slate-800 p-1 rounded-lg">
                  </input>
                <button type="submit" className="mx-2 col-span-1 rounded-md px-3 font-bold nm-convex-slate-900 transition-all uppercase">
                  
                  {busy ? <Typist>...</Typist> : <SearchIcon className="inline-block w-5 mr-3"></SearchIcon>}
                </button>
                </div>
                </Form>
              </div>
            </div>


          </Heading>
          </div>
        </div>
        <ul>
          <li className="w-max flex justify-center">
            {connections.length > 0 && pega.length > 0 ? 
              <PegaGrid pegas={pega} /> :
              connections.length > 0 ?
              <div className="text-center mt-9 text-xl font-light">
                <div>
                  <Typist>...</Typist>
                </div>
              </div> :
              <div className="flex flex-col">
                <div className="text-xl mt-9 font-light">
                  <p>
                    Please connect to MetaMask or enter your ID manually to view your Pega.
                  </p>
                </div>
              </div>
              }
          </li>
        </ul>
      </div>
    </div>
  );
}
