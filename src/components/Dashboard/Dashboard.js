import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Main from './Main';

import { useDispatch, useSelector } from 'react-redux';

// import { logoutUser } from '../../actions/auth'
import { initData, loadingComplete } from '../../actions/app';


const CACHE_TIME = 60 * 60 * 1000;      // 1hr
const FETCH_INTERVAL = 1000 * 60 * 5    // 5 min

const Dashboard = () => {
    const dispatch = useDispatch()
    const last_request = useSelector(state => state.app.last_request);
    const portfolio_data = useSelector(state => state.app.portfolio_data);
    let refreshDataInterval;

    // console.log({last_request, portfolio_data})

    /**
     * Returns false or Object with data if data is fresh enough (specified in CACHE_TIME variable)
     */
    const _dataIsStale = () => {
        const now = new Date().getTime();
        
        // if there aren't any of these, we need new data
        if (!last_request || !portfolio_data) return true;

        // check if data is in correct format
        if (!portfolio_data.hasOwnProperty('balance') || !portfolio_data.hasOwnProperty('wallets')) {
            return true;
        }
        // if we have fresh data in store we dont need new data
        if (now - last_request > CACHE_TIME) return true;

        return false;
    }
    
    useEffect(() => {
        // is user data already in store?
        let dataIsStale = _dataIsStale();
        // console.log(dataIsStale)

        if (dataIsStale) {
            dispatch(initData());
        } else {
            dispatch(loadingComplete());
        }



        // fetch fresh data every 5 min
        // refreshDataInterval = setInterval(() => {
        //     console.log("Fetching data from interval")
        //     dispatch(getPortfolioDataBackground());
        // }, FETCH_INTERVAL)

        // clear interval on unmount
        // return () => {
        //     clearInterval(refreshDataInterval);
        // }
    }, [])

    // const handleLogout = e => {
    //     e.preventDefault();
    //     dispatch(logoutUser());
    // }

    return (
        <>
            <Navbar />
            <Main />
        </>
    )
}


export default Dashboard