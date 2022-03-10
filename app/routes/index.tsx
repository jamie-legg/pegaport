import { useLoaderData } from "@remix-run/react";
import { Link, useTransition, Form, useActionData } from "remix";
import { getAssets, getPega, IAssets, IPega } from "~/pega";
import { getId, getPrices } from "~/crypto";
import { useEffect, useMemo, useState } from "react";
import Button from "~/components/button";
import Title from "~/components/title";
import Heading from "~/components/heading";
import PegaGrid from "~/components/pegaGrid";
import CountUp from "react-countup";

import { IConnection } from "~/components/navbar";
import { SearchIcon } from "@heroicons/react/outline";
import Typist from "react-typist";
import OptionsSelect, { IOption } from "~/components/optionsSelect";
import PegaSearch from "~/components/pegaSearch";
import NavBar from "~/components/navbar";
import Layout from "~/components/layout";


const currencyOptions: IOption[] = [
  { name: 'USD', value: 1, selected: true, display: '$' },
  { name: 'PHP', value: 68.46, selected: false, display: '₱' },
  { name: 'GBP', value: 0.76, selected: false, display: '£' },
]

const timeOptions: IOption[] = [
  { name: 'Daily', value: 1, selected: true, display: 'per day' },
  { name: 'Weekly', value: 7, selected: false, display: 'per week' },
  { name: 'Monthly', value: 30, selected: false, display: 'per month' },
]

export default function Index() {
  let transition = useTransition();
  let busy = transition.submission;
  const [ stateTimeOptions, setStateTimeOptions ] = useState(timeOptions);
  const [ stateCurrencyOptions, setStateCurrencyOptions ] = useState(currencyOptions);
  const [visPrice, setVisPrice] = useState("0.2");
  const [pgxPrice, setPgxPrice] = useState("0.2");
  const [pega, setPega] = useState<IPega[]>([]);
  const [connections, setConnections] = useState<IConnection[]>([]);


  const visEarningsTotal = useMemo(() => {
    let t = 0;
    if (pega.length > 0) {
      pega.forEach(pega => {
        let today = new Date();
        let born = new Date(pega.bornTime * 1000);
        let days = Math.floor((today.getTime() - born.getTime()) / (24 * 60 * 60 * 1000))
        let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days);
        if (average > 0) {
          t += average;
        }
      });
    }
    return t;
  }, [pega]);

  const predictedEarnings = useMemo(() => {
    let e = visEarningsTotal * Number(visPrice);
    stateCurrencyOptions.forEach(option => {
      if (option.selected) {
        e = e * option.value;
      }
    });
    stateTimeOptions.forEach(option => {
      if (option.selected) {
        e = e * option.value;
      }
    });
    return Math.floor(e);
  }, [visEarningsTotal, visPrice, stateCurrencyOptions, stateTimeOptions]);


  useEffect(() => {
    if (connections.length > 0) {
      getPega(connections[0].id).then(pega => {
        setPega(pega);

      });
    }
  }, [connections]);


  useEffect(() => {
    getPrices().then(prices => {
      setVisPrice(prices["0xcc1b9517460d8ae86fe576f614d091fca65a28fc"].price.toFixed(3));
      setPgxPrice(prices["0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae"].price.toFixed(3));
    });
  }, []);

  const stateCurrencyOptionsUnit = useMemo(() => {
    let unit = "";
    stateCurrencyOptions.forEach(option => {
      if (option.selected) {
        unit = option.display;
      }
    });
    return unit;
  }, [stateCurrencyOptions]);

  const stateTimeOptionsUnit = useMemo(() => {
    let unit = "";
    stateTimeOptions.forEach(option => {
      if (option.selected) {
        unit = option.display;
      }
    });
    return unit;
  }, [stateTimeOptions]);



  return (
    
    <Layout>
      <NavBar connectionArrayFx={setConnections} />
      <div className="py-3 mx-12 lg:mx-20 rounded-md xl:flex">
        <div className="md:flex xl:flex-col xl:gap-y-6 justify-start">
          <div className="flex-col space-y-6">
            <Heading style={'small'} title={'token prices'}>
              <div className="flex flex-col">
                <div>
                  <div className="text-xl font-light">VIS: <span className="font-extrabold text-2xl italic">{visPrice}</span></div>
                  <div className="text-xl font-light">PGX: <span className="font-extrabold text-2xl italic">{pgxPrice}</span></div>
                </div>
              </div>
            </Heading>
            <Heading style={'small'} title={'my stats'}>
              <div className="flex flex-col">
                <div>
                  <div className="text-xl font-light">Daily earnings: <span className="font-extrabold text-2xl italic">{visEarningsTotal} VIS</span></div>
                  <div className="text-xl font-light">Pega owned: <span className="font-extrabold text-2xl italic">{pega.length}</span></div>
                </div>
              </div>
            </Heading>
          </div>

          <div className="col-span-1 mx-auto lg:col-span-2 xl:col-span-1">
            <Heading style={'small'} title={'quick search'}>
              <PegaSearch />
            </Heading>
          </div>
        </div>

        <ul className="">
          <div className="nm-concave-slate-900 pl-7 ml-7 mr-3 pt-3 mt-2 pb-3 flex-col rounded-2xl">
            <h2 className="my-1.5 py-1 flex font-bold text-xl lg:text-2xl 2xl:text-3xl uppercase">
              Income calculator
            </h2>
            <div className="flex justify-start">
              <div>
                <OptionsSelect onChange={setStateCurrencyOptions} options={currencyOptions} />
                <OptionsSelect onChange={setStateTimeOptions} options={timeOptions} />
              </div>
              <div>
                
              </div>
              <div className="w-full">

                <div id={`predictedEarnings`} className="text-5xl mx-auto w-max rounded-full px-5 py-3 nm-inset-sky-500 font-bold text-left">
                <p className="text-sm text-light text-slate-200 uppercase text-center">revenue</p>
                  {stateCurrencyOptionsUnit}
                  <CountUp
                    start={0}
                    end={predictedEarnings}
                    duration={1}
                  />
                  &nbsp;{stateTimeOptionsUnit}
                </div>
              </div>
            </div>
          </div>
          <li className="2xl: ml-6 flex justify-center">
            {connections.length > 0 && pega.length > 0 ?

              <PegaGrid pegas={pega} /> :
              connections.length > 0 ?
                <div className="text-center mt-6 text-xl font-light">
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
    </Layout>
  );
}
