import React from 'react';
import AddressList from './AddressList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Tabs = () => {
    return (
        <Col xs={12} className="tabs shadow-3">
            <Row>
                <Col className="text-center">
                    <h4 className="heading label">Connected Assets</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <nav>
                        <ul className="nav nav-pills nav-justified" id="nav-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-item nav-link active" data-toggle="pill" href="#addrs" role="tab">Addresses</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-item nav-link" data-toggle="pill" href="#exchanges" role="tab">Exchanges</a>
                            </li>
                        </ul>
                    </nav>
                </Col>
                <Col xs={12}>
                    <div className="tab-content list-items" id="nav-tabContent">
                        <div className="tab-pane show active grow" id="addrs" role="tabpanel" aria-labelledby="nav-home-tab">
                            <AddressList />                    
                        </div>
                        <div className="tab-pane show" id="exchanges" role="tabpanel" aria-labelledby="nav-home-tab">Exchanges</div>
                    </div>
                </Col>
            </Row>
        </Col>
    )
}

export default Tabs