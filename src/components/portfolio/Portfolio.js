import React, { useEffect } from 'react';

import Metadata from './Metadata';
import Tabs from './Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../actions/auth'
import { getData } from '../../actions/app'


const Portfolio = () => {
    const dispatch = useDispatch()

    // useEffect(() => {
        // console.log("dispatching")
        // dispatch(getData())
    // }, [])

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <Container>
            <Row>
                <Col xs={12} className="text-right ">
                    <a href="#" className="logout" onClick={handleLogout}>Logout</a>
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
