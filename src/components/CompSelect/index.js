//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosLibrary from 'axios';
import { APISERVERPATH } from '../../config.json';
const axios = axiosLibrary.create( { withCredentials: true } );
const BASE_URL = APISERVERPATH;
//COMPONENTS
import SocialInputs from '../SocialInputs/index';
import LogoUpload from '../LogoUpload/index';
import BizInfo from '../BizInfo/index';
import BillInfo from '../BillInfo/index';
import WebPages from '../WebPages/index';
import Design from '../Design/index';
//CSS AND DESIGN
import './compSelect.css';
import { teal600 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
//API CALLS
import { addComps, removeComps } from '../../ducks/compDuck'

class CompSelect extends Component{
    constructor() {
        super();
        this.state = {
            componentTypes: [
                { component: < SocialInputs />, name: 'SocialInputs', tooltip: 'SocialInputs' },
                { component: < LogoUpload />, name: 'LogoUpload', tooltip: 'LogoUpload' },
                { component: < BizInfo />, name: 'BizInfo', tooltip: 'BizInfo' },
                { component: < BillInfo />, name: 'BillInfo', tooltip: 'BillInfo' },
                { component: < WebPages />, name: 'WebPages', tooltip: 'WebPages' },
                { component: < Design />, name: 'Design', tooltip: 'Design' }
            ]
        }
    }

    addComponent( componentIndex, e ) {
      //TODO change user ID and project ID
        const componentToAdd = {
            created_at: 'now()',
            updated_at: 'now()',
            user_id: 2,
            compName: this.state.componentTypes[ componentIndex ].name,
            statusName: this.state.componentTypes[ componentIndex ].tooltip,
            completed: false,
            project_id: 2
        }
        this.props.addComps( componentToAdd )
        e.preventDefault()
    }

    removeComponent( componentIndex, e ) {
        const componentToDelete = {
            compName: this.state.componentTypes[ componentIndex ].name,
            user_id: 2
        }
        this.props.removeComps( componentToDelete )
        e.preventDefault()
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
        const { componentTypes } = this.state;

        const componentMap = componentTypes.map( (type, index) => {
            type.key = index
            var compIncluded = false;
            for ( var comp in varComponentTypes.data ) {
                if ( varComponentTypes.data[ comp ].compName === type.name ) {
                    compIncluded = true;
                }
            }
            if ( compIncluded ) {
                return (
                    <div key={ type.key } className='compSelect-status-point sPComplete'>
                        <div className="compSelect-floating">
                            <FloatingActionButton
                                style={ floatingStyle }
                                onClick={ this.removeComponent.bind( this, [ type.key ] ) }
                                backgroundColor={ teal600 }
                                mini={ true }
                                className="FloatingActionButton1">
                                <ContentRemove/>
                            </FloatingActionButton>
                            <RaisedButton label={ type.name } primary={ false } style={ style }/>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div key={type.key} className='compSelect-status-point sPIncomplete'>
                        <div className="compSelect-floating">
                            <FloatingActionButton
                                 style={ floatingStyle }
                                 onClick={ this.addComponent.bind( this, [ type.key ] ) }
                                 backgroundColor={ teal600 }
                                 mini={ true }
                                 className="FloatingActionButton1">
                                <ContentAdd/>
                            </FloatingActionButton>
                            <RaisedButton label={ type.name } primary={ false } style={ style }/>
                        </div>
                    </div>
                )
            }
        })

        return (
            <div className="compSelect-main">
                { componentMap }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { varComponentTypes: state.compDuck.varComponentTypes };
}

export default connect( mapStateToProps, { addComps, removeComps })( CompSelect );
