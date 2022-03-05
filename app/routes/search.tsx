import { SearchCircleIcon } from "@heroicons/react/solid";
import { useTransition } from "remix";
import Button from "~/components/button";
import Heading from "~/components/heading";
import Nav from "~/components/nav"
import Title from "~/components/title"

const Search = () => {
    return (
        <div className="bg-gradient-to-r text-white from-slate-900 to-fuchsia-900 h-screen w-full">
            <Nav />
            <div className="py-20 mx-20 rounded-md">
                <div className="flex">
                    <Heading><input placeholder="Pega ID (eg. 224552)" className="bg-transparent focus:border-0">
                        
                        </input>
                        </Heading>
                        <Button>Search<SearchCircleIcon className="inline-block w-9 text-slate-300" /></Button>
                </div>
            </div>
            
        </div>
    )
}

export default Search;