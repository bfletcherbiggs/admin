//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
//COMPONENTS
import SocialInputs from '../SocialInputs/index';
import LogoUpload from '../LogoUpload/index';
import BizInfo from '../BizInfo/index';
import BillInfo from '../BillInfo/index';
import WebPages from '../WebPages/index';
import Design from '../Design/index';
//CSS AND DESIGN
import "./compSelect.css";
import { teal600 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

class CompSelect extends Component{
    constructor() {
        super();
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
    render(){
        const style = {
          button: {
            margin: 12,
            fontWeight: 100
          }
        }
        const floatingStyle = {
          button: {
            margin: 12,
            fontWeight: 100
          }
        }

        const { varComponentTypes } = this.props;
        const { componentTypes } = this.state
        let compCount = 0;
        let compCount1 = 0;
        const componentMap = componentTypes.map( ( type, index ) => {
            let check = false
            let check2 = false;
            for ( let comp in varComponentTypes.data ) {
                if ( varComponentTypes.data[ comp ].compName === type.name ) {
                    check = true;
                    compCount1 += 1;
                    type.statusName = varComponentTypes.data[comp].statusName
                    type.key = varComponentTypes.data[ comp ].id
                    if ( varComponentTypes.data[ comp ].completed === true ) {
                        compCount += 1;
                        check2 = true;
                    }
                }
            }
            if ( check && check2 ) {
                return (
                    <div key={ type.key } className='compSelect-status-point sPComplete'>
                        <div className="compSelect-floating">
                            <FloatingActionButton 
                                style={ floatingStyle } 
                                backgroundColor={ teal600 } 
                                mini={ true }  
                                className="FloatingActionButton1"
                            >
                                <ContentAdd/>
                            </FloatingActionButton>
                            <RaisedButton label={ type.name } primary={ false } style={ style }/>
                        </div>
                    </div>
                )
            }
            else if ( check ) {
                return (
                    <div key={ type.key } className='compSelect-status-point sPIncomplete'>
                        <div className="compSelect-floating">
                            <FloatingActionButton 
                                style={ floatingStyle } 
                                backgroundColor={ teal600 } 
                                mini={ true } 
                                className="FloatingActionButton1"
                            >
                                <ContentAdd/>
                            </FloatingActionButton>
                            <RaisedButton label={ type.name } primary={ false } style={ style }/>
                        </div>
                    </div>
                )
            }
            return ( check )
        })

        return (
            <div className="compSelect-main">
                    { componentMap }
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return { varComponentTypes: state.compDuck.varComponentTypes };
}

export default connect( mapStateToProps, {} )( CompSelect );
