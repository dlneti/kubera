import React, { useEffect } from 'react';

import Metadata from './Metadata';
import Tabs from './Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../actions/auth'
import { getData } from '../../actions/app'


const CACHE_TIME = 60 * 60 * 1000;      // 1hr

const Portfolio = () => {
    const dispatch = useDispatch()
    const last_request = useSelector(state => state.app.last_request);

    useEffect(() => {
        // fetch fresh data only if last request was made later than CACHE_TIME 
        if (new Date() - last_request > CACHE_TIME) {
            dispatch(getData())
        }
    }, [])

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
        <Container>
            <Row>
                <Col xs={12} className="text-right ">
                    <button type="submit" className="logout" onClick={handleLogout}>Logout</button>
                </Col>
            </Row>
            <Row className="text-center">
                <Col xs={12}>
                    <h1 className="heading bold">My Portfolio</h1>
                </Col>
            </Row>
            <Row>
                <Metadata />
            </Row>
            <Row>
                <Tabs />
            </Row>
        </Container>
    )
}


export default Portfolio
