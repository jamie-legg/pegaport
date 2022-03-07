import { CreditCardIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "remix";
import Button from "./button";
import Title from "./title";
import { utils } from 'ethers';
import Toast from "./notification";
import MobileNav from "./mobileNav";

interface INavProps {
  connectionSet?: any;
}

const Nav = ({ connectionSet }: INavProps) => {
  const [isHome, setIsHome] = useState(true);
  const activeStyle = "text-5xl font-bold";
  const [visibleId, setVisibleId] = useState("...");
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [navConnection, setNavConnection] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");


  useEffect(() => {
    //check window location for active link
    const path = window.location.pathname;
    if (path.includes("/search")) {
      setIsHome(false);
    }
    const isMetaMaskInstalled = () => {
      //Have to check the ethereum binding on the window object to see if it's installed
      let testWindow: any = window;
      return Boolean(testWindow.ethereum && testWindow.ethereum.isMetaMask);

    };
    const test_id = localStorage.getItem("pegaport_id");
    if (test_id) {
      setNavConnection(utils.getAddress(test_id));
      if(connectionSet) connectionSet(utils.getAddress(test_id));
      setVisibleId(utils.getAddress(test_id));
    }

    setHasMetaMask(isMetaMaskInstalled());
  }, []);

  const requestConnection = useCallback(async () => {
    let tw: any = window;
    console.log("connecting");
    try {
      const accounts = await tw.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts) {
        setNavConnection(utils.getAddress(accounts[0]));
        connectionSet(utils.getAddress(accounts[0]));
        setVisibleId(utils.getAddress(accounts[0]));
        localStorage.setItem("pegaport_id", utils.getAddress(accounts[0]));
      }
    }
    catch (e: any) {
      if (e.code === -32002) {
        setNotificationMessage("You already have a connection request pending in MetaMask");
      }
    }
  }, []);

  const disconnect = useCallback(() => {
      localStorage.removeItem("pegaport_id");
      connectionSet("...");
      //disconnect from metamask
      setNavConnection("");
      setVisibleId("...");
  }, []);


  return (
    <>
      <nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
        
        <ul className="hidden md:flex uppercase xl:space-x-10 space-x-5 2xl:space-x-20 text-2xl font-bold mx-20 pt-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
              }
            >
              my pega
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
              }
            >
              search
            </NavLink>
          </li>
          <li>
            <a
              href="https://discord.gg/5c2AGrEMsw"
              className={`transition-all hover:text-5xl hover:font-bold`}

            >
              discord
            </a>
          </li>
          <li>
            <NavLink
              to="/security"
              className={({ isActive }) =>
                `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
              }
            >
              security
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-end">
          <Toast message={notificationMessage} />
        </div>
      </nav>
      <div className="text-left rounded-md ml-20 mt-9">
        <div className="flex w-full justify-start">
          <img src="/pegaport.png" alt="logo" className="w-16 h-16 mr-3" />
          <Title>pegaport</Title><span className="inline-block mt-10 font-extralight">by MAD£</span>

        </div>
        <div className="flex justify-start mt-3 mr-20">
          <Button><CreditCardIcon className="inline-block w-5 mr-2"></CreditCardIcon>ID: {visibleId}</Button>
          {hasMetaMask && navConnection.length > 5 ?
            <Button type={'danger'}>
              <button className="font-extrabold" onClick={disconnect}>
                DISCONNECT
              </button>
            </Button> : hasMetaMask ?
              <Button type={'secondary'}>
                <button className="font-extrabold" onClick={requestConnection}>
                  CONNECT WITH METAMASK
                </button>
              </Button> : <Button type={'secondary'}><a href="https://metamask.io">GET METAMASK</a></Button>}
        </div>
      </div>
    </>
  );
}

export default Nav;