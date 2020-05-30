import React from 'react';

import construction from '../../../../assets/dashboard/under-construction.svg';

const Visual = () => {
    return (
        <div className="visual">
            <div className="heading">visual</div>
            <div className="card-items">
                <div>
                    <img src={construction} alt="under construction" />
                </div>
                <span>Under construction</span>
                
            </div>
        </div>
    )
};

export default Visual;