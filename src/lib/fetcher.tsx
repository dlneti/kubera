import axios from 'axios';
import { admin } from '../firebase/firebase'

interface FetchParams {
    url: string;
    params?: {};
    headers?: {
        [K: string]: any;
    };
    method?: "GET" | "get" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined
};

const fetcher = async ({
    url,
    params = {},
    headers = {},
    method = 'GET'
}: FetchParams) => {
    let response;
    const uid = await admin.auth().currentUser!.getIdToken();       // get auth header
    headers['Authorization'] = `Bearer ${uid}`;                     // attach auth header
    let reqData = {
        url: url,
        method: method,
        params: params,
        headers: headers
    }

    try {
        response = await axios(reqData)
        return response
    } catch (err) {
        console.error(`Error fetching data: ${reqData}`)
        return false
    }
}

export default fetcher