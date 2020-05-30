import React from 'react';

import Balance from './Balance';
import Visual from './Visual';
import Addrs from './Addrs';
import Watching from './Watching';
import { useSelector } from 'react-redux';
import { getMinutesAgo } from '../../../../lib/helpers';

const Content = () => {
    return (
        <>
        <div className="content">
            <Balance />
            <Visual />
            <Addrs />
            <Watching />
        </div>
        <LastRefreshed />
        </>

    )
}

const LastRefreshed = () => {
    const { last_request: lastRefreshed } = useSelector(state => state.app)
    const minutesAgo = getMinutesAgo(lastRefreshed);
    
    return (
        <div className="last-refreshed">
            Last refreshed {minutesAgo} minutes ago ({new Date(lastRefreshed).toLocaleTimeString()})
        </div>
    )   
}

export default Content;