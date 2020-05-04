import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Balance = props => {
    return (
        <Col className="col-6 text-center metadata shadow-2">
            <Row>
                <Col className="heading label">
                    <span>Total Balance</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span className="amount-crypto">
                        {props.crypto.toLocaleString(undefined, {minimumFractionDigits: 6})} Ξ
                    </span>
                </Col>
                {/* <Col>
                    <span className="amount-crypto">4,200 BTC</span>
                </Col> */}
                <Col>
                    <span className="amount-fiat">
                        {props.fiat.toLocaleString(undefined, {maximumFractionDigits: 2})} $
                    </span>
                </Col>
            </Row>    
        </Col>
    )
}

export default Balance;