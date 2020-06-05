import React from 'react';

import TopBar from './TopBar';
import Content from './Content';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';

const Main = () => {
    const { loading } = useSelector((state: RootState) => state.app);
    return (
        <div className="main">
            <TopBar />
            {loading && <div>loadgin...</div>}
            {!loading && <Content />}
        </div>
    )
};

export default Main;