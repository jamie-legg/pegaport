import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Typist from "react-typist";
import { getPega, getSpecificPega, IPega } from "~/pega";

const PegaSearch = () => {
    const [searchPegaId, setSearchPegaId] = useState("");
    const [searchPegaResultString, setSearchPegaResultString] = useState<string>("");

    useEffect(() => {
        if (searchPegaId.length > 0) {
            setSearchPegaResultString(`Searching for ${searchPegaId}...`);
            getSpecificPega(searchPegaId).then(({ pega }) => {
                getPega(pega.owner.address).then((detailedPega) => {
                    //find the pega in the detailed pega
                    const detailedPegaIndex = detailedPega.findIndex((p:IPega) => p.id === pega.id)
                    if (detailedPegaIndex > -1) {
                        let s = ""
                        let pr = detailedPega[detailedPegaIndex];
                        let today = new Date();
                        let born = new Date(pr.bornTime * 1000);
                        let days = Math.floor((today.getTime() - born.getTime()) / (24 * 60 * 60 * 1000))
                        let visDay = Math.floor((pr.gold * 105 + pr.silver * 44 + pr.bronze * 26 || 0) / days) || 0;
                        s += `NAME: ${pr.name}~BREED: ${pr.bloodLine}~-~WINRATE: ${pr.winRate}~VIS(/day): ${visDay}~RACES: ${pr.totalRaces}~AGE(days): ${days}~RATING: ${Math.ceil(visDay/100)}/5`
                        setSearchPegaResultString(s);   
                    }
                });
            });
        }
    }, [searchPegaId])


    return (
        <div className="flex flex-col justify-center">
            <div className="flex">
                <form
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        setSearchPegaId(e.target[0].value)
                    }}
                >
                    <div className="grid grid-cols-3 font-light">
                        <input placeholder="Pega ID (eg. 225222)" name="pega_id" type={"text"} className="pl-2 col-span-2 font-light text- h-max nm-inset-slate-800 focus:nm-inset-slate-700 p-1 rounded-lg">
                        </input>
                        <button type="submit" className="mx-2 col-span-1 rounded-md px-3 font-bold nm-convex-slate-900 transition-all uppercase">

                            {searchPegaId.length > 0 ? <Typist>...</Typist> : <SearchIcon className="inline-block w-5 mr-3"></SearchIcon>}
                        </button>
                    </div>
                    <div className="h-64 w-64 nm-flat-slate-900 mt-3">
                        <div className="m-3">
                            
                                    <Typist className="flex-col" key={searchPegaResultString} avgTypingDelay={10}><code>
                                    
                                        {searchPegaResultString ?
                                         searchPegaResultString.split("~").map((line, i) => {
                                            return <div key={i}>{line}<br />{i}</div>
                                         }
                                            ) : <span>Enter a valid Pega ID to begin.</span>}
                                         
        
                                    </code>
                                    </Typist>

                        </div>

                    </div>
                </form>
            </div>

        </div>


    )
}

export default PegaSearch;