import { CreditCardIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "remix";
import Button from "./button";
import Title from "./title";
import { utils } from 'ethers';
import Toast from "./notification";
import MobileNav from "./mobileNav";
import IDModal from "./idModal";

export interface IConnection {
  id: string;
  name: string;
  provider: string;
}


interface INavProps {
  connectionSet?: React.Dispatch<React.SetStateAction<IConnection[]>>;
}

const Nav = ({ connectionSet }: INavProps) => {
  const activeStyle = "text-5xl font-bold";
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [navConnection, setNavConnection] = useState<IConnection[]>([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [idModalOpen, setIdModalOpen] = useState(false);

  const openIdModal = useCallback(() => {
    setIdModalOpen(true);
  }, []);

  const closeIdModal = useCallback((connections: IConnection[]) => {
    setNavConnection(connections);
    setIdModalOpen(false);
  }, []);

  useEffect(() => {
    const isMetaMaskInstalled = () => {
      let testWindow: any = window;
      return Boolean(testWindow.ethereum && testWindow.ethereum.isMetaMask);

    };
    const test_id = localStorage.getItem("pegaport_obj");
    console.log("test_id", test_id);
    
    if (test_id) {
      if(JSON.parse(test_id).length > 0 && JSON.parse(test_id)[0].id.length > 0) {
        if(connectionSet) connectionSet(JSON.parse(test_id));
        setNavConnection(JSON.parse(test_id));
      }
    }

    setHasMetaMask(isMetaMaskInstalled());
  }, []);

  const requestConnection = useCallback(async () => {
    let tw: any = window;
    try {
      const accounts = await tw.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts) {
        console.log("accounts", accounts);
        console.log([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask'
        }]);
        
        setNavConnection([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask'
        }]);
        if(connectionSet) connectionSet([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask'
        }]);
        localStorage.setItem("pegaport_obj", JSON.stringify([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask'
        }]));
      }
    }
    catch (e: any) {
      if (e.code === -32002) {
        setNotificationMessage("You already have a connection request pending in MetaMask");
      }
    }
  }, []);

  const disconnect = useCallback(() => {
      localStorage.removeItem("pegaport_obj");
      if(connectionSet) connectionSet([]);
      //disconnect from metamask
      setNavConnection([]);
  }, []);


  return (
    <>
    
      <nav>
        <div className="bg-slate-900">
        <div className="md:hidden">
          <MobileNav />
          <IDModal isOpen={idModalOpen} onClose={closeIdModal} connection={navConnection} />
        </div>
        <div className="flex w-full justify-start">

          <img src="/pegaport.png" alt="logo" className="w-16 h-16 mr-3" />
          <Title>pegaport</Title>
          <div className="w-full flex justify-end">
          <div className="w-96">
          </div>
          <div className="">
          {hasMetaMask && navConnection.length > 0 ?
           <button className="font-extrabold" onClick={disconnect}>
           <Button type={'danger'}>
              
                DISCONNECT
              
            </Button>
            </button> : hasMetaMask ?
            <>
            <button className="font-extrabold" onClick={requestConnection}>
              <Button type={'secondary'}>
                
                  CONNECT WITH METAMASK
                
              </Button>
              </button>
              </> : <><Button type={'secondary'}><a href="https://metamask.io">GET METAMASK</a></Button>
              </>}

          </div>
          <div>
          <button className="font-extrabold" onClick={openIdModal}>
          <Button type={'secondary'}>
                
                  CONFIGURE ID
               
              </Button>
              </button>
          </div>

          </div>
        </div>
        
        <ul className="hidden md:flex uppercase xl:space-x-10 space-x-5 2xl:space-x-20 text-2xl font-bold mx-20 pt-2 shadow-2xl pb-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }: any) =>
                `${isActive ? activeStyle : undefined} transition-all hover:text-5xl hover:font-bold`
              }
            >
              my pega
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }: any) =>
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
          <li className="text-lg">
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
        </div>
        
        <div className="flex justify-end">
          <Toast message={notificationMessage} />
        </div>
      </nav>
      <div className="text-left rounded-md ml-20 mt-9">

        
      </div>
    </>
  );
}

export default Nav;