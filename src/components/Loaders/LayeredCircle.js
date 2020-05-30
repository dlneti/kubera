import React from 'react';

const LayeredCircle = props => (
    <div className={`spinner-container ${props.size}`}>
        <div className="cssload-bell">
            <div className="cssload-circle">
                <div className="cssload-inner"></div>
            </div>
            <div className="cssload-circle">
                <div className="cssload-inner"></div>
            </div>
            <div className="cssload-circle">
                <div className="cssload-inner"></div>
            </div>
            <div className="cssload-circle">
                <div className="cssload-inner"></div>
            </div>
            <div className="cssload-circle">
                <div className="cssload-inner"></div>
            </div>
        </div>
    </div>
)

export default LayeredCircle;