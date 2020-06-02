import React from 'react';


type LayeredCircleProps = {
    size: string;
};

const LayeredCircle: React.FC<LayeredCircleProps> = ({size}) => (
    <div className={`spinner-container ${size}`}>
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