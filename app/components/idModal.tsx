/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Heading from './heading'
import { IConnection } from './navbar'
import Button from './button'

interface IIDModalProps {
  isOpen: boolean;
  onClose: (connections: IConnection[]) => void
  connection: IConnection[];
}

const IDModal = ({ isOpen, onClose, connection }: IIDModalProps) => {
  const [open, setOpen] = useState(isOpen)
  const [connections, setConnections] = useState<IConnection[]>(connection);

  useEffect(() => {
    setOpen(isOpen)
    setConnections(connection);

  }, [connections, isOpen])

  const close = () => {
    setOpen(false)
    onClose(connections)
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={close}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60 transition-opacity" />
          </Transition.Child>


          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-1/2 inline-block nm-convex-slate-800 rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-white">
                  <Dialog.Title as="h3" className="text-2xl leading-6 font-bold">
                    <span>YOUR IDs</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    {connection.map((c, index) => (
                      <div className='nm-convex-slate-800 px-6 rounded-md w-256' key={index}>
                        <div className="mt-2">
                          <span className="text-sm font-bold">{c.name} <span className='font-light'>{c.provider}</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <input value={c.id} placeholder="Wallet ID (0x...)" name="pega_id" type={"text"} className="w-full col-span-2 font-light text-xl h-max nm-inset-slate-800 p-1 rounded-lg"></input>
                        </div>
                        <div className="flex justify-end">
                        <Button type="danger">
                            Delete
                          </Button>
                          <Button type="secondary">
                            Edit
                          </Button>
                        </div>

                      </div>
                    ))}

                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className=""
                  onClick={close}
                  ref={cancelButtonRef}
                >
                  <Button>
                  SAVE
                  </Button>
                  
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default IDModal;
