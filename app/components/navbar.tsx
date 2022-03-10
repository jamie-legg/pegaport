import { Fragment, useCallback, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, FingerPrintIcon, KeyIcon, LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Title from './title'
import { utils } from 'ethers';
import Button from './button'
import Toast from './notification'
import IDModal from './idModal'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Discord', href: '#', current: false },
  { name: 'Security', href: '#', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface IConnection {
  id: string;
  name: string;
  provider: string;
  active: boolean;
}

interface INavBarProps {
  connectionArrayFx?: React.Dispatch<React.SetStateAction<IConnection[]>>;
}

const NavBar = ({ connectionArrayFx }: INavBarProps) => {

  const [notificationMessage, setNotificationMessage] = useState("");

  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [navConnection, setNavConnection] = useState<IConnection[]>([]);

  const [idModalOpen, setIdModalOpen] = useState(false);


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
      if (JSON.parse(test_id).length > 0 && JSON.parse(test_id)[0].id.length > 0) {
        if (connectionArrayFx) connectionArrayFx(JSON.parse(test_id));
        setNavConnection(JSON.parse(test_id));
      }
    }

    setHasMetaMask(isMetaMaskInstalled());
  }, []);

  const disconnect = useCallback(() => {
    localStorage.removeItem("pegaport_obj");
    if (connectionArrayFx) connectionArrayFx([]);
    //disconnect from metamask
    setNavConnection([]);
  }, []);

  const requestConnection = useCallback(async () => {
    let tw: any = window;
    try {
      const accounts = await tw.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts) {
        setNavConnection([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask',
          active: true
        }]);
        if (connectionArrayFx) connectionArrayFx([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask',
          active: true
        }]);
        localStorage.setItem("pegaport_obj", JSON.stringify([...navConnection, {
          name: 'unknown user',
          id: utils.getAddress(accounts[0]),
          provider: 'MetaMask',
          active: true
        }]));
      }
    }
    catch (e: any) {
      if (e.code === -32002) {
        setNotificationMessage("You already have a connection request pending in MetaMask");
      }
    }
  }, []);



  const openIdModal = useCallback(() => {
    setIdModalOpen(true);
  }, []);

  return (
    <>
      <Disclosure as="header" className="nm-concave-slate-800 fixed w-full">
        {({ open }) => (
          <>
            <IDModal isOpen={idModalOpen} onClose={closeIdModal} connection={navConnection} />
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex justify-between">
                <div className="relative px-2 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-8 w-auto"
                      src="/pegaport.png"
                      alt="Pegaport"
                    />
                    <div className='hidden lg:flex'>
                      <Title>
                        Pegaport
                      </Title>
                    </div>
                  </div>

                </div>
                <div className="relative flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                  <Disclosure.Button className="rounded-md lg:hidden mr-2 p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  <div className="w-full flex sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block transition-all w-full nm-inset-slate-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:nm-inset-slate-600 focus:border-white focus:ring-white focus:text-slate-100 focus:placeholder-slate-300 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <div className="w-full flex justify-end">

                        <div className="">


                        </div>

                        <div className="flex justify-end">
                          <Toast message={notificationMessage} />
                        </div>
                      </div>
                      </div>
                    </div>
                        <div className='fixed right-3'>
                        <Button onClick={openIdModal} type={'secondary'}>

                          <FingerPrintIcon className="w-6 h-6 inline-block" />
                        </Button>
                        {hasMetaMask && navConnection.length > 0 ?
                              <Button type={'danger'} onClick={disconnect}>
                                  <LogoutIcon className="w-6 h-6 inline-block" />
                              </Button> : hasMetaMask ?
                              <>
                                  <Button onClick={requestConnection} type={'secondary'}>

                                    <KeyIcon className="w-6 h-6 inline-block" />

                                  </Button>
                              </> : <><Button type={'secondary'}><a href="https://metamask.io">GET METAMASK</a></Button>
                              </>}
                        </div>
                  </div>
                </div>

              </div>
              <nav className="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="pt-2 pb-3 px-2 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">

              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className='py-10 lg:py-20'></div>
    </>
  )
}

export default NavBar;