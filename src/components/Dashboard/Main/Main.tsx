import React from 'react';

import TopBar from './TopBar';
import Content from './Content';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import { FirebaseError } from 'firebase';

const Main: React.FC = () => {
    const { loading, has_errors } = useSelector((state: RootState) => state.app);
    console.log(has_errors)
    return (
        <div className="main">
            <TopBar />
            { loading && <div className="loading">loadgin...</div> }
            { has_errors.status && <ErrorMessage error={has_errors.error} /> }
            { !loading && !has_errors.status && <Content /> }
        </div>
    )
};

type TErrorMessageProps = {
    error: FirebaseError | null;
};

const ErrorMessage: React.FC<TErrorMessageProps> = ({error}) => {
    const errorMessage = `
ERROR:
name: ${error!.name}
code: ${error!.code}
message: ${error!.message}
    `
    return (
        <div className="error">
            {errorMessage}
        </div>
    )
}

export default Main;