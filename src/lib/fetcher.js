import axios from 'axios';
import { admin } from '../firebase/firebase.js'

const fetcher = async ({
    url,
    params = {},
    headers = {},
    method = 'GET'
}) => {
    let response;
    const uid = await admin.auth().currentUser.getIdToken();    // get auth header
    headers['Authorization'] = `Bearer ${uid}`;                 // attach auth header
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