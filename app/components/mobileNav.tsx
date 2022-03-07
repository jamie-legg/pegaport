import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import { Link } from 'remix'

const solutions = [
  { name: 'my pega', description: 'Connect with MetaMask to view insights on your Pega.', href: '/' },
  {
    name: 'search',
    description: "Search for a specific Pega by name or ID.",
    href: '/search',
  },
  { name: 'discord', description: 'Get all of your questions answered in our forums of contact support.', href: 'https://discord.gg/5c2AGrEMsw' },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '/security' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const MobileNav = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-slate-900' : 'text-slate-500',
              'group  rounded-md inline-flex items-center text-base font-medium hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span></span>
            <MenuAlt2Icon
              className={classNames(open ? 'text-slate-600' : 'text-slate-400', 'ml-2 h-12 w-12 group-hover:text-slate-500')}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 "
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
          <Popover.Overlay className="bg-black opacity-60 fixed inset-0" />
        </Transition>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 max-w-xs sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-gradient-to-br from-slate-900 to-fuchsia-900 bg-opacity-40 px-5 py-6 sm:gap-8 sm:p-8 w-full h-full">
                  {solutions.map((item) => {
                      if(item.name === 'discord'){
                      return(
<a
                      key={item.name}
                      href={item.href}
                      className="-m-3 u p-3 block rounded-md hover:bg-gradient-to-br hover:from-slate-700 hover:to-fuchsia-700 transition ease-in-out duration-150"
                    >
                      <p className="text-2xl font-bold uppercase text-slate-100">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                    </a>
                      )
                  }
                        else{
                        return(<Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 u p-3 block rounded-md hover:bg-gradient-to-br hover:from-slate-700 hover:to-fuchsia-700 transition ease-in-out duration-150"
                    >
                      <p className="text-2xl font-bold uppercase text-slate-100">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                    </Link>
                        )
                        }
                    })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default MobileNav;
