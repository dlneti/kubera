import React from 'react';

import Metadata from './Metadata';
import Tabs from './Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Portfolio = () => {
    return (
        <Container>
            <Row className="text-center">
                <Col xs={12}>
                    <h1 className="heading">My Portfolio</h1>
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
