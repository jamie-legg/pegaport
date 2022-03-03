import axios from "axios"

let defaultId = '0x5CB790783984fF41D214e03dF10e7244603E361b'
let endpoint = 'https://api-apollo.pegaxy.io/v1/'

export interface IAssets {
    lockedVis: number
    pega: number
}

interface IEarnings {
    
}

export interface IPega {
    bloodLine: string
    bornTime: number
    breedCount: number
    breedType: string
    bronze: number
    energy: number
    fatherId: number
    fire: number
    gender: string
    gold: number
    id: number
    lastBreedTime: number
    lastReduceEnergy: number
    lastRenterAddress: string
    lastRenterIsDirect: true
    lastRenterPrice: number
    lastRenterRentAt: number
    lastRenterRentDuration: number
    lastRenterRentMode: string
    lightning: number
    lose: number
    motherId: number
    name: string
    ownerAddress: string
    ownerPegaRewards: number
    pegaTotalRaces: number
    rentTimeEnd: number
    renterAddress: string
    renterPegaRewards: number
    service: string
    silver: number
    speed: number
    strength: number
    totalRaces: number
    water: number
    win: number
    winRate: number
    wind: number
}

interface IStats {
    totalRaces: number
    gold: number
    silver: number
    bronze: number
}

const getPega = async (id?:string|null): Promise<IPega[]> => {
    const pega =  await fetch(`${endpoint}/pegas/owner/user/${id || defaultId}`)
    return pega.json()
}

const getSpecificPega = async (pegaId: string, id?:string|null): Promise<IPega> => {
  const pega = await fetch(`${endpoint}/pegas/${pegaId}
  `)
  return pega.json()
}



const getEarnings = async (id?:string|null): Promise<IEarnings> => {
    return ( await axios.get(
        `${endpoint}/earnings/historical/user/${id || defaultId}`
    )).data
}

const getAssets = async (id?:string|null): Promise<IAssets> => {
    const assets = await fetch(`${endpoint}/assets/count/user/${id || defaultId}`)
    return assets.json()
}
    

const getStats = async (id?:string|null): Promise<IStats> => {
    const stats = await axios.get(
        id ? `${endpoint}/stats/game/total/user/${id}` : `${endpoint}/stats/game/total/user/${defaultId}`)
    return stats.data
}




export { getStats, getAssets, getPega, getEarnings, getSpecificPega }