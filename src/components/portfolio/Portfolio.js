import React, { useEffect } from 'react';

import Metadata from './Metadata';
import Tabs from './Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';

import * as actions from '../../actions'


const Portfolio = () => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     // console.log("dispatching")
    //     dispatch(actions.getData())
    // }, [])


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/address')
            const json = await res.json()
            console.log("CAN YOU HEAR ME")
            console.log(json)
        }
        fetchData()
    }, [])

    // console.log(data)

    return (
        <Container>
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
