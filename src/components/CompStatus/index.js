//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
//COMPONENTS

//CSS
import "./compStatus.css";

class CompStatus extends Component{

    render(){
        return (
            <div className="compstatus-main">
                <div className="compstatus-links">
                    <Link to="/admin/components">
                        <button>Components</button>
                    </Link>
                    <Link to="/admin/messages">
                        <button>Messages</button>
                    </Link>
                </div>
                <div className="compstatus-status">
                    <ul>
                      <li>Comp 1 Status</li>
                      <li>Comp 2 Status</li>
                      <li>Comp 3 Status</li>
                      <li>Comp 4 Status</li>
                    </ul>
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( CompStatus );
