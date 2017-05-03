//PACKAGES
import React from 'react';
//COMPONENTS
import CompSelect from '../CompSelect/index'
import CompDisplay from '../CompDisplay/index'
//CSS
import './inputTile.css';

export default function InputTile(){
    return (
        <div className="inputTile-main">
            <div className="inputTile-compSelect">
                <CompSelect/>
            </div>
            <div className="inputTile-compDisplay">
                <CompDisplay/>
            </div>
        </div>
    )
}
