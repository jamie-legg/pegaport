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

export const loader = async () => {
  return getAssets();
};

export async function action({ request }: any) {
  console.log(request);
  
  const body = await request.formData();
  const name = body.get("pega_id");
  return { message: `Hello, ${name}` };
}



export default function Index() {
  const assets = useLoaderData<IAssets>();
  let transition = useTransition();
  let busy = transition.submission;
  const data = useActionData();
  console.log(data);
  
  const [visibleId, setVisibleId] = useState("...");
  const [visPrice, setVisPrice] = useState("0.2");
  const [pgxPrice, setPgxPrice] = useState("0.2");
  const [pega, setPega] = useState<IPega[]>([]);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [connection, setConnection] = useState("");

  const visEarningsTotal = useMemo(() => {
    let t = 0;
    pega.forEach(pega => {
      let today = new Date();
      let born = new Date(pega.bornTime*1000);
      let days = Math.floor((today.getTime() - born.getTime()) / (24*60*60*1000))
      let average = Math.floor((pega.gold * 105 + pega.silver * 44 + pega.bronze * 26 || 0) / days);
      console.log(average, days, pega.gold, pega.silver, pega.bronze);
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
      console.log(testWindow)
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
        console.log(accounts);

        if (accounts) setConnection(utils.getAddress(accounts[0]));
      });
    }
  }, [hasMetaMask]);

  useEffect(() => {
    if (connection) {
      getPega(connection).then(pega => {
        setPega(pega);
      });
      //visible id is the last 4 digits of the connection id
      setVisibleId(connection);
    }
  }, [connection]);

  return (
    <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-full w-full">
      <Nav />
      <div className="py-20 mx-auto rounded-md w-max">
        <div className="flex">
          <Title>pegaportfolio</Title>

          <span className="fixed bottom-0 left-0">MADE</span>
        </div>

        <div className="flex justify-end mt-9">
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
                  <div className="text-xl font-light">VIS: <span className="font-extrabold text-2xl">{visPrice}</span></div>
                  <div className="text-xl font-light">PGX: <span className="font-extrabold text-2xl">{pgxPrice}</span></div>
                </div>
              </div>


            </Heading>
          </div>

          <div className="">
            <Heading style={'small'} title={'my stats'}>
            <div className="flex flex-col">
                <div>
                  <div className="text-xl font-light">Projected daily earnings: <span className="font-extrabold text-2xl">{visEarningsTotal} VIS</span></div>
                  <div className="text-xl font-light">PGX: <span className="font-extrabold">{pgxPrice}</span></div>
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
                <button type="submit" className="mx-2 font-bold hover:text-fuchsia-200 transition-all uppercase"><SearchIcon className="inline-block w-5"></SearchIcon>{busy ? "..." : "search"}</button>
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
