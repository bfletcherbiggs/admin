//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
//COMPONENTS
import SocialInputs from '../SocialInputs/index'
import LogoUpload from '../LogoUpload/index'
import BizInfo from '../BizInfo/index'
import BillInfo from '../BillInfo/index'
import WebPages from '../WebPages/index'
import Design from '../Design/index'
//CSS AND DESIGN
import "./compStatus.css";
import IconButton from 'material-ui/IconButton';
import IconComplete from 'material-ui/svg-icons/navigation/check';
import IconNotComplete from 'material-ui/svg-icons/content/clear';
import {grey50} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';

class CompStatus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            componentTypes: [
                {component: < SocialInputs />, name: 'SocialInputs'},
                {component: < LogoUpload />, name: 'LogoUpload'},
                {component: < BizInfo />, name: 'BizInfo'},
                {component: < BillInfo />, name: 'BillInfo'},
                {component: < WebPages />, name: 'WebPages'},
                {component: < Design />, name: 'Design'}
            ]
        }
    }
    render(){
        const {varComponentTypes} = this.props;
        const {componentTypes} = this.state
        let compCount = 0;
        let compCount1 = 0;
        const componentMap = componentTypes.map((type, index) => {
        let check = false
        let check2 = false;
        for (let comp in varComponentTypes.data) {
            if (varComponentTypes.data[comp].compName === type.name) {
                check = true;
                compCount1 += 1;
                type.statusName = varComponentTypes.data[comp].statusName
                type.key = varComponentTypes.data[comp].id
                if (varComponentTypes.data[comp].completed === true) {
                    compCount += 1;
                    check2 = true;
                }
            }
        }
        if ( check && check2 ) {
            return (
                <div key={type.key} className='status-point sPComplete'>
                    <IconButton tooltip={type.statusName} tooltipPosition="top-center">
                        <IconComplete color={grey50}/>
                    </IconButton>
                </div>
            )
        }
        else if ( check ) {
            return (
                <div key={type.key} className='status-point sPIncomplete'>
                    <IconButton tooltip={type.statusName} tooltipPosition="top-center">
                        <IconNotComplete color={grey50}/>
                    </IconButton>
                </div>
            )
        }
        return ( check )
    })
        var percentCompleted = Math.floor((compCount / compCount1) * 100);

        return (
            <div className="compstatus-main">
                <div className="compstatus-links">
                    <Link to="/admin/components">
                        <button>Components</button>
                    </Link>
                    <Link to="/admin">
                        <button>Messages</button>
                    </Link>
                </div>
                <div className="compstatus-percent">
                <div className='percentCompleted'>
                    {percentCompleted}% Complete
                  </div>
                  <br/>
                    <div className="linearProgress">
                    <LinearProgress mode="determinate" value={percentCompleted}/>
                  </div>
                </div>
                <div className="compStatus-status">
                    {componentMap}
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return {varComponentTypes: state.compDuck.varComponentTypes};
}

export default connect( mapStateToProps, {})( CompStatus );
