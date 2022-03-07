//TODO: remove hardcoded VIS and PGX values

interface IAggregatorResponse {
    "0xcc1b9517460d8ae86fe576f614d091fca65a28fc": {
        decimals: number;
        name: string;
        price: number;
        symbol: string;
        type: string;
    }
    "0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae": {
        decimals: number;
        name: string;
        price: number;
        symbol: string;
        type: string;
    }
}

const getPrices = async (): Promise<IAggregatorResponse> => {
    const response = await fetch(`https://aggregator-api.kyberswap.com/polygon/tokens?ids=0xcc1b9517460d8ae86fe576f614d091fca65a28fc,0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae`);
    const aggregator: IAggregatorResponse = response.json() as unknown as IAggregatorResponse;
    return aggregator;
};


const getId = async () => {
    let defaultId = 'UNKNOWN';
    setTimeout(() => {
        defaultId = '0x5CB790783984fFbcvbc';
    }, 1000);
    return defaultId;
};

export {
    getId,
    getPrices
}