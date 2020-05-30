import React from 'react';

import plus from '../../../../assets/dashboard/plus.svg';

const Watching = () => {
    return (
        <div className="watching">
            <div className="heading">
                <span>watching</span>
                <button className="add">
                    <img src={plus} alt="Add button" />
                </button>
            </div>
            <div className="card-items">
                <div className="heading">
                    <span>pair</span>
                    <span>price</span>
                    <span>change (24h)</span>
                </div>
                <div>
                    <span className="pair">btc / usdt</span>
                    <span className="price">8954.00</span>
                    <span className="change red">-1.25 %</span>
                </div>
                <div>
                    <span className="pair">xlm / eth</span>
                    <span className="price">2.453433</span>
                    <span className="change green">+2.13 %</span>
                </div>
                <div>
                    <span className="pair">lit / eth</span>
                    <span className="price">0.123944495</span>
                    <span className="change green">+89.22 %</span>
                </div>
            </div>

        </div>
    )
};

export default Watching;