import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const tezos = new TezosToolkit('https://hangzhounet.smartpy.io');

const address = "KT1S3goQNhyuZgznN952Vwfqeo96YV3U4pwf"

const getMetadata = async (addr, tkid) => {
    const contract = await tezos.contract.at(addr);
    const storage: any = await contract.storage();
    const uri: string = storage.token_metadata_uri;
    const parsed_uri = storage.token_metadata_uri.replace('{tokenId}', tkid);
    try {
        const response = await axios.get(parsed_uri);
        console.log(response.data);
    } catch (exception) {
        console.log(`ERROR received from ${parsed_uri}: ${exception}\n`);
    }
}

getMetadata(address, 100002);