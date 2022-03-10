import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import Typist from "react-typist";
import { Form, useTransition } from "remix";
import Button from "~/components/button";
import Heading from "~/components/heading";
import Layout from "~/components/layout";
import NavBar from "~/components/navbar";
import Title from "~/components/title"

const Search = () => {
    let transition = useTransition();
    let busy = transition.submission;
    
    return (
        <Layout>
            <NavBar />
            <div className="py-20 mx-20 rounded-md">
                <div className="flex">
                <Form>
                    <Heading>
                    
                <div className="text-xl flex font-light">
                  PEGA ID: <input name="pega_id" type={"text"} className="ml-2 font-extrabold text-2xl h-max bg-fuchsia-300 bg-opacity-25 rounded-lg"></input>
                <button type="submit" className="mx-2 font-bold hover:text-fuchsia-200 transition-all uppercase">
                  <SearchIcon className="inline-block w-5 mr-3"></SearchIcon>
                  {busy ? <Typist>...</Typist> : "search"}</button>
                </div>
                <input placeholder="Pega ID (eg. 224552)" className="bg-transparent focus:border-0">
                        
                        </input>
                        </Heading>
                        </Form>
                        <Button><span className="text-4xl">Search</span><SearchCircleIcon className="inline-block w-9 text-white" /></Button>
                </div>
            </div>
            
        </Layout>
    )
}

export default Search;