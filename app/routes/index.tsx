import { useLoaderData } from "@remix-run/react";
import { Link, useTransition, Form, useActionData } from "remix";
import { getAssets, getPega, IAssets, IPega } from "~/pega";
import { getId, getPrices } from "~/crypto";
import { useEffect, useMemo, useState } from "react";
import Button from "~/components/button";
import Title from "~/components/title";
import Heading from "~/components/heading";
import PegaGrid from "~/components/pegaGrid";
import { utils } from 'ethers';
import { CreditCardIcon } from '@heroicons/react/solid'
import Nav from "~/components/nav";
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
  const [connection, setConnection] = useState("");
  const [introMessage, setIntroMessage ] = useState("Connect your wallet to see your pega flock or search for a specific pega by ID.");
  const [authIntroMessage, setAuthIntroMessage ] = useState("");
  const visEarningsTotal = useMemo(() => {
    let t = 0;
    pega.forEach(pega => {
      let today = new Date();
      let born = new Date(pega.bornTime*1000);
      let days = Math.floor((today.getTime() - born.getTime()) / (24*60*60*1000))
      let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days);
      if(average > 0) {
        t += average;
      }
    });
    return t;
  }, [pega]);


  useEffect(() => {
    getPrices().then(prices => {
      //to 3 decimal places

      setVisPrice(prices["0xcc1b9517460d8ae86fe576f614d091fca65a28fc"].price.toFixed(3));
      setPgxPrice(prices["0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae"].price.toFixed(3));
    });



    getId().then(id => {
      setVisibleId(id);
    });
    const isMetaMaskInstalled = () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      let testWindow: any = window;
      return Boolean(testWindow.ethereum && testWindow.ethereum.isMetaMask);
    };
    setHasMetaMask(isMetaMaskInstalled());
  }, []);

  useEffect(() => {
    if (hasMetaMask) {
      //Have to check the ethereum binding on the window object to see if it's installed
      let tw: any = window;
      tw.ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts: any) => {
        if (accounts) setConnection(utils.getAddress(accounts[0]));
      });
    }
  }, [hasMetaMask]);

  useEffect(() => {
    if (connection) {
      let racingPega = 0;
      let restingPega = 0;
      let waitingPega = 0;
      getPega(connection).then(pega => {
        setPega(pega);
      });
      setAuthIntroMessage(`Welcome back. You have ${racingPega} pega(s) racing, ${restingPega} pega(s) resting, and ${waitingPega} pega(s) waiting.`);
      //visible id is the last 4 digits of the connection id
      setVisibleId(connection);
    }
  }, [connection]);

  return (
    <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 min-h-screen w-full">
      <Nav />
      <div className="py-20 mx-auto rounded-md w-max">
        <div className="flex">
          <img src="/pegaport.png" alt="logo" className="w-16 h-16 mr-3" />
          <Title>pegaport</Title><span className="inline-block mt-10 font-extralight">by MAD£</span>
          
        </div>
        <div className="flex justify-end mt-3">
          <Button><CreditCardIcon className="inline-block w-5 mr-2"></CreditCardIcon>ID: {visibleId}</Button>
          {hasMetaMask && connection.length > 5 ?
            <Button type={'danger'}><button className="font-extrabold" onClick={() => {
              let tw: any = window;
              //disconnect from metamask
              setConnection("");
              setVisibleId("...");
            }}>DISCONNECT</button></Button> : <Button type={'secondary'}><button className="font-extrabold" onClick={() => {
              let tw: any = window;
              tw.ethereum.request({
                method: 'eth_requestAccounts'
              }).then((accounts: any) => {
                if (accounts) setConnection(accounts[0]);
              });

            }}>CONNECT WITH METAMASK</button></Button>}
        </div>
        <div className="flex w-full justify-between">
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
          <div className="">
          <Heading style={'small'} title={'quick search'}>
            <div className="flex flex-col">
              <div className="flex">
                <Form>
                <div className="text-xl flex font-light">
                  PEGA ID: <input name="pega_id" type={"text"} className="ml-2 font-extrabold text-2xl h-max bg-fuchsia-300 bg-opacity-25 rounded-lg"></input>
                <button type="submit" className="mx-2 font-bold hover:text-fuchsia-200 transition-all uppercase">
                  <SearchIcon className="inline-block w-5 mr-3"></SearchIcon>
                  {busy ? <Typist>...</Typist> : "search"}</button>
                </div>
                </Form>
              </div>
            </div>


          </Heading>
          </div>
        </div>
        <ul>
          <li className="w-max">

            <PegaGrid pegas={pega} />
          </li>
        </ul>
      </div>
    </div>
  );
}
