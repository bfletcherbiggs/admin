//PACKAGES
import React from 'react';
//COMPONENTS
import CompStatus from '../CompStatus/index';
import AdminWorking from '../AdminWorking/index';
//CSS
import './views.css';

export default function Views(){
    return (
        <div className="views-main">
            <div className="views-adminWorking"><AdminWorking/></div>
            <br/>
            <div className="views-compStatus"><CompStatus/></div>
        </div>
    )
}
