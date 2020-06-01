import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMinutesAgo } from '../../lib/helpers';


export const LastRefreshed = () => {
    const { last_request: lastRefreshed } = useSelector(state => state.app)
    const [ago, setAgo] = useState(getMinutesAgo(lastRefreshed));

    useEffect(() => {
        const interval = setInterval(() => {
            setAgo(getMinutesAgo(lastRefreshed));
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);
    
    return (
        <div className="last-refreshed">
            Last refreshed {ago} minutes ago ({new Date(lastRefreshed).toLocaleTimeString()})
        </div>
    )   
}