import React from 'react';

import Balance from './Balance';
import Visual from './Visual';
import Addrs from './Addrs';
import Watching from './Watching';
import { useSelector } from 'react-redux';
import { getMinutesAgo } from '../../../../lib/helpers';
import { LastRefreshed } from '../../../Misc';

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

export default Content;