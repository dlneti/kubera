import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Balance from './Balance';

//Assets
import { mockData } from '../../common/app.js'

const Address = () => {
    const { address } = useParams();

    const addrData = mockData.addresses[address];
    const tokens = addrData.tokens;
    console.log(tokens)

    return (
        <Container>
            <Row className="text-center">
                <Col className="shadow-2 addr-heading" xs={11}>
                    <h1>{address}</h1>
                </Col>
                <Col xs={1} className="align-self-center">
                    <Link to="/" className="hover-single">
                        <FontAwesomeIcon icon={['fas', 'times']} size="2x" />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Balance />
            </Row>
            <Row className="shadow-2 list-items default-border">
                <Col xs={12} className="text-center" style={{marginTop: "10px"}}>
                    <h3 className="label">Tokens</h3>
                </Col>
            
                <Col>
                    <ul>
                        {
                            tokens.map((token, index) => {
                                return <li key={index} className="shadow-low">
                                            <Row>
                                                <Col xs={6}>
                                                    <span>{token.token_name}</span>
                                                </Col>
                                                <Col xs={3}>
                                                    {token.balance.toLocaleString(undefined, {minimumFractionDigits: 6})}
                                                </Col>
                                                <Col xs={3}>
                                                    {
                                                        token.balance_fiat ? token.balance_fiat.toLocaleString(undefined, {maximumFractionDigits: 2}) + " $" : "N/A"
                                                    }
                                                </Col>
                                            </Row>
                                       </li>
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Address