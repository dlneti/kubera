import React from 'react';
import { Link } from 'react-router-dom';

// import { mockData } from '../../common/app.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';

const AddressList = () => {
    const addresses = useSelector(state => state.portfolio_data.wallets)

    return (
        <ul className="hover-list">
            {   
                Object.entries(addresses).map((item,index) => {
                    const [addr, addrData] = item;

                    return <li key={index} className="shadow-low">
                                <Link to={addr}>
                                    <Row>
                                        <Col xs={6} className="text-truncate">
                                            <span>{addr}</span>
                                        </Col>
                                        <Col xs={3} className="text-center">
                                            {addrData.eth_balance.toLocaleString(undefined, {minimumFractionDigits: 6})} Ξ
                                        </Col>
                                        <Col xs={3} className="text-center">
                                            {addrData.token_balance_fiat.toLocaleString(undefined, {maximumFractionDigits: 2})} $ 
                                        </Col>
                                    </Row>
                                </Link>
                            </li>
                })
            }
        </ul>
    )
}

export default AddressList

//style={{ color: 'inherit', textDecoration: 'inherit', backgroundColor: 'inherit'}}