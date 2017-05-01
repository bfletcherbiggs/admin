//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
//COMPONENTS
import SocialInputs from '../SocialInputs/index';
import LogoUpload from '../LogoUpload/index';
import BizInfo from '../BizInfo/index';
import BillInfo from '../BillInfo/index';
import WebPages from '../WebPages/index';
import Design from '../Design/index';
//CSS
import './compDisplay.css';

class CompDisplay extends Component{
    constructor() {
        super()

        this.state = {
            componentTypes: [
                { component: < SocialInputs />, name: 'SocialInputs' },
                { component: < LogoUpload />, name: 'LogoUpload' },
                { component: < BizInfo />, name: 'BizInfo' },
                { component: < BillInfo />, name: 'BillInfo' },
                { component: < WebPages />, name: 'WebPages' },
                { component: < Design />, name: 'Design' }
            ]
        }

    }

    render() {
        const { varComponentTypes } = this.props;
        const { componentTypes } = this.state
        const componentMap = componentTypes.filter( ( type, index ) => {
            let check = false
            for ( let comp in varComponentTypes.data ) {
                if ( varComponentTypes.data[ comp ].compName === type.name ) {
                    check = true;
                    type.key = varComponentTypes.data[ comp ].id
                }
            }
            return ( check )
        } )
        const componentDisplay = componentMap.map( x => {
            return <div key={ x.key }>{ x.component }</div>
        } )

        return (
            <div className="compDisplay-main">
                <div className="compDisplay-display">
                    { componentDisplay }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { varComponentTypes: state.compDuck.varComponentTypes };
}

export default connect( mapStateToProps, {} )( CompDisplay )
