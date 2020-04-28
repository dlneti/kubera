import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Balance = () => {
    return (
        <Col className="col-6 text-center metadata shadow-2">
            <Row>
                <Col>
                    <span className="label">Total Balance</span>
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    <span className="amount-fiat">420,000.00 $</span>
                </Col>
                <Col>
                    <span className="amount-crypto">4,200 BTC</span>
                </Col>
                <Col>
                    <span className="amount-crypto">420,000 ETH</span>
                </Col>
            </Row>    
        </Col>
    )
}  

export default Balance;