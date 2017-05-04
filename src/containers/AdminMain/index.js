//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComps } from '../../ducks/compDuck';
//COMPONENTS
import CompStatus from '../../components/CompStatus/index';
import Users from '../../components/Users/index';
import AdminWorking from '../../components/AdminWorking/index';
//CSS
import './adminMain.css';
import { Row, Col } from 'react-flexbox-grid';

class AdminMain extends Component{

    componentDidMount() {
        const userId = {userId: this.props.userid}
        if (userId.userId) {
            this.props.getComps(userId)
        }
    }
    render(){
        return (
            <div className="adminMain-main">
                <Row className="adminMain-working">
                    <Col xs={ 3 }>
                        <div className="adminMain-users"><Users/></div>
                    </Col>
                    <Col xs={ 6 }>
                        <div className="adminMain-views"><AdminWorking/></div>
                    </Col>
                    <Col xs={ 3 }>
                        <div className="adminMain-compStatus"><CompStatus/></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        varComponentTypes: state.compDuck.varComponentTypes,
        userid: state.messageDuck.userid
    };
}

export default connect( mapStateToProps, { getComps } )( AdminMain );
